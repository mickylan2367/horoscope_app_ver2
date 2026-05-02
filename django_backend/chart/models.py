from django.db import models
from django.contrib.auth.models import User

class HoroscopeResult(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="chart_results",
    )
    cache_key = models.CharField(max_length=255)
    result_json = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)
    # "geo": result_geo,
    # "helio": result_helio,
    # "ai_text_geo": ai_text_geo,
    # "ai_text_helio":ai_text_helio,
    # "chart_url": chart_geo_url,

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["cache_key"],
                condition=models.Q(user__isnull=True),
                name="unique_public_chart_result_cache_key",
            ),
            models.UniqueConstraint(
                fields=["user", "cache_key"],
                condition=models.Q(user__isnull=False),
                name="unique_private_chart_result_user_cache_key",
            ),
        ]




class HoroscopeProfile(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="chart_profiles",
    )
    is_public = models.BooleanField(default=False, db_index=True)
    person_name = models.CharField(max_length=100)
    place = models.CharField(max_length=200)
    birth_date = models.DateField()
    birth_time = models.TimeField(null=True, blank=True)
    lat = models.FloatField(null=True, blank=True)
    lon = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.person_name
