from django.db import models

class HoroscopeResult(models.Model):
    cache_key = models.CharField(max_length=255, unique=True)
    result_json = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)
    # "geo": result_geo,
    # "helio": result_helio,
    # "ai_text_geo": ai_text_geo,
    # "ai_text_helio":ai_text_helio,
    # "chart_url": chart_geo_url,




class HoroscopeProfile(models.Model):
    person_name = models.CharField(max_length=100)
    place = models.CharField(max_length=200)
    birth_date = models.DateField()
    birth_time = models.TimeField(null=True, blank=True)
    lat = models.FloatField(null=True, blank=True)
    lon = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.person_name