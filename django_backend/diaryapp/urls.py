from django.urls import path
from . import views
from django.contrib.auth import views as auth_views
from django.views.generic import TemplateView

urlpatterns = [
    path('', views.diary_list, name='diary_list'),
    path('new/', views.diary_create, name='diary_create'),
    path('edit/<int:pk>/', views.diary_edit, name='diary_edit'),  
    path('profile/', views.profile, name='profile'),


    # 認証関連
    path('login/', auth_views.LoginView.as_view(template_name='diaryapp/login.html'), name='login'),
    path('register/', views.register, name='register'),
    path('thank-you/', TemplateView.as_view(template_name="diaryapp/thank_you.html"), name='thank_you'),

    # React
    path("api/diaries/", views.api_diary_list, name="api_diary_list"),
    path("api/diaries/create/", views.api_diary_create, name="api_diary_create"),
    path("api/diaries/<int:pk>/", views.api_diary_detail, name="api_diary_detail"),
]
