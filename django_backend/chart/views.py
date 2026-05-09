
from django.shortcuts import render
from .models import (
    HoroscopeResult,
    TarotCard,
    TarotConsultMessage,
    TarotConsultSession,
    TarotDeck,
    TarotReading,
    TarotReadingCard,
)
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
import random
from django.db import transaction
from django.db.models import Count, Q
from django.http import JsonResponse, RawPostDataException
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from diaryapp.memory import ensure_user_diary_index, search_diary_chunks

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
    cache_key = make_ai_cache_key("geo_reading", geo_payload)
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
    

def build_tarot_ai_payload(reading):
    return {
        "question": reading.question,
        "spreadType": reading.spread_type,
        "deck": reading.deck.name if reading.deck else "",
        "cards": [
            {
                "position": card.position_label,
                "name": card.card_name_snapshot,
                "orientation": "reversed" if card.is_reversed else "upright",
                "meaning": card.meaning_snapshot,
            }
            for card in reading.cards.all()
        ],
    }


def generate_ai_tarot_interpretation(tarot_payload):
    cache_key = make_ai_cache_key("tarot_reading_v3", tarot_payload)
    cached = cache.get(cache_key)
    if cached:
        return cached

    prompt = f"""
あなたは、夜の小さな相談室にいる魔女のタロット読みです。
相談者の悩みと引かれたカードをもとに、日本語で占いの解釈を書いてください。

大切な姿勢:
- 相談者のつらさや迷いには寄り添う。ただし、根拠なく「大丈夫」「必ず良くなる」とは言わない。
- カードが停滞、拒絶、終わり、未練、危険、損失、関係の不均衡を示す場合は、やわらかくぼかしすぎず、はっきり告げる。
- 良いカード、回復や発展を示すカード、正位置で力が出ているカードがある場合は、その象徴から「どんな良い未来が起こりそうか」を具体的な出来事として描く。例: 連絡が来る、誤解がほどける、協力者が現れる、仕事の評価が上がる、気持ちが前向きに戻る、次の約束が決まるなど。
- 良い流れは、抽象的な励ましだけで終わらせない。カード名、位置、向き、意味を根拠にして、相談者が想像しやすい未来の場面へ紡ぐ。
- ただし、未来を断定しすぎない。「〜になりそう」「〜の兆しがあります」「〜へ進みやすい流れです」のように、占いとして自然な余白を残す。
- 怖がらせる断定や脅しは避ける。占いは決定ではなく、今見えている流れとして伝える。
- 恋愛・仕事・人間関係の悩みに対して、相手の気持ちを断定しすぎず、相談者が次に取れる現実的な一歩を示す。
- 医療、法律、金銭の重大判断は専門家への相談を促す。

出力形式:
1. まず2〜3文で、全体の流れを魔女らしい静かな語り口で伝える。
2. 良いカードがある場合は、全体の流れの中に「近い未来に起こりそうな良い具体的事象」を1〜2個入れる。
3. 次に、カードごとの意味を短く読む。
4. 最後に「今夜の助言」として、相談者が今日か明日にできる具体的な行動を1〜3個示す。

長さは500〜900字程度。

データ:
{json.dumps(tarot_payload, ensure_ascii=False, indent=2)}
""".strip()
    prompt = f"""
あなたは、夜の小さな相談室にいる「怖くないタロット読み」です。
相談者の悩みと引かれたカードをもとに、日本語でやさしく深掘りした解釈を書いてください。

大切な姿勢:
- 相談者を怖がらせない。責めない。突き放さない。
- つらさ、迷い、不安がある場合は、まずその気持ちに寄り添う。
- ただし根拠なく「大丈夫」「必ず良くなる」とは言わない。カード名、位置、向き、意味を根拠にする。
- 厳しいカード、停滞、終わり、未練、不安定さ、関係のすれ違いを示すカードがある場合も、やわらかく現実的に伝える。
- 悪いカードは「終わり」ではなく、「注意点」「回復の入口」「自分を守るヒント」として読む。
- 良いカード、回復や発展を示すカード、正位置で力が出ているカードがある場合は、その象徴から「近い未来に起こりそうな良い具体的事象」を1〜2個入れる。
  例: 連絡が来る、誤解がほどける、協力者が現れる、仕事の評価が上がる、気持ちが前向きに戻る、次の約束が決まる、安心できる会話が生まれる。
- 良い流れは、抽象的な励ましだけで終わらせない。相談者が想像しやすい未来の場面として紡ぐ。
- 未来は断定しすぎない。「〜になりそう」「〜の兆しがあります」「〜へ進みやすい流れです」のように、占いとして自然な余白を残す。
- 相手の気持ちを読む場合も断定しすぎず、「そう見えます」「その可能性があります」と表現する。
- 相談者がやりたいこと、進みたい方向が質問に含まれている場合は、危険を煽らず、その気持ちを後押しする。
- 迷っている、動けない、まだ決めたくない相談者には、「今のまま様子を見る」「無理に動かない」選択も肯定する。
- 医療、法律、投資など重大判断は、専門家への相談を促す。

出力形式:
1. まず1〜2文で、全体の流れを親しみやすく伝える。
2. 次に、カードごとの意味を短く深掘りする。
3. 良いカードや回復の兆しがある場合は、近い未来に起こりそうな具体的な良い出来事を1〜2個入れる。
4. 最後に「今日からできる小さな行動」を1〜2個、具体的に提案する。

文体:
- やさしく、親しみやすく、少し明るい。
- ポップすぎず、落ち着いた相談室のように。
- 相談者を置いていかない。
- 500〜800字程度。

データ:
{json.dumps(tarot_payload, ensure_ascii=False, indent=2)}
""".strip()
    try:
        response = client.responses.create(
            model="gpt-5.4",
            input=prompt,
        )
        text = response.output_text
        cache.set(cache_key, text, 60 * 60 * 24 * 30)
        return text
    except Exception as e:
        return f"AI解釈の生成に失敗しました: {str(e)}"


def _tarot_consult_references(reading):
    return {
        "question": reading.question,
        "spreadType": reading.spread_type,
        "createdAt": reading.created_at.isoformat(),
        "cards": [
            {
                "name": card.card_name_snapshot,
                "position": card.position_label,
                "isReversed": card.is_reversed,
                "meaning": card.meaning_snapshot,
            }
            for card in reading.cards.all()
        ],
    }


def plain_text_ai_reply(text, max_chars=None):
    text = re.sub(r"```(?:\w+)?\n?([\s\S]*?)```", r"\1", text or "")
    text = re.sub(r"^#{1,6}\s+", "", text, flags=re.MULTILINE)
    text = re.sub(r"^\s*[-*+]\s+", "", text, flags=re.MULTILINE)
    text = re.sub(r"^\s*\d+[.)]\s+", "", text, flags=re.MULTILINE)
    text = re.sub(r"[*_`]+", "", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    text = text.strip()
    if max_chars and len(text) > max_chars:
        clipped = text[:max_chars]
        sentence_end = max(clipped.rfind("。"), clipped.rfind("！"), clipped.rfind("？"), clipped.rfind("."), clipped.rfind("!"), clipped.rfind("?"))
        if sentence_end >= max_chars * 0.45:
            return clipped[: sentence_end + 1].strip()
        return clipped.rstrip("、, \n") + "..."
    return text


def generate_ai_tarot_consult_reply(reading, message, history=None, diary_context=None):
    tarot_payload = build_tarot_ai_payload(reading)
    history_payload = history or []
    diary_payload = diary_context or []
    message_length = len(message)
    max_reply_chars = max(40, min(600, int(message_length * 1.4) + 20))
    prompt = f"""
You are a calm tarot consultation partner inside LovelyWitch Life.
Use only the saved tarot reading context and the user's latest message.
Do not predict the future as certainty. Do not give medical, legal, financial,
or emergency decisions. If the user sounds at risk, encourage contacting a
trusted person or qualified local support.

Tone:
- speak like a quiet inner dialogue, not an outside fortune teller
- the latest user message is {message_length} characters long
- the reply must be no more than about {max_reply_chars} characters
- match the latest user message length as much as possible
- if the user wrote briefly, reply briefly; if the user wrote a long message, a longer reply is okay
- borrow the user's diary tone from the related diary excerpts
- avoid explanations, summaries, labels, and lists unless the user asks
- sound like the user's own words gently answering back
- plain text only; do not use Markdown
- do not use headings, bullet points, numbered lists, bold, code blocks, or quote formatting

Saved reading:
{json.dumps(tarot_payload, ensure_ascii=False, indent=2)}

Saved AI interpretation:
{reading.ai_interpretation or "(none)"}

Recent consult history:
{json.dumps(history_payload, ensure_ascii=False, indent=2)}

Related diary excerpts:
{json.dumps(diary_payload, ensure_ascii=False, indent=2)}

User message:
{message}

Reply in Japanese unless the user clearly wrote in another language.
""".strip()
    try:
        response = client.responses.create(
            model="gpt-5.4",
            input=prompt,
        )
        return plain_text_ai_reply(response.output_text, max_chars=max_reply_chars)
    except Exception as exc:
        raise RuntimeError("Tarot consult reply could not be generated.") from exc


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

        helio_rows = heliocentric_longitudes(birth_datetime, ts=TS, eph=PLANETS421)
        result_helio = attach_sabian_symbols_forHELIO(helio_rows, sabian_dict)

        aspects = detect_aspects(planet_rows)

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


def _get_editable_profile(profile_id, user):
    if not user.is_authenticated:
        raise PermissionDenied("Login required to edit chart profiles.")

    profile = HoroscopeProfile.objects.filter(pk=profile_id, user=user, is_public=False).first()
    if profile is None:
        raise PermissionDenied("You do not have access to edit this profile.")
    return profile


def _profile_fields_from_data(data, profile=None):
    person_name = data.get("personName") or data.get("person_name") or (profile.person_name if profile else "")
    place = data.get("place") or data.get("place_name") or (profile.place if profile else "")

    birth_date_value = data.get("birthDate") or data.get("birth_date")
    if birth_date_value:
        birth_date = datetime.fromisoformat(birth_date_value).date()
    elif profile is not None:
        birth_date = profile.birth_date
    else:
        raise ValueError("Birth date is required")

    birth_time_value = data.get("birthTime") or data.get("birth_time")
    if birth_time_value:
        birth_time = _parse_birth_time(birth_time_value)
    elif profile is not None and profile.birth_time:
        birth_time = profile.birth_time
    else:
        birth_time = dtime(12, 0)

    lat = data.get("lat")
    lon = data.get("lon")
    if lat is None or lon is None:
        if place:
            lat, lon = get_lat_lon(place)
        elif profile is not None:
            lat = profile.lat
            lon = profile.lon

    return {
        "person_name": person_name,
        "place": place,
        "birth_date": birth_date,
        "birth_time": birth_time,
        "lat": lat,
        "lon": lon,
    }


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
        helio_rows = heliocentric_longitudes(birth_datetime, ts=TS, eph=PLANETS421)
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
        profile_fields = _profile_fields_from_data(data)
        profile, created = HoroscopeProfile.objects.get_or_create(
            user=request.user,
            person_name=profile_fields["person_name"],
            birth_date=profile_fields["birth_date"],
            birth_time=profile_fields["birth_time"],
            defaults={
                "place": profile_fields["place"],
                "lat": profile_fields["lat"],
                "lon": profile_fields["lon"],
                "is_public": False,
            },
        )
        return JsonResponse(_profile_to_json(profile), status=201 if created else 200)
    except PermissionDenied as exc:
        return JsonResponse({"error": str(exc)}, status=403)
    except Exception as exc:
        return JsonResponse({"error": str(exc)}, status=400)


@require_http_methods(["POST"])
def api_chart_profile_update(request):
    try:
        if not request.user.is_authenticated:
            return JsonResponse({"error": "Login required"}, status=401)

        data = json.loads(request.body)
        profile_id = data.get("profileId") or data.get("profile_id")
        if not profile_id:
            return JsonResponse({"error": "Profile ID required"}, status=400)

        profile = _get_editable_profile(profile_id, request.user)
        profile_fields = _profile_fields_from_data(data, profile)

        profile.person_name = profile_fields["person_name"]
        profile.place = profile_fields["place"]
        profile.birth_date = profile_fields["birth_date"]
        profile.birth_time = profile_fields["birth_time"]
        profile.lat = profile_fields["lat"]
        profile.lon = profile_fields["lon"]
        profile.save()

        return JsonResponse(_profile_to_json(profile))
    except PermissionDenied as exc:
        return JsonResponse({"error": str(exc)}, status=403)
    except Exception as exc:
        return JsonResponse({"error": str(exc)}, status=400)


TAROT_DEFAULT_LIMIT = 50
TAROT_SPREAD_LABELS = {
    TarotReading.SPREAD_ONE_CARD: ["Message"],
    TarotReading.SPREAD_THREE_CARD: ["Past", "Present", "Future"],
}


def _tarot_auth_error(request):
    if request.user.is_authenticated:
        return None
    return JsonResponse({"error": "Login required"}, status=401)


def get_tarot_reading_limit(user):
    return TAROT_DEFAULT_LIMIT


def _tarot_visible_decks(user):
    if user.is_authenticated:
        return TarotDeck.objects.filter(Q(is_system=True) | Q(user=user) | Q(is_public=True)).annotate(card_count=Count("cards"))
    return TarotDeck.objects.filter(Q(is_system=True) | Q(is_public=True)).annotate(card_count=Count("cards"))


def _tarot_editable_deck(deck_id, user):
    if not user.is_authenticated:
        raise PermissionDenied("Login required")
    return TarotDeck.objects.get(pk=deck_id, user=user, is_system=False)


def _tarot_visible_deck(deck_id, user):
    return _tarot_visible_decks(user).get(pk=deck_id)


def _card_image_value(card):
    if card.image:
        return card.image.url
    return card.image_url


def _deck_cover_value(deck):
    if deck.cover_image:
        return deck.cover_image.url
    return deck.cover_image_url


def _tarot_deck_payload(deck):
    return {
        "id": deck.pk,
        "name": deck.name,
        "slug": deck.slug,
        "description": deck.description,
        "coverImage": _deck_cover_value(deck),
        "cover_image": _deck_cover_value(deck),
        "deckType": deck.deck_type,
        "deck_type": deck.deck_type,
        "isSystem": deck.is_system,
        "is_system": deck.is_system,
        "isPublic": deck.is_public,
        "is_public": deck.is_public,
        "ownerId": deck.user_id,
        "owner_id": deck.user_id,
        "ownerName": deck.user.username if deck.user_id and getattr(deck, "user", None) else "",
        "owner_name": deck.user.username if deck.user_id and getattr(deck, "user", None) else "",
        "allowReversed": deck.allow_reversed,
        "allow_reversed": deck.allow_reversed,
        "cardCount": getattr(deck, "card_count", deck.cards.count()),
        "card_count": getattr(deck, "card_count", deck.cards.count()),
    }


def _tarot_card_payload(card, include_meanings=True):
    payload = {
        "id": card.pk,
        "deckId": card.deck_id,
        "deck_id": card.deck_id,
        "name": card.name,
        "arcana": card.arcana,
        "suit": card.suit,
        "number": card.number,
        "keywords": card.keywords,
        "image": _card_image_value(card),
        "order": card.order,
    }
    if include_meanings:
        payload.update(
            {
                "uprightMeaning": card.upright_meaning,
                "upright_meaning": card.upright_meaning,
                "reversedMeaning": card.reversed_meaning,
                "reversed_meaning": card.reversed_meaning,
            }
        )
    return payload


def _tarot_reading_payload(reading, limit=None):
    if limit is None:
        limit = get_tarot_reading_limit(reading.user)
    count = TarotReading.objects.filter(user=reading.user).count()
    return {
        "id": reading.pk,
        "deck": _tarot_deck_payload(reading.deck) if reading.deck else None,
        "deckId": reading.deck_id,
        "deck_id": reading.deck_id,
        "spreadType": reading.spread_type,
        "spread_type": reading.spread_type,
        "question": reading.question,
        "aiInterpretation": reading.ai_interpretation,
        "ai_interpretation": reading.ai_interpretation,
        "memo": reading.memo,
        "isPinned": reading.is_pinned,
        "is_pinned": reading.is_pinned,
        "createdAt": reading.created_at.isoformat(),
        "created_at": reading.created_at.isoformat(),
        "updatedAt": reading.updated_at.isoformat(),
        "updated_at": reading.updated_at.isoformat(),
        "limit": limit,
        "remaining": max(limit - count, 0),
        "cards": [
            {
                "id": reading_card.pk,
                "position": reading_card.position,
                "positionLabel": reading_card.position_label,
                "position_label": reading_card.position_label,
                "cardId": reading_card.card_id,
                "card_id": reading_card.card_id,
                "cardName": reading_card.card_name_snapshot,
                "card_name": reading_card.card_name_snapshot,
                "isReversed": reading_card.is_reversed,
                "is_reversed": reading_card.is_reversed,
                "meaning": reading_card.meaning_snapshot,
                "image": reading_card.image_snapshot,
            }
            for reading_card in reading.cards.all()
        ],
    }


def _tarot_consult_message_payload(message):
    return {
        "id": message.pk,
        "role": message.role,
        "content": message.content,
        "createdAt": message.created_at.isoformat(),
        "created_at": message.created_at.isoformat(),
    }


def _tarot_consult_session_payload(session, reading):
    messages = list(session.messages.all()) if session else []
    return {
        "session": {
            "id": session.pk if session else None,
            "title": session.title if session else "",
            "createdAt": session.created_at.isoformat() if session else "",
            "created_at": session.created_at.isoformat() if session else "",
            "updatedAt": session.updated_at.isoformat() if session else "",
            "updated_at": session.updated_at.isoformat() if session else "",
        },
        "readingId": reading.pk,
        "reading_id": reading.pk,
        "references": _tarot_consult_references(reading),
        "messages": [_tarot_consult_message_payload(message) for message in messages],
    }


def _tarot_consult_title(reading):
    return (reading.question or f"{reading.get_spread_type_display()} consult")[:160]


def _json_body(request):
    try:
        return json.loads(request.body or "{}")
    except RawPostDataException:
        return request.POST
    except json.JSONDecodeError:
        raise ValueError("Invalid JSON")


ALLOWED_TAROT_IMAGE_CONTENT_TYPES = {"image/jpeg", "image/png", "image/webp"}
MAX_TAROT_IMAGE_SIZE = 5 * 1024 * 1024


def _tarot_request_data(request):
    content_type = (request.META.get("CONTENT_TYPE") or request.content_type or "").lower()
    if content_type.startswith("multipart/form-data"):
        return request.POST
    return _json_body(request)


def _coerce_bool(value, default=False):
    if value is None:
        return default
    if isinstance(value, bool):
        return value
    if isinstance(value, str):
        return value.strip().lower() in {"1", "true", "yes", "on"}
    return bool(value)


def _tarot_image_error(image):
    if not image:
        return ""
    if image.size > MAX_TAROT_IMAGE_SIZE:
        return f"{image.name} is larger than 5MB."
    if image.content_type not in ALLOWED_TAROT_IMAGE_CONTENT_TYPES:
        return f"{image.name} must be JPEG, PNG, or WebP."
    return ""


def _trim_tarot_readings(user):
    limit = get_tarot_reading_limit(user)
    overflow = TarotReading.objects.filter(user=user).count() - limit
    if overflow <= 0:
        return

    delete_ids = list(
        TarotReading.objects.filter(user=user, is_pinned=False)
        .order_by("created_at", "id")
        .values_list("id", flat=True)[:overflow]
    )
    if len(delete_ids) < overflow:
        raise ValueError("Pinned readings are at the limit. Unpin one before saving another.")
    TarotReading.objects.filter(id__in=delete_ids).delete()


def _tarot_spread_count(spread_type):
    if spread_type == TarotReading.SPREAD_THREE_CARD:
        return 3
    if spread_type == TarotReading.SPREAD_ONE_CARD:
        return 1
    raise ValueError("Unsupported spread type")


@require_http_methods(["GET", "POST"])
def api_tarot_decks(request):
    if request.method == "GET":
        decks = _tarot_visible_decks(request.user).select_related("user")
        return JsonResponse(
            {
                "systemDecks": [_tarot_deck_payload(deck) for deck in decks if deck.is_system],
                "sharedDecks": [
                    _tarot_deck_payload(deck)
                    for deck in decks
                    if deck.is_public and not deck.is_system and deck.user_id != getattr(request.user, "id", None)
                ],
                "myDecks": [
                    _tarot_deck_payload(deck)
                    for deck in decks
                    if not deck.is_system and deck.user_id == getattr(request.user, "id", None)
                ],
            }
        )

    auth_error = _tarot_auth_error(request)
    if auth_error:
        return auth_error
    try:
        data = _tarot_request_data(request)
    except ValueError as exc:
        return JsonResponse({"error": str(exc)}, status=400)

    cover_error = _tarot_image_error(request.FILES.get("coverImageFile"))
    if cover_error:
        return JsonResponse({"error": cover_error}, status=400)

    name = str(data.get("name", "")).strip()
    if not name:
        return JsonResponse({"error": "name is required"}, status=400)

    deck_type = data.get("deckType") or data.get("deck_type") or TarotDeck.DECK_TYPE_TAROT
    if deck_type not in {TarotDeck.DECK_TYPE_TAROT, TarotDeck.DECK_TYPE_ORACLE}:
        return JsonResponse({"error": "deckType must be tarot or oracle"}, status=400)

    deck = TarotDeck.objects.create(
        user=request.user,
        name=name,
        description=str(data.get("description", "")),
        cover_image_url=str(data.get("coverImage", data.get("cover_image", "")) or ""),
        deck_type=deck_type,
        is_public=_coerce_bool(data.get("isPublic", data.get("is_public")), False),
        allow_reversed=_coerce_bool(data.get("allowReversed", data.get("allow_reversed")), deck_type == TarotDeck.DECK_TYPE_TAROT),
    )
    if request.FILES.get("coverImageFile"):
        deck.cover_image = request.FILES["coverImageFile"]
        deck.cover_image_url = ""
        deck.save(update_fields=["cover_image", "cover_image_url", "updated_at"])
    return JsonResponse(_tarot_deck_payload(deck), status=201)


@require_http_methods(["GET", "PUT", "DELETE"])
def api_tarot_deck_detail(request, pk):
    try:
        deck = _tarot_visible_deck(pk, request.user)
    except TarotDeck.DoesNotExist:
        return JsonResponse({"error": "Deck not found"}, status=404)

    if request.method == "GET":
        return JsonResponse(_tarot_deck_payload(deck))

    if deck.is_system or deck.user_id != request.user.id:
        return JsonResponse({"error": "This deck cannot be edited"}, status=403)

    if request.method == "DELETE":
        deck.delete()
        return JsonResponse({"ok": True})

    try:
        data = _tarot_request_data(request)
    except ValueError as exc:
        return JsonResponse({"error": str(exc)}, status=400)

    cover_error = _tarot_image_error(request.FILES.get("coverImageFile"))
    if cover_error:
        return JsonResponse({"error": cover_error}, status=400)

    deck.name = str(data.get("name", deck.name)).strip() or deck.name
    deck.description = str(data.get("description", deck.description))
    if "coverImage" in data or "cover_image" in data:
        deck.cover_image_url = str(data.get("coverImage", data.get("cover_image", deck.cover_image_url)) or "")
        if deck.cover_image_url:
            deck.cover_image = ""
    deck_type = data.get("deckType") or data.get("deck_type") or deck.deck_type
    if deck_type not in {TarotDeck.DECK_TYPE_TAROT, TarotDeck.DECK_TYPE_ORACLE}:
        return JsonResponse({"error": "deckType must be tarot or oracle"}, status=400)
    deck.deck_type = deck_type
    deck.is_public = _coerce_bool(data.get("isPublic", data.get("is_public")), deck.is_public)
    deck.allow_reversed = _coerce_bool(data.get("allowReversed", data.get("allow_reversed")), deck.allow_reversed)
    if request.FILES.get("coverImageFile"):
        deck.cover_image = request.FILES["coverImageFile"]
        deck.cover_image_url = ""
    deck.save()
    return JsonResponse(_tarot_deck_payload(deck))


@require_http_methods(["GET"])
def api_tarot_deck_cards(request, pk):
    try:
        deck = _tarot_visible_deck(pk, request.user)
    except TarotDeck.DoesNotExist:
        return JsonResponse({"error": "Deck not found"}, status=404)
    cards = deck.cards.all()
    return JsonResponse(
        {
            "deck": _tarot_deck_payload(deck),
            "cards": [_tarot_card_payload(card) for card in cards],
        }
    )


@require_http_methods(["POST"])
def api_tarot_card_create(request):
    auth_error = _tarot_auth_error(request)
    if auth_error:
        return auth_error
    try:
        data = _tarot_request_data(request)
        deck_id = data.get("deckId") or data.get("deck_id")
        deck = _tarot_editable_deck(deck_id, request.user)
    except (ValueError, TarotDeck.DoesNotExist, PermissionDenied) as exc:
        return JsonResponse({"error": str(exc) or "Deck not found"}, status=400)

    image_error = _tarot_image_error(request.FILES.get("imageFile"))
    if image_error:
        return JsonResponse({"error": image_error}, status=400)

    card, error = _tarot_card_from_payload(data, deck, request.user)
    if error:
        return JsonResponse({"error": error}, status=400)
    if request.FILES.get("imageFile"):
        card.image = request.FILES["imageFile"]
        card.image_url = ""
    card.save()
    return JsonResponse(_tarot_card_payload(card), status=201)


def _tarot_card_from_payload(data, deck, user, card=None):
    name = str(data.get("name", getattr(card, "name", ""))).strip()
    arcana = data.get("arcana", getattr(card, "arcana", TarotCard.ARCANA_ORACLE))
    suit = data.get("suit", getattr(card, "suit", TarotCard.SUIT_NONE)) or TarotCard.SUIT_NONE

    if not name:
        return None, "name is required"
    if arcana not in {TarotCard.ARCANA_MAJOR, TarotCard.ARCANA_MINOR, TarotCard.ARCANA_ORACLE}:
        return None, "arcana is invalid"
    if arcana == TarotCard.ARCANA_MINOR and suit not in {
        TarotCard.SUIT_CUPS,
        TarotCard.SUIT_PENTACLES,
        TarotCard.SUIT_SWORDS,
        TarotCard.SUIT_WANDS,
    }:
        return None, "minor arcana cards require a suit"
    if arcana != TarotCard.ARCANA_MINOR:
        suit = TarotCard.SUIT_NONE

    number = data.get("number", getattr(card, "number", None))
    if number in {"", None}:
        number = None
    order = data.get("order", getattr(card, "order", 0))

    card = card or TarotCard(deck=deck, user=user)
    card.name = name
    card.arcana = arcana
    card.suit = suit
    card.number = number
    keywords = data.get("keywords", getattr(card, "keywords", [])) or []
    if isinstance(keywords, str):
        try:
            parsed_keywords = json.loads(keywords)
            keywords = parsed_keywords if isinstance(parsed_keywords, list) else keywords
        except json.JSONDecodeError:
            keywords = [keyword.strip() for keyword in keywords.split(",") if keyword.strip()]
    card.keywords = keywords
    card.upright_meaning = str(data.get("uprightMeaning", data.get("upright_meaning", getattr(card, "upright_meaning", "")))).strip()
    card.reversed_meaning = str(data.get("reversedMeaning", data.get("reversed_meaning", getattr(card, "reversed_meaning", ""))))
    card.image_url = str(data.get("image", data.get("imageUrl", getattr(card, "image_url", ""))) or "")
    card.order = int(order or 0)

    if not card.upright_meaning:
        return None, "uprightMeaning is required"
    return card, None


@require_http_methods(["GET", "POST", "PUT", "DELETE"])
def api_tarot_card_detail(request, pk):
    try:
        card = TarotCard.objects.select_related("deck").get(pk=pk)
    except TarotCard.DoesNotExist:
        return JsonResponse({"error": "Card not found"}, status=404)

    visible = card.deck.is_system or (request.user.is_authenticated and card.deck.user_id == request.user.id)
    if not visible:
        return JsonResponse({"error": "Card not found"}, status=404)

    if request.method == "GET":
        return JsonResponse(_tarot_card_payload(card))

    if card.deck.is_system or card.deck.user_id != request.user.id:
        return JsonResponse({"error": "This card cannot be edited"}, status=403)

    if request.method == "DELETE":
        card.delete()
        return JsonResponse({"ok": True})

    try:
        data = _tarot_request_data(request)
    except ValueError as exc:
        return JsonResponse({"error": str(exc)}, status=400)

    image_error = _tarot_image_error(request.FILES.get("imageFile"))
    if image_error:
        return JsonResponse({"error": image_error}, status=400)

    card, error = _tarot_card_from_payload(data, card.deck, request.user, card=card)
    if error:
        return JsonResponse({"error": error}, status=400)
    if request.FILES.get("imageFile"):
        card.image = request.FILES["imageFile"]
        card.image_url = ""
    card.save()
    return JsonResponse(_tarot_card_payload(card))


@require_http_methods(["POST"])
def api_tarot_reading_draw(request):
    auth_error = _tarot_auth_error(request)
    if auth_error:
        return auth_error
    try:
        data = _json_body(request)
        deck_id = data.get("deckId") or data.get("deck_id")
        deck = _tarot_visible_deck(deck_id, request.user) if deck_id else _tarot_visible_decks(request.user).filter(is_system=True).first()
        if deck is None:
            return JsonResponse({"error": "No tarot deck found. Run seed_default_tarot."}, status=400)
        spread_type = data.get("spreadType") or data.get("spread_type") or TarotReading.SPREAD_ONE_CARD
        card_count = _tarot_spread_count(spread_type)
    except (ValueError, TarotDeck.DoesNotExist) as exc:
        return JsonResponse({"error": str(exc) or "Deck not found"}, status=400)

    cards = list(deck.cards.all())
    if len(cards) < card_count:
        return JsonResponse({"error": "Not enough cards in this deck"}, status=400)

    limit = get_tarot_reading_limit(request.user)
    current_count = TarotReading.objects.filter(user=request.user).count()
    if current_count >= limit and not TarotReading.objects.filter(user=request.user, is_pinned=False).exists():
        return JsonResponse({"error": "Pinned readings are at the limit. Unpin one before saving another."}, status=400)

    allow_reversed = bool(data.get("allowReversed", data.get("allow_reversed", deck.allow_reversed))) and deck.allow_reversed
    selected_cards = random.sample(cards, card_count)
    labels = TAROT_SPREAD_LABELS[spread_type]

    try:
        with transaction.atomic():
            reading = TarotReading.objects.create(
                user=request.user,
                deck=deck,
                spread_type=spread_type,
                question=str(data.get("question", "")),
                ai_interpretation="",
                memo=str(data.get("memo", "")),
            )
            for index, card in enumerate(selected_cards):
                is_reversed = allow_reversed and random.choice([False, True])
                meaning = card.reversed_meaning if is_reversed and card.reversed_meaning else card.upright_meaning
                TarotReadingCard.objects.create(
                    reading=reading,
                    card=card,
                    position=index + 1,
                    position_label=labels[index],
                    is_reversed=is_reversed,
                    card_name_snapshot=card.name,
                    meaning_snapshot=meaning,
                    image_snapshot=_card_image_value(card),
                )
            _trim_tarot_readings(request.user)
    except ValueError as exc:
        return JsonResponse({"error": str(exc)}, status=400)

    reading = TarotReading.objects.prefetch_related("cards").select_related("deck", "user").get(pk=reading.pk)
    if data.get("includeAi") or data.get("include_ai"):
        reading.ai_interpretation = generate_ai_tarot_interpretation(build_tarot_ai_payload(reading))
        reading.save(update_fields=["ai_interpretation", "updated_at"])
    return JsonResponse(_tarot_reading_payload(reading, limit=limit), status=201)


@require_http_methods(["GET"])
def api_tarot_readings(request):
    auth_error = _tarot_auth_error(request)
    if auth_error:
        return auth_error
    readings = (
        TarotReading.objects.filter(user=request.user)
        .select_related("deck", "user")
        .prefetch_related("cards")[:100]
    )
    limit = get_tarot_reading_limit(request.user)
    return JsonResponse(
        {
            "limit": limit,
            "remaining": max(limit - TarotReading.objects.filter(user=request.user).count(), 0),
            "readings": [_tarot_reading_payload(reading, limit=limit) for reading in readings],
        }
    )


@require_http_methods(["GET", "PATCH", "DELETE"])
def api_tarot_reading_detail(request, pk):
    auth_error = _tarot_auth_error(request)
    if auth_error:
        return auth_error
    try:
        reading = (
            TarotReading.objects.filter(user=request.user)
            .select_related("deck", "user")
            .prefetch_related("cards")
            .get(pk=pk)
        )
    except TarotReading.DoesNotExist:
        return JsonResponse({"error": "Reading not found"}, status=404)

    if request.method == "GET":
        return JsonResponse(_tarot_reading_payload(reading))

    if request.method == "DELETE":
        reading.delete()
        return JsonResponse({"ok": True})

    try:
        data = _json_body(request)
    except ValueError as exc:
        return JsonResponse({"error": str(exc)}, status=400)
    if "isPinned" in data or "is_pinned" in data:
        reading.is_pinned = bool(data.get("isPinned", data.get("is_pinned")))
    if "memo" in data:
        reading.memo = str(data.get("memo", ""))
    reading.save(update_fields=["is_pinned", "memo", "updated_at"])
    _trim_tarot_readings(request.user)
    reading = TarotReading.objects.select_related("deck", "user").prefetch_related("cards").get(pk=reading.pk)
    return JsonResponse(_tarot_reading_payload(reading))


@require_http_methods(["GET", "POST"])
def api_tarot_reading_consult(request, pk):
    auth_error = _tarot_auth_error(request)
    if auth_error:
        return auth_error

    try:
        reading = (
            TarotReading.objects.filter(user=request.user)
            .select_related("deck", "user")
            .prefetch_related("cards")
            .get(pk=pk)
        )
    except TarotReading.DoesNotExist:
        return JsonResponse({"error": "Reading not found"}, status=404)

    session = (
        TarotConsultSession.objects.filter(user=request.user, reading=reading)
        .prefetch_related("messages")
        .first()
    )
    if request.method == "GET":
        return JsonResponse(_tarot_consult_session_payload(session, reading))

    try:
        data = _json_body(request)
    except ValueError as exc:
        return JsonResponse({"error": str(exc)}, status=400)

    message = str(data.get("message", "")).strip()
    if not message:
        return JsonResponse({"error": "message is required"}, status=400)

    session, _ = TarotConsultSession.objects.get_or_create(
        user=request.user,
        reading=reading,
        defaults={"title": _tarot_consult_title(reading)},
    )
    history = [
        {"role": item.role, "content": item.content}
        for item in session.messages.order_by("-created_at", "-id")[:6]
    ]
    history.reverse()
    diary_references = []
    diary_index = None
    try:
        diary_index = ensure_user_diary_index(request.user)
        diary_references = search_diary_chunks(request.user, message, limit=4)
    except Exception:
        diary_references = []
        diary_index = None

    try:
        reply = generate_ai_tarot_consult_reply(
            reading,
            message,
            history=history,
            diary_context=diary_references,
        )
    except RuntimeError:
        return JsonResponse({"error": "Tarot consult is temporarily unavailable."}, status=503)

    with transaction.atomic():
        TarotConsultMessage.objects.create(
            session=session,
            role=TarotConsultMessage.ROLE_USER,
            content=message,
        )
        TarotConsultMessage.objects.create(
            session=session,
            role=TarotConsultMessage.ROLE_ASSISTANT,
            content=reply,
        )

    session = (
        TarotConsultSession.objects.filter(pk=session.pk)
        .prefetch_related("messages")
        .get()
    )
    payload = _tarot_consult_session_payload(session, reading)
    payload["reply"] = reply
    payload["diaryReferences"] = diary_references
    payload["diary_references"] = diary_references
    payload["diaryIndex"] = diary_index
    payload["diary_index"] = diary_index
    return JsonResponse(payload)
