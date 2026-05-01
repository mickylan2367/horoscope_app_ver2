from __future__ import annotations
# location.py
import requests
import numpy as np
from skyfield.api import Star
from skyfield.api import wgs84
from skyfield.api import Star, wgs84, Angle
# horoscopeAI/utils/helio.py
from dataclasses import dataclass
from typing import Dict
import math
import pytz
from skyfield.api import load
import hashlib


def make_cache_key(birth_date, birth_time, lat, lon):
    raw = f"{birth_date}_{birth_time}_{lat}_{lon}"
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()


SIGNS = ["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"]

@dataclass
class LonResult:
    lon_deg: float
    sign: str
    deg_in_sign: int
    minute: int

def _normalize_deg(x: float) -> float:
    x = x % 360.0
    return x if x >= 0 else x + 360.0

def _to_sign(d: float) -> LonResult:
    d = _normalize_deg(d)
    sign_idx = int(d // 30)
    deg_in_sign = d - 30 * sign_idx
    deg_int = int(deg_in_sign)
    minute = int(round((deg_in_sign - deg_int) * 60))
    # 59.6分→60分みたいな繰り上がり対策
    if minute == 60:
        minute = 0
        deg_int += 1
        if deg_int == 30:
            deg_int = 0
            sign_idx = (sign_idx + 1) % 12
    return LonResult(d, SIGNS[sign_idx], deg_int, minute)

def heliocentric_longitudes(
    birth_dt_jst,  # naiveでもawareでもOK（JST想定）
    eph_path: str = "de421.bsp",
) -> Dict[str, LonResult]:
    """
    Returns heliocentric ecliptic longitudes for planets.
    Note: Heliocentric charts usually don't include ASC/MC/houses.
    """

    # 1) JST -> UTC (SkyfieldはUTCで扱うのが安全)
    jst = pytz.timezone("Asia/Tokyo")
    if birth_dt_jst.tzinfo is None:
        birth_dt_jst = jst.localize(birth_dt_jst)
    birth_dt_utc = birth_dt_jst.astimezone(pytz.utc)

    # 2) Skyfield Time
    ts = load.timescale()
    t = ts.from_datetime(birth_dt_utc)

    # 3) Ephemeris
    eph = load(eph_path)

    sun = eph["sun"]
    planets = {
        "☿": eph["mercury"],
        "♀": eph["venus"],
        "♁": eph["earth"],
        "♂": eph["mars"],
        "♃": eph["jupiter barycenter"],
        "♄": eph["saturn barycenter"],
        "♅": eph["uranus barycenter"],
        "♆": eph["neptune barycenter"],
        "♇": eph["pluto barycenter"],
    }

    # 4) 太陽中心： planet - sun のベクトルを黄道座標へ
    # Skyfieldの .at(t).position.au はICRF直交座標（AU）
    # ここでは黄道面への変換を自前でやる（簡易：地球の黄道傾斜角で回転）
    # ※精密にはSkyfieldのフレームを使う方法もあるけど、まず動く最小で。
    eps = math.radians(23.4392911)  # obliquity (approx)

    def ecl_lon_from_xyz(x, y, z) -> float:
        # 赤道座標 -> 黄道座標（xは同じ、y/zを回転）
        ye = y * math.cos(eps) + z * math.sin(eps)
        xe = x
        lon = math.degrees(math.atan2(ye, xe))
        return _normalize_deg(lon)

    out: Dict[str, LonResult] = {}
    sun_pos = sun.at(t).position.au

    for name, body in planets.items():
        p = body.at(t).position.au
        x = p[0] - sun_pos[0]
        y = p[1] - sun_pos[1]
        z = p[2] - sun_pos[2]
        lon = ecl_lon_from_xyz(x, y, z)

        # 流派によっては「Sun=0°」にしたいので、太陽黄経分を引く運用もある。
        # まずは“真のヘリオ黄経”を返す。
        out[name] = _to_sign(lon)

    return out

def get_lat_lon(place_name):
    url = "https://nominatim.openstreetmap.org/search"
    params = {
        "q": place_name,
        "format": "json",
        "limit": 1
    }
    headers = {
        "User-Agent": "my-geocoder-script"
    }

    response = requests.get(url, params=params, headers=headers)

    if response.status_code != 200:
        print("エラー：APIリクエストに失敗しました。")
        return None, None

    data = response.json()

    if data:
        lat = float(data[0]["lat"])
        lon = float(data[0]["lon"])
        return lat, lon
    else:
        print("地名が見つかりませんでした。")
        return None, None


def calculate_planet_positions(t, location, planets421, planets440, ascendant):
    observer421 = planets421['earth'] + location
    observer440 = planets440['earth'] + location

    def zodiac_sign(degree):
        index = int(degree // 30)
        return SIGNS[index], degree % 360
    
    def calc_age(min_age, max_age, asc_deg, lon_deg):
        ascn_deg = int(asc_deg%30)+1
        zodiac_deg = int(lon_deg%30)+1
        delta = zodiac_deg - ascn_deg
        print(delta)

        if (delta < 0) & (np.abs(delta) > (max_age-min_age)):
            print('yes', np.abs(delta), max_age-min_age)
            return min_age + zodiac_deg
        elif delta < 0:
            print('yes-2')
            return max_age + delta
        if delta > (max_age-min_age):
            return max_age - (30-zodiac_deg)
        return min_age + delta

    astro_sources = [
        ('☽', 0, 7, planets421['moon'], observer421),
        ('☿', 8, 15, planets421['mercury'], observer421),
        ('♀', 16, 25, planets421['venus'], observer421),
        ('☉', 26, 35, planets421['sun'], observer421),
        ('♂', 36, 45, planets421['mars'], observer421),
        ('♃', 46, 55, planets440['JUPITER BARYCENTER'], observer440),
        ('♄', 56, 65, planets440['SATURN BARYCENTER'], observer440),
        ('♅', 66, 75, planets440['URANUS BARYCENTER'], observer440),
        ('♆', 76, 85, planets440['NEPTUNE BARYCENTER'], observer440),
        ('♇', 0, 0, planets440['PLUTO BARYCENTER'], observer440),
    ]

    rows = []
    for name, min_age, max_age, body, observer in astro_sources:
        try:
            lon_deg = observer.at(t).observe(body).apparent().ecliptic_latlon()[1].degrees
            sign, total_deg = zodiac_sign(lon_deg)
            # print(, ascendant, lon_deg)
            age = calc_age(
                min_age=min_age,
                max_age=max_age,
                asc_deg=ascendant,
                lon_deg=lon_deg
            )
            rows.append([name, sign, int(lon_deg % 30), int(total_deg), age])
        except Exception as e:
            print(f"{name}の位置計算に失敗しました: {e}")

    return rows, zodiac_sign



def calculate_ascendant_skyfield(t, location, planets421, step_deg=0.5):
    """
    Skyfield だけでアセンダントを求める簡易版。
    t         : skyfield Time
    location  : Topos（ビュー側で作ったもの）
    planets421: load('de421.bsp') で読み込んだ ephemeris
    """
    # 観測者（地球 + 観測地点）
    earth = planets421['earth']
    observer = earth + location

    # 黄道傾斜角
    eps_deg = 23.439291
    eps = np.radians(eps_deg)

    # 0〜360度を step_deg ごとにスキャン
    lambdas = np.arange(0.0, 360.0, step_deg)

    best_lambda = None
    best_score = None

    for lam in lambdas:
        lam_rad = np.radians(lam)

        # 黄緯β=0 の黄道→赤道変換
        sin_delta = np.sin(eps) * np.sin(lam_rad)
        delta = np.arcsin(sin_delta)

        y = np.sin(lam_rad) * np.cos(eps)
        x = np.cos(lam_rad)
        alpha = np.arctan2(y, x)  # RA [rad]

        # RA/Dec を Angle オブジェクトに変換
        ra_angle = Angle(radians=alpha)
        dec_angle = Angle(radians=delta)

        star = Star(ra=ra_angle, dec=dec_angle)

        # 観測者から見た高度・方位角
        diff = observer.at(t).observe(star).apparent()
        alt, az, dist = diff.altaz()

        alt_deg = alt.degrees
        az_deg = az.degrees

        # 東の地平線（高度0°, 方位角90°）に近いほどスコアが良い
        score = abs(alt_deg) + abs(az_deg - 90.0) * 0.1

        if best_score is None or score < best_score:
            best_score = score
            best_lambda = lam

    # 見つかった黄経がアセンダント
    ascendant = best_lambda % 360.0
    return ascendant
