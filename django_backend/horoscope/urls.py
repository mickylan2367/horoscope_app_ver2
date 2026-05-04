from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import FileResponse, Http404
from django.urls import include, path

import chart.urls
from chart import views as chart_views
from diaryapp import views as diary_views


def react_app(request, path=""):
    index_path = settings.BASE_DIR / "static" / "react" / "index.html"
    if not index_path.exists():
        raise Http404("React build not found. Run `npm run build` in react_frontend.")
    return FileResponse(open(index_path, "rb"), content_type="text/html")


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/csrf/", diary_views.api_csrf, name="api_csrf"),
    path("api/auth/me/", diary_views.api_auth_me, name="api_auth_me"),
    path("api/auth/login/", diary_views.api_auth_login, name="api_auth_login"),
    path("api/auth/logout/", diary_views.api_auth_logout, name="api_auth_logout"),
    path("api/auth/register/", diary_views.api_auth_register, name="api_auth_register"),
    path("api/profile/", diary_views.api_profile, name="api_profile"),
    path("api/profile/password/", diary_views.api_profile_password, name="api_profile_password"),
    path("api/markdown/preview/", diary_views.api_markdown_preview, name="api_markdown_preview"),
    path("api/diaries/", diary_views.api_diary_collection, name="api_diaries"),
    path("api/diaries/<int:pk>/", diary_views.api_diary_detail, name="api_diary_detail_root"),
    path("api/diaries/<int:pk>/images/", diary_views.api_diary_image_add, name="api_diary_image_add"),
    path("api/diaries/<int:pk>/images/reorder/", diary_views.api_diary_image_reorder, name="api_diary_image_reorder"),
    path("api/diary-images/<int:pk>/", diary_views.api_diary_image_detail, name="api_diary_image_detail"),
    path("api/chart/profiles/", chart_views.api_chart_profiles, name="api_chart_profiles"),
    path("api/chart/calculate/", chart_views.api_chart_calculate, name="api_chart_calculate"),
    path("api/chart/profiles/create/", chart_views.api_chart_profile_create, name="api_chart_profile_create"),
    path("api/chart/profiles/update/", chart_views.api_chart_profile_update, name="api_chart_profile_update"),
    path("diary/", include("diaryapp.urls")),
    path("accounts/", include("django.contrib.auth.urls")),
    path("app/", react_app, name="react_app"),
    path("app/<path:path>", react_app, name="react_app_path"),
    path("", include(chart.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
