
###########################################################
## これ使ってプロジェクトにアプリを認識させるので、これを消すな##
###########################################################

from django.apps import AppConfig


class ChartConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'chart'
