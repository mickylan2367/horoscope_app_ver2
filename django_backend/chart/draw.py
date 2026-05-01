# chart/draw.py
import math
import os

import matplotlib
matplotlib.use('Agg')  # サーバー上でGUIなし描画
import matplotlib.pyplot as plt
import numpy as np
from itertools import combinations


ZODIAC_SIGNS = ["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"]

PLANET_NAME_MAP = {
    "☉": "☉", "☽": "☽", "☿": "☿", "♀": "♀", "♂": "♂", "♃": "♃",
    "♄": "♄", "♅": "♅", "♆": "♆", "♇": "♇"}

HARD_ASPECTS = {"Conjunction", "Square", "Opposition", "Sesquisquare"}
SOFT_ASPECTS = {"Trine", "Sextile"}
ASPECTS = [
    ("Conjunction", 0,   2),
    ("Opposition",  180, 2),
    ("Trine",       120, 2),
    ("Square",      90,  2),
    ("Sextile",     60,  2),
    ("Quincunx",    150, 2),
    ("Semisquare",  45,  2),
    ("Sesquisquare",135, 2),
]

def angle_diff(a, b):
    """a,b: 0..360 の黄経。差を 0..180 に正規化"""
    d = abs((a - b) % 360)
    return min(d, 360 - d)


def aspect_color(aspect_name):
    if aspect_name in HARD_ASPECTS:
        return "red"
    elif aspect_name in SOFT_ASPECTS:
        return "blue"
    else:
        return "gray"


def detect_aspects(planet_rows, aspects=ASPECTS):
    """
    planet_rows: [ ["太陽", "牡羊座", 10, total_deg], ... ] など
      - 4番目が total_deg（0..360）前提
    return: list of dict
    """
    planets = [(row[0], float(row[3])) for row in planet_rows]

    results = []
    for (p1, d1), (p2, d2) in combinations(planets, 2):
        diff = angle_diff(d1, d2)

        best = None
        for name, target, orb in aspects:
            delta = abs(diff - target)
            if delta <= orb:
                cand = (delta, name, target, orb)
                if (best is None) or (cand[0] < best[0]):
                    best = cand

        if best:
            delta, name, target, orb = best
            results.append({
                "p1": p1, "p2": p2,
                "diff": diff,
                "aspect": name,
                "target": target,
                "orb": delta,      # どれだけズレてるか
                "max_orb": orb
            })

    # 見やすいようにオーブが小さい順
    results.sort(key=lambda x: x["orb"])
    return results

def plot_aspect_lines(ax, planet_rows, aspects_found, r=0.8, lw=0.8):
    # 惑星名→角度（ラジアン）辞書
    deg_map = {row[0]: float(row[3]) for row in planet_rows}

    for a in aspects_found:
        th1 = math.radians(deg_map[a["p1"]])
        th2 = math.radians(deg_map[a["p2"]])
        color = aspect_color(a["aspect"])

        # 同じ半径rで2点を結ぶ（円の内側に弦が出る）
        ax.plot(
            [th1, th2],
            [r, r],
            linewidth=lw,
            color=color
        )


def draw_horoscope(planet_rows, filepath, asc, aspects_found):
    fig = plt.figure(figsize=(6, 6))
    fig.patch.set_alpha(0)
    ax = plt.subplot(111, polar=True)
    ax.set_facecolor('none')
    ax.set_theta_direction(1)  # 時計回り
    ax.set_theta_offset(math.radians((180 - asc)%360))

    # 半径方向の目盛りは消す
    ax.set_yticklabels([])
    ax.set_yticks([])

    # イコールハウス（ASCから30°ごと）
    for i in range(12):
        deg = (asc + i * 30) % 360          # ←ここがポイント：ASC基準
        theta = math.radians(deg)
        ax.plot([theta, theta], [0, 0.8], linewidth=0.8)  # ハウス線
    xticks = [
        math.radians((asc + i * 30) % 360)
        for i in range(12)
    ]
    ax.set_xticks(xticks)
    DRAW_ZODIAC_SIGNS = []
    for i in range(int(asc//30), int(asc//30+12)):
        DRAW_ZODIAC_SIGNS.append(ZODIAC_SIGNS[i%12])
    print(DRAW_ZODIAC_SIGNS)
    ax.set_xticklabels(DRAW_ZODIAC_SIGNS, fontsize=15)
    
    theta = np.linspace(0, 2 * math.pi, 360)
    r = np.ones_like(theta) * 0.8
    ax.plot(theta, r, linewidth=0.6, color="grey")
    plot_aspect_lines(ax, planet_rows, aspects_found, r=0.8, lw=0.6)

    # 惑星などを配置
    for row in planet_rows:
        name, sign, deg_in_sign, total_deg = row[:4]

        theta = math.radians(total_deg)
        r = 0.8  # 惑星の半径位置

        # 点を打つ
        ax.scatter(theta, r, s=20)

        # ラベル（日本語名）を少し外側に
        ax.text(theta, r + 0.11, PLANET_NAME_MAP[name],
                ha='center', va='center', fontsize=25)

    # すっきりさせる
    ax.set_rmax(1.1)

    # 画像保存
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    plt.savefig(filepath, bbox_inches='tight', dpi=150, transparent=True)
    plt.close(fig)
