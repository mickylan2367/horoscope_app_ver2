
from django.shortcuts import render
from .models import HoroscopeResult
from .forms import HoroscopeForm
from .utils import calculate_ascendant_skyfield, get_lat_lon, calculate_planet_positions, heliocentric_longitudes,make_cache_key
from skyfield.api import load, Topos   # ここは今まで通りでOK
import pytz
import os
from django.conf import settings
from .draw import draw_horoscope, detect_aspects
from datetime import datetime, time as dtime
from .forms import HoroscopeForm, HelioForm, HoroscopeProfile
import hashlib
from django.core.cache import cache
from django.core.exceptions import PermissionDenied
from openai import OpenAI
import json
from pathlib import Path
from collections import OrderedDict
import re
from django.db.models import Q
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt

# まず必要なモノをロード
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
PLANETS421 = load('de421.bsp')
PLANETS440 = load('de440s.bsp')
TS = load.timescale()

# sabian.json
json_path = Path(__file__).resolve().parent / "sabian.json"
with open(json_path, "r", encoding="utf-8") as f:
    sabian_raw = json.load(f)
sabian_dict = {}
for key, caption in sabian_raw.items():
    sign, deg = key.split("_")
    sabian_dict[(sign, int(deg))] = caption



def make_profiles_dict():
    # 🔥 Index表示用のグループを作る
    grouped_profiles = OrderedDict()
    # 英字
    for c in "ABCDEFGHIJKLMNOPQRSTUVWXYZ":
        grouped_profiles[c] = []
    # 五十音の見出し
    japanese_headers = ['あ', 'か', 'さ', 'た', 'な', 'は', 'ま', 'や', 'ら', 'わ']
    for h in japanese_headers:
        grouped_profiles[h] = []
    grouped_profiles['#'] = []
    return grouped_profiles

def get_group_key(name):
    if not name:
        return '#'

    first = name[0]

    # 英字
    if re.match(r'[A-Za-z]', first):
        return first.upper()

    # カタカナ → ひらがなに寄せる
    code = ord(first)
    if 0x30A1 <= code <= 0x30F6:
        first = chr(code - 0x60)

    # ひらがなを五十音見出しへ
    if 'あ' <= first <= 'お':
        return 'あ'
    elif 'か' <= first <= 'ご':
        return 'か'
    elif 'さ' <= first <= 'ぞ':
        return 'さ'
    elif 'た' <= first <= 'ど':
        return 'た'
    elif 'な' <= first <= 'の':
        return 'な'
    elif 'は' <= first <= 'ぽ':
        return 'は'
    elif 'ま' <= first <= 'も':
        return 'ま'
    elif 'や' <= first <= 'よ':
        return 'や'
    elif 'ら' <= first <= 'ろ':
        return 'ら'
    elif first in ['わ', 'を', 'ん']:
        return 'わ'

    return '#'


def attach_sabian_symbols_forGEO(planet_rows, sabian_dict):
    new_rows = []
    PLANET_MEANINGS_GEO = {
        "☉": "社会的な自己表現方法",
        "☽": "親、子供の時に与えられたもの",
        "☿": "聞こえてくる言葉",
        "♀": "周囲の女性",
        "♂": "周囲の男性",
        "♃": "与えられる社会的恩恵",
        "♄": "与えられる社会的制限",
        "♅": "個人ではどうしようもない変化",
        "♆": "世代の向かう場所",
        "♇": "世代に与えられた運命",
    }
    for row in planet_rows:
        name, sign, deg_in_sign, total_deg, age= row
        # "牡羊座" → "牡羊"
        ZODIAC_SYMBOL_TO_JA = {
            "♈": "牡羊", "♉": "牡牛", "♊": "双子", "♋": "蟹", "♌": "獅子", 
            "♍": "乙女", "♎": "天秤", "♏": "蠍", "♐": "射手", "♑": "山羊", "♒": "水瓶", "♓": "魚",}
        
        sign_clean = ZODIAC_SYMBOL_TO_JA[sign]
        sabian_deg = deg_in_sign + 1
        sabian = sabian_dict.get((sign_clean, sabian_deg), "該当なし")
        age = int(age)
        meaning = PLANET_MEANINGS_GEO.get(name, "")
        new_rows.append([ name, sign, sabian_deg, total_deg, sabian, age, meaning])
    return new_rows

def attach_sabian_symbols_forHELIO(planet_dict, sabian_dict):
    new_rows = []
    PLANET_MEANINGS_HELIO = {
        "♁": "周囲から見たあなたの存在",
        "☿": "語りかける言葉",
        "♀": "放つ魅力",
        "♂": "行動",
        "♃": "周囲に与える恩恵",
        "♄": "周囲への影響力",
        "♅": "時代に培われたあなたの個性",
        "♆": "使う直感、第六感",
        "♇": "導かれる場所",
    }

    ZODIAC_SYMBOL_TO_JA = {
        "♈": "牡羊", "♉": "牡牛", "♊": "双子", "♋": "蟹", "♌": "獅子",
        "♍": "乙女", "♎": "天秤", "♏": "蠍", "♐": "射手", "♑": "山羊",
        "♒": "水瓶", "♓": "魚",
    }

    for name, v in planet_dict.items():
        sign = v.sign
        deg_in_sign = v.deg_in_sign
        minute = v.minute

        sign_clean = ZODIAC_SYMBOL_TO_JA[sign]
        sabian_deg = deg_in_sign + 1
        sabian = sabian_dict.get((sign_clean, sabian_deg), "該当なし")
        meaning = PLANET_MEANINGS_HELIO.get(name, "")
        new_rows.append([name, sign, sabian_deg, sabian, meaning])

    return new_rows

def build_geo_ai_payload(result_geo):
    payload = []
    for row in result_geo:
        payload.append({
            "planet": row[0],
            "meaning": row[6],
            "age": row[5],
            "sign": row[1],
            "sabian": row[4],
        })
    return payload


def build_helio_ai_payload(result_helio):
    payload = []
    for row in result_helio:
        payload.append({
            "planet": row[0],
            "role": row[1],
            "sign": row[2],
            "degree": row[3],
            "sabian": row[4],
        })
    return payload


def generate_ai_reading_geo(geo_payload):
    cache_key = make_ai_cache_key("helio_reading", geo_payload)
    cached = cache.get(cache_key)
    if cached:
        return cached
    prompt = f"""
あなたは魔法世界の語り手です。
この世界では、人は星のもとに人生を歩みます。
この人物がどのような人生を歩むのかを、
年齢の流れに沿って、物語として描写してください。

重視すること：

1. 幼少期 → 力の兆し
2. 青年期 → 葛藤・制御できない時期
3. 成熟期 → 試練や選択
4. その先 → 到達または変容

- サビアンシンボルは直接説明せず、出来事や象徴として表現すること
- 少し古代風だが、分かりやすく落ち着いた語り口で書くこと

長さは300〜500字程度。

データ:
{json.dumps(geo_payload, ensure_ascii=False, indent=2)}
""".strip()
    try:
        response = client.responses.create(
            model="gpt-5.4",
            input=prompt,
        )
        text = response.output_text
        cache.set(cache_key, text, 60 * 60 * 24 * 30)  # 30日
        print('データが作成されました')
        return text
    except Exception as e:
        return f"AI解釈の生成に失敗しました: {str(e)}"


def generate_ai_reading_helio(helio_payload):
    cache_key = make_ai_cache_key("helio_reading", helio_payload)
    cached = cache.get(cache_key)
    if cached:
        return cached
    prompt = f"""
あなたは魔法世界の占星術師です。
この世界では、人は生まれながらにして固有の「才能（ギフト）」を持ちます。
ヘリオセントリックの星の配置は、その人物の力を示します。

以下のデータをもとに、この人物が持つ才能を定義してください。
やさしい日本語で解説してください

重視すること：
- 力の性質（どんな能力か）
- 力の使い方（どう発現するか）
- 内面的な特徴（なぜその力を持つのか）

最後に以下を出力してください：
【力の本質】
【力の発現】
【代償や制約】

長さは300〜500字程度。

データ:
{json.dumps(helio_payload, ensure_ascii=False, indent=2)}
""".strip()

    try:
        response = client.responses.create(
            model="gpt-5.4",
            input=prompt,
        )
        text = response.output_text
        cache.set(cache_key, text, 60 * 60 * 24 * 30)  # 30日
        return text
        # return "hello!"
    except Exception as e:
        return f"AI解釈の生成に失敗しました: {str(e)}"
    

def make_ai_cache_key(prefix, payload):
    raw = json.dumps(payload, ensure_ascii=False, sort_keys=True)
    digest = hashlib.md5(raw.encode("utf-8")).hexdigest()
    return f"{prefix}:{digest}"


def horoscope_view(request):
    result_geo = None
    result_helio = None
    chart_geo_url = None
    chart_helio_url = None
    ai_text_helio = None
    ai_text_geo = None

    # 🔥 追加：登録済みプロフィール一覧
    profiles = _visible_profiles_queryset(request.user)
    grouped_profiles = make_profiles_dict() 
    for p in profiles:
        key = get_group_key(p.person_name)
        grouped_profiles[key].append(p)
    form = HoroscopeForm(request.POST)
    form.fields["profile"].queryset = profiles

    if request.method == 'POST':
        action = request.POST.get('action', 'calculate')

        # 🔥 追加：ボタン選択
        profile_id = request.POST.get('profile_id')

        if profile_id:
            # ===== 一覧から直接取得する場合 =====
            profile = _get_accessible_profile(profile_id, request.user)

            person_name = profile.person_name
            place = profile.place
            birth_date = profile.birth_date
            birth_time = profile.birth_time
            lat = profile.lat
            lon = profile.lon

            if birth_time is None:
                birth_time = dtime(12, 0)

            form = HoroscopeForm(initial={
                'profile': profile,
                'person_name': profile.person_name,
                'place': profile.place,
                'birth_date': profile.birth_date,
                'birth_time': profile.birth_time or dtime(12, 0),
                'lat': profile.lat,
                'lon': profile.lon,
            })

        else:
            # ===== フォーム入力 =====
            form = HoroscopeForm(request.POST)

            if not form.is_valid():
                return render(
                    request,
                    'chart/form.html',
                    {
                        'form': form,
                        'profiles': profiles,
                    }
                )

            save_profile = form.cleaned_data.get('save_profile')
            profile = form.cleaned_data.get('profile')

            if profile:
                person_name = profile.person_name
                place = profile.place
                birth_date = profile.birth_date
                birth_time = profile.birth_time
                lat = profile.lat
                lon = profile.lon
            else:
                person_name = form.cleaned_data.get('person_name')
                place = form.cleaned_data.get('place')
                birth_date = form.cleaned_data.get('birth_date')
                birth_time = form.cleaned_data.get('birth_time')
                lat = form.cleaned_data.get('lat')
                lon = form.cleaned_data.get('lon')

            if lat is None or lon is None:
                lat, lon = get_lat_lon(place)

            if birth_time is None:
                birth_time = dtime(12, 0)

        # ===== 共通処理（ここから下は同じ） =====

        cache_key = make_cache_key(
            birth_date=birth_date,
            birth_time=birth_time,
            lat=lat,
            lon=lon,
        )


        saved = _get_result_queryset(request.user, cache_key).first()
        if saved:
            print("DBから取得しました")
            data = saved.result_json
            result_geo = data.get("geo")
            result_helio = data.get("helio")
            chart_geo_url = data.get("chart_url")
            ai_text_geo = data.get("ai_text_geo")
            ai_text_helio = data.get("ai_text_helio")


            if action == 'save' and request.user.is_authenticated:
                HoroscopeProfile.objects.get_or_create(
                    user=request.user if request.user.is_authenticated else None,
                    person_name=person_name,
                    birth_date=birth_date,
                    birth_time=birth_time,
                    defaults={
                        'place': place,
                        'lat': lat,
                        'lon': lon,
                        'is_public': False,
                    }
                )

            if action == 'ai':
                if not ai_text_helio and result_helio:
                    helio_payload = build_helio_ai_payload(result_helio)
                    ai_text_helio = generate_ai_reading_helio(helio_payload)

                if not ai_text_geo and result_geo:
                    geo_payload = build_geo_ai_payload(result_geo)
                    ai_text_geo = generate_ai_reading_geo(geo_payload)

                data["ai_text_geo"] = ai_text_geo
                data["ai_text_helio"] = ai_text_helio
                saved.result_json = data
                saved.save()

            return render(
                request,
                'chart/form.html',
                {
                    'form': form,
                    'profiles': profiles,
                    'grouped_profiles': grouped_profiles,
                    'result_geo': result_geo,
                    'result_helio': result_helio,
                    'chart_geo_url': chart_geo_url,
                    'ai_text_geo': ai_text_geo,
                    'ai_text_helio': ai_text_helio,
                    'from_cache': True,
                }
            )

        # 計算処理
        birth_datetime = datetime.combine(birth_date, birth_time)

        jst = pytz.timezone('Asia/Tokyo')
        jst_dt = jst.localize(birth_datetime) if birth_datetime.tzinfo is None else birth_datetime.astimezone(jst)
        t = TS.from_datetime(jst_dt)

        location = Topos(latitude_degrees=float(lat), longitude_degrees=float(lon))

        ascendant = calculate_ascendant_skyfield(t, location, PLANETS421)

        planet_rows, zodiac_sign = calculate_planet_positions(
            t=t,
            location=location,
            planets421=PLANETS421,
            planets440=PLANETS440,
            ascendant=ascendant
        )

        result_geo = attach_sabian_symbols_forGEO(planet_rows, sabian_dict)

        helio_rows = heliocentric_longitudes(birth_datetime, eph_path="de421.bsp")
        result_helio = attach_sabian_symbols_forHELIO(helio_rows, sabian_dict)

        aspects = detect_aspects(planet_rows)
        for a in aspects:
            print(f'{a["p1"]}-{a["p2"]}: {a["aspect"]} ({a["diff"]:.2f}°, orb {a["orb"]:.2f}°)')

        abs_path = os.path.join(settings.MEDIA_ROOT, 'horoscope/chart_geo_.png')
        draw_horoscope(result_geo, abs_path, asc=ascendant, aspects_found=aspects)
        chart_geo_url = settings.MEDIA_URL + 'horoscope/chart_geo_.png'

        if action == 'ai' and result_helio:
            helio_payload = build_helio_ai_payload(result_helio)
            ai_text_helio = generate_ai_reading_helio(helio_payload)

            geo_payload = build_geo_ai_payload(result_geo)
            ai_text_geo = generate_ai_reading_geo(geo_payload)

        if action == 'save' and request.user.is_authenticated:
            HoroscopeProfile.objects.get_or_create(
                user=request.user if request.user.is_authenticated else None,
                person_name=person_name,
                birth_date=birth_date,
                birth_time=birth_time,
                defaults={
                    'place': place,
                    'lat': lat,
                    'lon': lon,
                    'is_public': False,
                }
            )

        result_json = {
            "geo": result_geo,
            "helio": result_helio,
            "ai_text_geo": ai_text_geo,
            "ai_text_helio": ai_text_helio,
            "chart_url": chart_geo_url,
        }

        HoroscopeResult.objects.create(
            user=_result_owner_for_user(request.user),
            cache_key=cache_key,
            result_json=result_json,
        )

    else:
        form = HoroscopeForm()

    return render(
        request,
        'chart/form.html',
        {
            'form': form,
            'profiles': profiles,  # 🔥 追加
            'grouped_profiles': grouped_profiles,
            'result_geo': result_geo,
            'result_helio': result_helio,
            'chart_geo_url': chart_geo_url,
            'ai_text_helio': ai_text_helio,
            'ai_text_geo': ai_text_geo,
        }
    )


def _profile_to_json(profile):
    return {
        "id": profile.pk,
        "userId": profile.user_id,
        "personName": profile.person_name,
        "person_name": profile.person_name,
        "place": profile.place,
        "birthDate": profile.birth_date.isoformat() if profile.birth_date else None,
        "birth_date": profile.birth_date.isoformat() if profile.birth_date else None,
        "birthTime": profile.birth_time.isoformat(timespec="minutes") if profile.birth_time else "",
        "birth_time": profile.birth_time.isoformat(timespec="minutes") if profile.birth_time else "",
        "lat": profile.lat,
        "lon": profile.lon,
        "isPublic": profile.is_public,
        "is_public": profile.is_public,
    }


def _public_profiles_queryset():
    return HoroscopeProfile.objects.filter(is_public=True).order_by("person_name")


def _private_profiles_queryset(user):
    if not user.is_authenticated:
        return HoroscopeProfile.objects.none()
    return HoroscopeProfile.objects.filter(user=user, is_public=False).order_by("person_name")


def _visible_profiles_queryset(user):
    if not user.is_authenticated:
        return _public_profiles_queryset()
    return HoroscopeProfile.objects.filter(Q(is_public=True) | Q(user=user)).order_by("person_name")


def _get_accessible_profile(profile_id, user):
    profile = HoroscopeProfile.objects.filter(pk=profile_id).first()
    if profile is None:
        raise HoroscopeProfile.DoesNotExist
    if profile.is_public:
        return profile
    if user.is_authenticated and profile.user_id == user.id:
        return profile
    raise PermissionDenied("You do not have access to this profile.")


def _result_owner_for_user(user):
    return user if user.is_authenticated else None


def _get_result_queryset(user, cache_key):
    return HoroscopeResult.objects.filter(cache_key=cache_key, user=_result_owner_for_user(user))


@require_http_methods(["GET"])
def api_chart_profiles(request):
    public_profiles = _public_profiles_queryset()
    private_profiles = _private_profiles_queryset(request.user)
    return JsonResponse(
        {
            "authenticated": request.user.is_authenticated,
            "publicProfiles": [_profile_to_json(profile) for profile in public_profiles],
            "privateProfiles": [_profile_to_json(profile) for profile in private_profiles],
        }
    )


def _parse_birth_time(value):
    if not value:
        return dtime(12, 0)
    return dtime.fromisoformat(value)


def _calculate_chart(data, user, include_ai=False, save_profile=False):
    profile = None
    profile_id = data.get("profileId") or data.get("profile_id")
    if profile_id:
        profile = _get_accessible_profile(profile_id, user)

    if profile:
        person_name = profile.person_name
        place = profile.place
        birth_date = profile.birth_date
        birth_time = profile.birth_time or dtime(12, 0)
        lat = profile.lat
        lon = profile.lon
    else:
        person_name = data.get("personName") or data.get("person_name") or ""
        place = data.get("place") or ""
        birth_date = datetime.fromisoformat(data.get("birthDate") or data.get("birth_date")).date()
        birth_time = _parse_birth_time(data.get("birthTime") or data.get("birth_time"))
        lat = data.get("lat")
        lon = data.get("lon")

    if lat is None or lon is None:
        lat, lon = get_lat_lon(place)

    cache_key = make_cache_key(
        birth_date=birth_date,
        birth_time=birth_time,
        lat=lat,
        lon=lon,
    )

    saved = _get_result_queryset(user, cache_key).first()
    if saved:
        result_json = saved.result_json
        if include_ai and (not result_json.get("ai_text_geo") or not result_json.get("ai_text_helio")):
            if result_json.get("helio"):
                result_json["ai_text_helio"] = generate_ai_reading_helio(
                    build_helio_ai_payload(result_json["helio"])
                )
            if result_json.get("geo"):
                result_json["ai_text_geo"] = generate_ai_reading_geo(
                    build_geo_ai_payload(result_json["geo"])
                )
            saved.result_json = result_json
            saved.save(update_fields=["result_json"])
    else:
        birth_datetime = datetime.combine(birth_date, birth_time)
        jst = pytz.timezone("Asia/Tokyo")
        jst_dt = jst.localize(birth_datetime) if birth_datetime.tzinfo is None else birth_datetime.astimezone(jst)
        t = TS.from_datetime(jst_dt)
        location = Topos(latitude_degrees=float(lat), longitude_degrees=float(lon))
        ascendant = calculate_ascendant_skyfield(t, location, PLANETS421)
        planet_rows, zodiac_sign = calculate_planet_positions(
            t=t,
            location=location,
            planets421=PLANETS421,
            planets440=PLANETS440,
            ascendant=ascendant,
        )
        result_geo = attach_sabian_symbols_forGEO(planet_rows, sabian_dict)
        helio_rows = heliocentric_longitudes(birth_datetime, eph_path="de421.bsp")
        result_helio = attach_sabian_symbols_forHELIO(helio_rows, sabian_dict)
        aspects = detect_aspects(planet_rows)
        abs_path = os.path.join(settings.MEDIA_ROOT, "horoscope/chart_geo_.png")
        draw_horoscope(result_geo, abs_path, asc=ascendant, aspects_found=aspects)
        chart_geo_url = settings.MEDIA_URL + "horoscope/chart_geo_.png"

        result_json = {
            "geo": result_geo,
            "helio": result_helio,
            "ai_text_geo": None,
            "ai_text_helio": None,
            "chart_url": chart_geo_url,
        }

        if include_ai:
            result_json["ai_text_helio"] = generate_ai_reading_helio(build_helio_ai_payload(result_helio))
            result_json["ai_text_geo"] = generate_ai_reading_geo(build_geo_ai_payload(result_geo))

        saved = HoroscopeResult.objects.create(
            user=_result_owner_for_user(user),
            cache_key=cache_key,
            result_json=result_json,
        )

    if save_profile:
        if not user.is_authenticated:
            raise PermissionDenied("Login required to save chart profiles.")

        HoroscopeProfile.objects.get_or_create(
            user=user,
            person_name=person_name,
            birth_date=birth_date,
            birth_time=birth_time,
            defaults={
                "place": place,
                "lat": lat,
                "lon": lon,
                "is_public": False,
            },
        )

    return {
        "cacheKey": cache_key,
        "profile": {
            "personName": person_name,
            "place": place,
            "birthDate": birth_date.isoformat(),
            "birthTime": birth_time.isoformat(timespec="minutes") if birth_time else "",
            "lat": lat,
            "lon": lon,
        },
        "resultGeo": result_json.get("geo"),
        "resultHelio": result_json.get("helio"),
        "aiTextGeo": result_json.get("ai_text_geo"),
        "aiTextHelio": result_json.get("ai_text_helio"),
        "chartGeoUrl": result_json.get("chart_url"),
        "fromCache": bool(saved),
    }


@require_http_methods(["POST"])
def api_chart_calculate(request):
    try:
        data = json.loads(request.body)
        payload = _calculate_chart(
            data,
            request.user,
            include_ai=bool(data.get("includeAi") or data.get("include_ai")),
            save_profile=bool(data.get("saveProfile") or data.get("save_profile")),
        )
        return JsonResponse(payload)
    except HoroscopeProfile.DoesNotExist:
        return JsonResponse({"error": "Profile not found"}, status=404)
    except PermissionDenied as exc:
        return JsonResponse({"error": str(exc)}, status=403)
    except Exception as exc:
        return JsonResponse({"error": str(exc)}, status=400)


@require_http_methods(["POST"])
def api_chart_profile_create(request):
    try:
        if not request.user.is_authenticated:
            return JsonResponse({"error": "Login required"}, status=401)

        data = json.loads(request.body)
        birth_date = datetime.fromisoformat(data.get("birthDate") or data.get("birth_date")).date()
        birth_time = _parse_birth_time(data.get("birthTime") or data.get("birth_time"))
        profile, created = HoroscopeProfile.objects.get_or_create(
            user=request.user,
            person_name=data.get("personName") or data.get("person_name") or "",
            birth_date=birth_date,
            birth_time=birth_time,
            defaults={
                "place": data.get("place") or "",
                "lat": data.get("lat"),
                "lon": data.get("lon"),
                "is_public": False,
            },
        )
        return JsonResponse(_profile_to_json(profile), status=201 if created else 200)
    except PermissionDenied as exc:
        return JsonResponse({"error": str(exc)}, status=403)
    except Exception as exc:
        return JsonResponse({"error": str(exc)}, status=400)
