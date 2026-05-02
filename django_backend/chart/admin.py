from django.contrib import admin

# Register your models here.
from .models import HoroscopeResult, HoroscopeProfile

@admin.register(HoroscopeResult)
class HoroscopeResultAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "cache_key", "created_at")
    search_fields = ("cache_key", "user__username")
    list_filter = ("user", "created_at")

admin.site.register(HoroscopeProfile)
