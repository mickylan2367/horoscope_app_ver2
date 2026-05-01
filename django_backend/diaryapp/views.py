
from django.shortcuts import render, redirect, get_object_or_404
from .models import Diary, DiaryImage, Profile
from .forms import DiaryForm,DiaryImageFormSet
import markdown
from django.contrib.auth.forms import UserCreationForm,PasswordChangeForm
from .forms import RegisterForm, ProfileForm,UserUpdateForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect
from django.contrib.auth import update_session_auth_hash
import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth.models import User
from django.utils import timezone
from django.utils.dateparse import parse_date
from pathlib import Path

def home(request):
    return render(request, 'diaryapp/home.html')


@login_required
def diary_list(request):
    diaries = Diary.objects.filter(user=request.user).order_by('-date')
    for diary in diaries:
        diary.rendered_content = markdown.markdown(diary.content, extensions=['fenced_code', 'tables'])

    nav_profile = None
    if request.user.is_authenticated:
        nav_profile, _ = Profile.objects.get_or_create(user=request.user)

    return render(request, 'diaryapp/diary_list.html', {
        'diaries': diaries,
        'nav_profile': nav_profile
    })

@login_required
def diary_create(request):
    if request.method == 'POST':
        form = DiaryForm(request.POST)
        # ここでは、まだ diary インスタンスがないので instance は渡さない
        formset = DiaryImageFormSet(
            request.POST,
            request.FILES,
            prefix="images"
        )

        if form.is_valid() and formset.is_valid():
            diary = form.save(commit=False)
            diary.user = request.user
            diary.save()
            formset.instance = diary
            formset.save()
            return redirect('diary_list')
        else:
            print("==== diary_create debug ====")
            print("POST:", request.POST)
            print("FILES:", request.FILES)
            print("form errors:", form.errors)
            print("formset errors:", formset.errors)
            print("formset non form errors:", formset.non_form_errors())
    else:
        form = DiaryForm()
        formset = DiaryImageFormSet(prefix="images")

    nav_profile = None
    if request.user.is_authenticated:
        nav_profile, _ = Profile.objects.get_or_create(user=request.user)

    return render(request, 'diaryapp/diary_form.html', {
        'form': form,
        'formset': formset,
        'nav_profile': nav_profile,
        'edit': False,  # テンプレートで使っているので一応入れておく
    })


@login_required
def diary_edit(request, pk):
    diary = get_object_or_404(Diary, pk=pk, user=request.user)  # ← 自分の日記だけ取得
    if request.method == 'POST':
        form = DiaryForm(request.POST, instance=diary)
        formset = DiaryImageFormSet(request.POST, request.FILES, instance=diary)
        if form.is_valid():
            form.save()
            formset.save()
            return redirect('diary_list')
    else:
        form = DiaryForm(instance=diary)
        formset = DiaryImageFormSet(instance=diary)

    nav_profile = None
    if request.user.is_authenticated:
        nav_profile, _ = Profile.objects.get_or_create(user=request.user)

    return render(request, 'diaryapp/diary_form.html', {
        'form': form,
        'formset': formset,
        'edit':True,
        'nav_profile': nav_profile
    })

def register(request):
    if request.method == 'POST':
        user_form = RegisterForm(request.POST)
        profile_form = ProfileForm(request.POST, request.FILES)
        if user_form.is_valid() and profile_form.is_valid():
            user = user_form.save()
            # signals で Profile は自動作成されるので、それを取得
            profile = user.profile
            # アイコンが送られていれば保存
            if profile_form.cleaned_data.get('icon'):
                profile.icon = profile_form.cleaned_data['icon']
                profile.save()
            # そのままログインさせたい場合
            # login(request, user)
            return redirect('login')  # 既存の動きに合わせる
    else:
        user_form = RegisterForm()
        profile_form = ProfileForm()

    nav_profile = None
    if request.user.is_authenticated:
        nav_profile, _ = Profile.objects.get_or_create(user=request.user)

    return render(request, 'diaryapp/register.html', {
        'nav_profile': nav_profile,
        'form': user_form,
        'profile_form': profile_form
    })

@login_required
def profile(request):
    profile, _ = Profile.objects.get_or_create(user=request.user)

    if request.method == 'POST':
        if 'profile_submit' in request.POST:
            uform = UserUpdateForm(request.POST, instance=request.user)
            pform = ProfileForm(request.POST, request.FILES, instance=profile)
            pwdform = PasswordChangeForm(user=request.user)  # 未送信側は空でOK
            if uform.is_valid() and pform.is_valid():
                uform.save()
                pform.save()
                return redirect('profile')

        elif 'password_submit' in request.POST:
            uform = UserUpdateForm(instance=request.user)
            pform = ProfileForm(instance=profile)
            pwdform = PasswordChangeForm(user=request.user, data=request.POST)
            if pwdform.is_valid():
                user = pwdform.save()
                update_session_auth_hash(request, user)  # これでログアウトされない
                return redirect('profile')

    else:
        uform = UserUpdateForm(instance=request.user)
        pform = ProfileForm(instance=profile)
        pwdform = PasswordChangeForm(user=request.user)

    # ナビのアイコン用に渡す（base.html が使うなら）
    nav_profile = profile

    return render(request, 'diaryapp/profile.html', {
        'uform': uform,
        'pform': pform,
        'pwdform': pwdform,
        'nav_profile': nav_profile,
    })


def custom_logout(request):
    logout(request)
    return redirect('thank_you')


def _profile_payload(user):
    if not user.is_authenticated:
        return {"authenticated": False}

    profile, _ = Profile.objects.get_or_create(user=user)
    icon_url = profile.icon.url if profile.icon else ""
    if icon_url == "/media/default_icon.png":
        icon_url = "/media/profile_icons/logo.png"
    return {
        "authenticated": True,
        "id": user.pk,
        "username": user.username,
        "email": user.email,
        "iconUrl": icon_url,
    }


def _form_errors_to_list(form):
    errors = []
    for field, field_errors in form.errors.get_json_data().items():
        label = field.replace("_", " ")
        for error in field_errors:
            message = error.get("message", "")
            errors.append(f"{label}: {message}" if field != "__all__" else message)
    return errors


def _login_required_json(request):
    if request.user.is_authenticated:
        return None
    return JsonResponse({"error": "Login required"}, status=401)


def _parse_diary_date(value):
    if not value:
        return timezone.localdate()
    parsed = parse_date(value)
    if parsed is None:
        return None
    return parsed


def _diary_title_from_date(value):
    return value.isoformat()


def _diary_image_payload(image):
    return {
        "id": image.pk,
        "url": image.image.url if image.image else "",
        "caption": image.caption,
        "order": image.order,
    }


MAX_DIARY_IMAGES = 10
MAX_DIARY_IMAGE_SIZE = 5 * 1024 * 1024
ALLOWED_DIARY_IMAGE_CONTENT_TYPES = {"image/jpeg", "image/png", "image/webp"}


def _validate_diary_images(files, existing_count=0):
    if existing_count + len(files) > MAX_DIARY_IMAGES:
        return f"Images are limited to {MAX_DIARY_IMAGES} per diary."

    for image in files:
        if image.size > MAX_DIARY_IMAGE_SIZE:
            return f"{image.name} is larger than 5MB."
        if image.content_type not in ALLOWED_DIARY_IMAGE_CONTENT_TYPES:
            return f"{image.name} must be JPEG, PNG, or WebP."

    return None


def _delete_image_file(image):
    if not image.image:
        return
    try:
        path = Path(image.image.path)
        if path.exists():
            path.unlink()
    except Exception:
        pass


def _diary_payload(diary, include_rendered=True):
    rendered_content = ""
    if include_rendered:
        rendered_content = markdown.markdown(
            diary.content,
            extensions=["fenced_code", "tables"]
        )
    return {
        "id": diary.pk,
        "title": diary.title,
        "date": diary.date.isoformat() if diary.date else None,
        "content": diary.content,
        "renderedContent": rendered_content,
        "rendered_content": rendered_content,
        "images": [
            _diary_image_payload(image)
            for image in diary.images.all().order_by("order", "id")
        ],
    }


@ensure_csrf_cookie
@require_http_methods(["GET"])
def api_csrf(request):
    return JsonResponse({"ok": True})


@require_http_methods(["GET"])
def api_auth_me(request):
    return JsonResponse(_profile_payload(request.user))


@require_http_methods(["POST"])
def api_auth_login(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    username = data.get("username", "").strip()
    password = data.get("password", "")
    user = authenticate(request, username=username, password=password)

    if user is None:
        return JsonResponse({"error": "Invalid username or password"}, status=400)

    login(request, user)
    return JsonResponse(_profile_payload(user))


@require_http_methods(["POST"])
def api_auth_logout(request):
    logout(request)
    return JsonResponse({"ok": True})


@require_http_methods(["POST"])
def api_auth_register(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    username = data.get("username", "").strip()
    password1 = data.get("password1", "")
    password2 = data.get("password2", "")
    email = data.get("email", "").strip()

    if not username:
        return JsonResponse({"error": "username is required"}, status=400)
    if password1 != password2:
        return JsonResponse({"error": "passwords do not match"}, status=400)
    if User.objects.filter(username=username).exists():
        return JsonResponse({"error": "username is already taken"}, status=400)

    form = RegisterForm({"username": username, "password1": password1, "password2": password2})
    if not form.is_valid():
        return JsonResponse({"error": " / ".join(_form_errors_to_list(form))}, status=400)

    user = form.save()
    if email:
        user.email = email
        user.save(update_fields=["email"])
    Profile.objects.get_or_create(user=user)
    login(request, user)
    return JsonResponse(_profile_payload(user), status=201)


@login_required
@require_http_methods(["GET", "PUT"])
def api_profile(request):
    profile, _ = Profile.objects.get_or_create(user=request.user)

    if request.method == "GET":
        return JsonResponse(_profile_payload(request.user))

    if request.content_type and request.content_type.startswith("multipart/form-data"):
        username = request.POST.get("username", request.user.username).strip()
        email = request.POST.get("email", request.user.email).strip()
        icon = request.FILES.get("icon")
    else:
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        username = data.get("username", request.user.username).strip()
        email = data.get("email", request.user.email).strip()
        icon = None

    if not username:
        return JsonResponse({"error": "username is required"}, status=400)

    request.user.username = username
    request.user.email = email
    request.user.save(update_fields=["username", "email"])
    if icon:
        profile.icon = icon
        profile.save(update_fields=["icon"])

    return JsonResponse(_profile_payload(request.user))


@login_required
@require_http_methods(["POST"])
def api_profile_password(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    form = PasswordChangeForm(
        user=request.user,
        data={
            "old_password": data.get("old_password", ""),
            "new_password1": data.get("new_password1", ""),
            "new_password2": data.get("new_password2", ""),
        },
    )
    if not form.is_valid():
        return JsonResponse({"error": form.errors.get_json_data()}, status=400)

    user = form.save()
    update_session_auth_hash(request, user)
    return JsonResponse({"ok": True})


@require_http_methods(["POST"])
def api_markdown_preview(request):
    auth_error = _login_required_json(request)
    if auth_error:
        return auth_error

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    html = markdown.markdown(
        data.get("content", ""),
        extensions=["fenced_code", "tables"]
    )
    return JsonResponse({"html": html})



##############################
## for React API
##############################
# @login_required
@require_http_methods(["GET"])
def api_diary_list(request):
    print("login?", request.user.is_authenticated)
    print("user:", request.user)
    print("diary count:", Diary.objects.filter(user=request.user).count() if request.user.is_authenticated else "not login")
    if not request.user.is_authenticated:
        return JsonResponse([], safe=False, status=200)

    diaries = Diary.objects.filter(user=request.user).prefetch_related("images").order_by("-date")
    results = [_diary_payload(diary) for diary in diaries]

    return JsonResponse(results, safe=False)


@require_http_methods(["POST"])
def api_diary_create(request):
    auth_error = _login_required_json(request)
    if auth_error:
        return auth_error

    if request.content_type and request.content_type.startswith("multipart/form-data"):
        data = request.POST
        files = request.FILES.getlist("images")
    else:
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        files = []

    date = _parse_diary_date(data.get("date"))
    content = data.get("content", "").strip()

    if not content:
        return JsonResponse({"error": "content is required"}, status=400)

    if date is None:
        return JsonResponse({"error": "date must be YYYY-MM-DD"}, status=400)

    image_error = _validate_diary_images(files)
    if image_error:
        return JsonResponse({"error": image_error}, status=400)

    diary = Diary.objects.create(
        user=request.user,
        title=_diary_title_from_date(date),
        date=date,
        content=content,
    )

    for index, image in enumerate(files):
        DiaryImage.objects.create(diary=diary, image=image, order=index)

    return JsonResponse(_diary_payload(diary), status=201)


@require_http_methods(["GET", "POST"])
def api_diary_collection(request):
    if request.method == "GET":
        return api_diary_list(request)
    return api_diary_create(request)

@require_http_methods(["GET", "PUT"])
def api_diary_detail(request, pk):
    auth_error = _login_required_json(request)
    if auth_error:
        return auth_error

    diary = get_object_or_404(
        Diary.objects.prefetch_related("images"),
        pk=pk,
        user=request.user
    )

    if request.method == "GET":
        return JsonResponse(_diary_payload(diary))

    if request.content_type and request.content_type.startswith("multipart/form-data"):
        data = request.POST
        files = request.FILES.getlist("images")
    else:
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        files = []

    date = _parse_diary_date(data.get("date")) if "date" in data else diary.date
    content = data.get("content", diary.content).strip()

    if not content:
        return JsonResponse({"error": "content is required"}, status=400)

    if date is None:
        return JsonResponse({"error": "date must be YYYY-MM-DD"}, status=400)

    image_error = _validate_diary_images(files, diary.images.count())
    if image_error:
        return JsonResponse({"error": image_error}, status=400)

    diary.date = date
    diary.title = _diary_title_from_date(date)
    diary.content = content
    diary.save()

    start_order = diary.images.count()
    for index, image in enumerate(files):
        DiaryImage.objects.create(diary=diary, image=image, order=start_order + index)

    return JsonResponse(_diary_payload(diary))


api_diary_edit = api_diary_detail


@require_http_methods(["POST"])
def api_diary_image_add(request, pk):
    auth_error = _login_required_json(request)
    if auth_error:
        return auth_error

    diary = get_object_or_404(
        Diary.objects.prefetch_related("images"),
        pk=pk,
        user=request.user
    )
    files = request.FILES.getlist("images")

    if not files:
        return JsonResponse({"error": "No images selected."}, status=400)

    image_error = _validate_diary_images(files, diary.images.count())
    if image_error:
        return JsonResponse({"error": image_error}, status=400)

    start_order = diary.images.count()
    for index, image in enumerate(files):
        DiaryImage.objects.create(diary=diary, image=image, order=start_order + index)

    refreshed = Diary.objects.prefetch_related("images").get(pk=diary.pk)
    return JsonResponse(_diary_payload(refreshed), status=201)


@require_http_methods(["PATCH", "DELETE"])
def api_diary_image_detail(request, pk):
    auth_error = _login_required_json(request)
    if auth_error:
        return auth_error

    image = get_object_or_404(DiaryImage, pk=pk, diary__user=request.user)

    if request.method == "DELETE":
        _delete_image_file(image)
        image.delete()
        return JsonResponse({"ok": True})

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    if "caption" in data:
        image.caption = str(data.get("caption") or "")[:200]
    if "order" in data:
        try:
            image.order = max(0, int(data.get("order")))
        except (TypeError, ValueError):
            return JsonResponse({"error": "order must be an integer"}, status=400)
    image.save(update_fields=["caption", "order"])
    return JsonResponse(_diary_image_payload(image))


@require_http_methods(["POST"])
def api_diary_image_reorder(request, pk):
    auth_error = _login_required_json(request)
    if auth_error:
        return auth_error

    diary = get_object_or_404(Diary, pk=pk, user=request.user)

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    image_ids = data.get("imageIds") or data.get("image_ids") or []
    if not isinstance(image_ids, list):
        return JsonResponse({"error": "imageIds must be a list"}, status=400)

    owned_images = {
        image.pk: image
        for image in DiaryImage.objects.filter(diary=diary, pk__in=image_ids)
    }
    if len(owned_images) != len(set(image_ids)):
        return JsonResponse({"error": "One or more images were not found."}, status=404)

    for index, image_id in enumerate(image_ids):
        image = owned_images[image_id]
        image.order = index
        image.save(update_fields=["order"])

    refreshed = Diary.objects.prefetch_related("images").get(pk=diary.pk)
    return JsonResponse(_diary_payload(refreshed))
