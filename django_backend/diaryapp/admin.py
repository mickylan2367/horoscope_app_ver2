from django.contrib import admin
from .models import Diary,Profile
from django.contrib.auth import get_user_model

# admin.site.register(Diary)

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user',)


@admin.register(Diary)
class DiaryAdmin(admin.ModelAdmin):
    list_display = ("title", "user", "date")

    # 一覧を自分のものだけに
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.filter(user=request.user)

    # 個別オブジェクトの閲覧/変更/削除を自分のものだけに
    def has_view_permission(self, request, obj=None):
        if obj is not None and obj.user != request.user:
            return False
        return True

    def has_change_permission(self, request, obj=None):
        if obj is not None and obj.user != request.user:
            return False
        return True

    def has_delete_permission(self, request, obj=None):
        if obj is not None and obj.user != request.user:
            return False
        return True

    # user 外部キーを自分のみに限定（誤登録防止）
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "user":
            User = get_user_model()
            kwargs["queryset"] = User.objects.filter(pk=request.user.pk)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

    # 保存時は自動で自分をセット（必要なら）
    def save_model(self, request, obj, form, change):
        if not change or "user" not in form.changed_data:
            obj.user = request.user
        super().save_model(request, obj, form, change)
