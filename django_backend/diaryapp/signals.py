from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Profile

@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    # ユーザー作成時はProfileを作る
    if created:
        Profile.objects.create(user=instance)
    # 既存ユーザー保存時もProfileを確実に保存
    # （作成直後は instance.profile が存在する）
    instance.profile.save()
