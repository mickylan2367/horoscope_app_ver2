from django import forms
from .models import Diary
from django.utils import timezone
import datetime

from django import forms
from .models import Diary,Profile,DiaryImage
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.forms import inlineformset_factory

class DiaryForm(forms.ModelForm):
    class Meta:
        model = Diary
        fields = ['title', 'content', 'date']
        widgets = {
            'date': forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
            'content': forms.Textarea(attrs={
                'id': 'id_content',  # SimpleMDEが使うID
                'required': False    # ← ここ重要！
            }),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # date に初期値がないときだけ今日の日付をセット
        if not self.initial.get('date'):
            self.initial['date'] = datetime.date.today()


class DiaryImageForm(forms.ModelForm):
    class Meta:
        model = DiaryImage
        fields = ['image', 'caption', 'order']

DiaryImageFormSet = inlineformset_factory(
    parent_model=Diary,
    model=DiaryImage,
    form=DiaryImageForm,
    fields=['image', 'caption', 'order'],
    extra=3,       # 初期表示で3行
    can_delete=True,
    max_num=10,    # 上限
)


class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['icon']
        widgets = {
            'icon': forms.ClearableFileInput(attrs={'class': 'form-control'})
        }

# 既存のUserCreationFormを使うなら、ここはそのままでOK
class RegisterForm(UserCreationForm):
    # 必要なら email を必須にする例：
    # email = forms.EmailField(required=True)
    class Meta:
        model = User
        fields = ('username',)  # email入れたいなら ('username', 'email')

class UserUpdateForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username', 'email']  # emailが不要なら ['username'] のみに
        widgets = {
            'username': forms.TextInput(attrs={'class': 'form-control'}),
            'email': forms.EmailInput(attrs={'class': 'form-control'}),
        }
