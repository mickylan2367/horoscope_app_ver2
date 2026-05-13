
from django.shortcuts import render, redirect, get_object_or_404
from .models import Diary, DiaryImage, DiaryMemoryChunk, Profile
from .forms import DiaryForm,DiaryImageFormSet
import markdown
import bleach
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
from django.db.models import Prefetch
from django.utils import timezone
from django.utils.dateparse import parse_date
from pathlib import Path
from openai import OpenAI
import os
import re

from .memory import (
    diary_chunk_payload,
    ensure_user_diary_index,
    reindex_user_diaries,
    search_diary_chunks,
)

_client = None


def get_openai_client():
    global _client
    if _client is None:
        _client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    return _client


def plain_text_ai_reply(text, max_chars=None):
    text = re.sub(r"```(?:\w+)?\n?([\s\S]*?)```", r"\1", text or "")
    text = re.sub(r"^#{1,6}\s+", "", text, flags=re.MULTILINE)
    text = re.sub(r"^\s*[-*+]\s+", "", text, flags=re.MULTILINE)
    text = re.sub(r"^\s*\d+[.)]\s+", "", text, flags=re.MULTILINE)
    text = re.sub(r"[*_`]+", "", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    text = text.strip()
    if max_chars and len(text) > max_chars:
        clipped = text[:max_chars]
        sentence_end = max(clipped.rfind("。"), clipped.rfind("！"), clipped.rfind("？"), clipped.rfind("."), clipped.rfind("!"), clipped.rfind("?"))
        if sentence_end >= max_chars * 0.45:
            return clipped[: sentence_end + 1].strip()
        return clipped.rstrip("、, \n") + "..."
    return text


ALLOWED_MARKDOWN_TAGS = {
    "a",
    "blockquote",
    "br",
    "code",
    "em",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "li",
    "ol",
    "p",
    "pre",
    "strong",
    "table",
    "tbody",
    "td",
    "th",
    "thead",
    "tr",
    "ul",
}
ALLOWED_MARKDOWN_ATTRIBUTES = {
    "a": ["href", "title"],
    "th": ["align"],
    "td": ["align"],
}
ALLOWED_MARKDOWN_PROTOCOLS = {"http", "https", "mailto"}


def render_safe_markdown(content):
    html = markdown.markdown(content or "", extensions=["fenced_code", "tables"])
    return bleach.clean(
        html,
        tags=ALLOWED_MARKDOWN_TAGS,
        attributes=ALLOWED_MARKDOWN_ATTRIBUTES,
        protocols=ALLOWED_MARKDOWN_PROTOCOLS,
        strip=True,
    )


def home(request):
    return render(request, 'diaryapp/home.html')


@login_required
def diary_list(request):
    diaries = Diary.objects.filter(user=request.user).order_by('-date')
    for diary in diaries:
        diary.rendered_content = render_safe_markdown(diary.content)

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


def _diary_image_prefetch():
    return Prefetch("images", queryset=DiaryImage.objects.order_by("order", "id"))


def _diary_queryset():
    return Diary.objects.prefetch_related(_diary_image_prefetch())


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
        rendered_content = render_safe_markdown(diary.content)
    return {
        "id": diary.pk,
        "title": diary.title,
        "date": diary.date.isoformat() if diary.date else None,
        "content": diary.content,
        "renderedContent": rendered_content,
        "rendered_content": rendered_content,
        "images": [
            _diary_image_payload(image)
            for image in diary.images.all()
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

    html = render_safe_markdown(data.get("content", ""))
    return JsonResponse({"html": html})



##############################
## for React API
##############################
# @login_required
@require_http_methods(["GET"])
def api_diary_list(request):
    if not request.user.is_authenticated:
        return JsonResponse([], safe=False, status=200)

    diaries = _diary_queryset().filter(user=request.user).order_by("-date")
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
    DiaryMemoryChunk.objects.filter(diary=diary).delete()

    for index, image in enumerate(files):
        DiaryImage.objects.create(diary=diary, image=image, order=index)

    refreshed = _diary_queryset().get(pk=diary.pk)
    return JsonResponse(_diary_payload(refreshed), status=201)


@require_http_methods(["GET", "POST"])
def api_diary_collection(request):
    if request.method == "GET":
        return api_diary_list(request)
    return api_diary_create(request)

@require_http_methods(["GET", "PUT", "DELETE"])
def api_diary_detail(request, pk):
    auth_error = _login_required_json(request)
    if auth_error:
        return auth_error

    diary = get_object_or_404(
        _diary_queryset(),
        pk=pk,
        user=request.user
    )

    if request.method == "GET":
        return JsonResponse(_diary_payload(diary))

    if request.method == "DELETE":
        for image in diary.images.all():
            _delete_image_file(image)
        diary.delete()
        return JsonResponse({"ok": True})

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

    existing_count = diary.images.count()
    image_error = _validate_diary_images(files, existing_count)
    if image_error:
        return JsonResponse({"error": image_error}, status=400)

    diary.date = date
    diary.title = _diary_title_from_date(date)
    diary.content = content
    diary.save()
    DiaryMemoryChunk.objects.filter(diary=diary).delete()

    start_order = existing_count
    for index, image in enumerate(files):
        DiaryImage.objects.create(diary=diary, image=image, order=start_order + index)

    refreshed = _diary_queryset().get(pk=diary.pk)
    return JsonResponse(_diary_payload(refreshed))


api_diary_edit = api_diary_detail


@require_http_methods(["POST"])
def api_diary_image_add(request, pk):
    auth_error = _login_required_json(request)
    if auth_error:
        return auth_error

    diary = get_object_or_404(
        _diary_queryset(),
        pk=pk,
        user=request.user
    )
    files = request.FILES.getlist("images")

    if not files:
        return JsonResponse({"error": "No images selected."}, status=400)

    existing_count = diary.images.count()
    image_error = _validate_diary_images(files, existing_count)
    if image_error:
        return JsonResponse({"error": image_error}, status=400)

    start_order = existing_count
    for index, image in enumerate(files):
        DiaryImage.objects.create(diary=diary, image=image, order=start_order + index)

    refreshed = _diary_queryset().get(pk=diary.pk)
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

    images_to_update = []
    for index, image_id in enumerate(image_ids):
        image = owned_images[image_id]
        image.order = index
        images_to_update.append(image)

    DiaryImage.objects.bulk_update(images_to_update, ["order"])

    refreshed = _diary_queryset().get(pk=diary.pk)
    return JsonResponse(_diary_payload(refreshed))


@require_http_methods(["GET"])
def api_diary_second_self_status(request):
    auth_error = _login_required_json(request)
    if auth_error:
        return auth_error

    return JsonResponse(
        {
            "diaryCount": Diary.objects.filter(user=request.user).count(),
            "chunkCount": DiaryMemoryChunk.objects.filter(user=request.user).count(),
            "indexedDiaryCount": DiaryMemoryChunk.objects.filter(user=request.user).values("diary_id").distinct().count(),
        }
    )


@require_http_methods(["POST"])
def api_diary_second_self_reindex(request):
    auth_error = _login_required_json(request)
    if auth_error:
        return auth_error

    try:
        return JsonResponse(reindex_user_diaries(request.user, force=True))
    except Exception:
        return JsonResponse({"error": "Diary memory index could not be rebuilt."}, status=503)


def generate_second_self_reply(message, chunks):
    message_length = len(message)
    max_reply_chars = max(40, min(600, int(message_length * 1.4) + 20))
    prompt = f"""
You are Mirror Self, a reflective diary companion in LovelyWitch Life.
Use only the provided diary excerpts as memory. Do not pretend to be the user.
When you infer, clearly keep it gentle and uncertain.
This is a dialogue with the user's own self, so keep it quiet and short.
The latest user message is {message_length} characters long. The reply must be
no more than about {max_reply_chars} characters. Match the latest user message
length as much as possible. If the user wrote briefly, reply briefly; if the
user wrote a long message, a longer reply is okay. Borrow the user's diary tone
from the excerpts. Avoid explanations, summaries, labels, and lists unless the
user asks for them. Sound like the user's own words gently answering back.
Plain text only. Do not use Markdown. Do not use headings, bullet points,
numbered lists, bold, code blocks, or quote formatting.

Diary excerpts:
{json.dumps(chunks, ensure_ascii=False, indent=2)}

User message:
{message}

Reply in Japanese unless the user wrote in another language.
""".strip()
    response = get_openai_client().responses.create(
        model="gpt-5.4",
        input=prompt,
    )
    return plain_text_ai_reply(response.output_text, max_chars=max_reply_chars)


@require_http_methods(["POST"])
def api_diary_second_self_chat(request):
    auth_error = _login_required_json(request)
    if auth_error:
        return auth_error

    try:
        data = json.loads(request.body or "{}")
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    message = str(data.get("message", "")).strip()
    if not message:
        return JsonResponse({"error": "message is required"}, status=400)

    try:
        index_status = ensure_user_diary_index(request.user)
        chunks = search_diary_chunks(request.user, message, limit=4)
        reply = generate_second_self_reply(message, chunks)
    except Exception:
        return JsonResponse({"error": "Diary memory chat is temporarily unavailable."}, status=503)

    return JsonResponse(
        {
            "reply": reply,
            "references": chunks,
            "index": index_status,
        }
    )


@require_http_methods(["DELETE"])
def api_diary_second_self_index(request):
    auth_error = _login_required_json(request)
    if auth_error:
        return auth_error

    deleted, _ = DiaryMemoryChunk.objects.filter(user=request.user).delete()
    return JsonResponse({"ok": True, "deleted": deleted})
