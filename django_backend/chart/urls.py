

from django.urls import path
from . import views

app_name = 'chart'
urlpatterns = [
    path('', views.horoscope_view, name='chart=form'),
]
