from django.contrib import admin

# Register your models here.
from .models import HoroscopeResult, HoroscopeProfile

admin.site.register(HoroscopeResult)
admin.site.register(HoroscopeProfile)
