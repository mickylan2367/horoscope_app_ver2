

# horoscopeAI/utils/helio.py
from __future__ import annotations
from dataclasses import dataclass
from typing import Dict
import math
import pytz

from skyfield.api import load

SIGNS = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo",
         "Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"]

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
        "Mercury": eph["mercury"],
        "Venus": eph["venus"],
        "Earth": eph["earth"],
        "Mars": eph["mars"],
        "Jupiter": eph["jupiter barycenter"],
        "Saturn": eph["saturn barycenter"],
        "Uranus": eph["uranus barycenter"],
        "Neptune": eph["neptune barycenter"],
        "Pluto": eph["pluto barycenter"],
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
