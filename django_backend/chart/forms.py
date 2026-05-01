

#####################################################################
##               ホロスコープフォーム作成 ########
##########################################################


from django import forms
from .models import HoroscopeProfile

class HoroscopeForm(forms.Form):
    profile = forms.ModelChoiceField(
        queryset=HoroscopeProfile.objects.all().order_by('person_name'),
        required=False,
        empty_label="登録済みホロスコープを選択"
    )
    person_name = forms.CharField(
        required=False,
        label="名前",
        widget=forms.TextInput(attrs={"placeholder": "Name"})
    )
    place = forms.CharField(
        label="出生地",
        max_length=100,
        widget=forms.TextInput(attrs={"placeholder": "例：仙台市 / Tokyo / Paris"})
    )

    birth_date = forms.DateField(
        label="出生日",
        widget=forms.DateInput(attrs={"type": "date", "placeholder":'01/01/1990'})
    )
    birth_time = forms.TimeField(
        label="出生時刻",
        required=False,
        widget=forms.TimeInput(attrs={"type": "time", 'placeholder':'01:01 PM'})
    )

    # Nominatimで自動セットする（ユーザーは触らない）
    lat = forms.FloatField(required=False, widget=forms.HiddenInput())
    lon = forms.FloatField(required=False, widget=forms.HiddenInput())

class HelioForm(forms.Form):
    birth_date = forms.DateField(
        label="出生日",
        widget=forms.DateInput(attrs={"type": "date", "placeholder":'01/01/1990'})
    )
    birth_time = forms.TimeField(
        label="出生時刻",
        required=False,
        widget=forms.TimeInput(attrs={"type": "time",  'placeholder':'01:01 PM'})
    )
