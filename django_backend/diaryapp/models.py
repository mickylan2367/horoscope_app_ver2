from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class Diary(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # ← ユーザーと紐づけ
    title = models.CharField(max_length=200)
    content = models.TextField()
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class DiaryImage(models.Model):
    diary = models.ForeignKey(Diary, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='diary_images/%Y/%m/%d/')
    caption = models.CharField(max_length=200, blank=True)

    order = models.PositiveIntegerField(default=0)  # 並び替えしたい場合に便利（任意）

    def __str__(self):
        return f"Image for {self.diary_id}"

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    icon = models.ImageField(
        upload_to='profile_icons/',
        default='profile_icons/logo.png',
        blank=True
    )

    def __str__(self):
        return self.user.username
