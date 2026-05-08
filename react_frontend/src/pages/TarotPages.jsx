import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, Check, Edit3, Image as ImageIcon, Plus, Search, Sparkles, Star, Trash2 } from "lucide-react";
import Layout from "../components/Layout";
import { apiFetch } from "../api";

const ARCANA_OPTIONS = ["major", "minor", "oracle"];
const SUIT_OPTIONS = ["none", "cups", "pentacles", "swords", "wands"];

function TarotShell({ children, user, wide = false }) {
  return (
    <Layout user={user} wide={wide} headerVariant="cosmic" backgroundVariant="hero">
      {children}
    </Layout>
  );
}

function Panel({ children, className = "" }) {
  return (
    <section className={`rounded-2xl border border-white/10 bg-[#171226]/72 p-5 text-[#f7f3ff] shadow-[0_18px_70px_rgba(0,0,0,0.26)] backdrop-blur-xl ${className}`}>
      {children}
    </section>
  );
}

function ErrorNotice({ message }) {
  if (!message) return null;
  return <p className="rounded-xl border border-rose-300/20 bg-rose-300/10 px-4 py-3 text-sm text-rose-100">{message}</p>;
}

function LoadingNotice() {
  return <p className="rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-slate-200">Loading...</p>;
}

function cardImage(card) {
  return card.image || "";
}

const MAJOR_ARCANA_CORRESPONDENCES = {
  "the fool": { design: "uranus", tone: "from-[#24304d] via-[#1e3150] to-[#101322]" },
  "the magician": { design: "mercury", tone: "from-[#263456] via-[#2a2351] to-[#101322]" },
  "the high priestess": { design: "moon", tone: "from-[#1d2f52] via-[#282458] to-[#101322]" },
  "the empress": { design: "venus", tone: "from-[#40233f] via-[#2d3150] to-[#101322]" },
  "the emperor": { design: "aries", tone: "from-[#4a2432] via-[#35234d] to-[#101322]" },
  "the hierophant": { design: "taurus", tone: "from-[#263d36] via-[#302d4d] to-[#101322]" },
  "the lovers": { design: "gemini", tone: "from-[#2a3154] via-[#3b2752] to-[#101322]" },
  "the chariot": { design: "cancer", tone: "from-[#1e3954] via-[#2b2853] to-[#101322]" },
  strength: { design: "leo", tone: "from-[#4a2e29] via-[#3b2850] to-[#101322]" },
  "the hermit": { design: "virgo", tone: "from-[#293a3a] via-[#2b2b50] to-[#101322]" },
  "wheel of fortune": { design: "jupiter", tone: "from-[#2c2f5c] via-[#3b2a4f] to-[#101322]" },
  justice: { design: "libra", tone: "from-[#293450] via-[#42284c] to-[#101322]" },
  "the hanged man": { design: "neptune", tone: "from-[#1d3a4d] via-[#2b2d53] to-[#101322]" },
  death: { design: "scorpio", tone: "from-[#31263f] via-[#1d3548] to-[#101322]" },
  temperance: { design: "sagittarius", tone: "from-[#443035] via-[#2d3155] to-[#101322]" },
  "the devil": { design: "capricorn", tone: "from-[#342d3c] via-[#26384a] to-[#101322]" },
  "the tower": { design: "mars", tone: "from-[#4b2530] via-[#322348] to-[#101322]" },
  "the star": { design: "aquarius", tone: "from-[#1f3f55] via-[#2d2a55] to-[#101322]" },
  "the moon": { design: "pisces", tone: "from-[#22345b] via-[#30275b] to-[#101322]" },
  "the sun": { design: "sun", tone: "from-[#4b3420] via-[#403152] to-[#101322]" },
  judgement: { design: "pluto", tone: "from-[#4a2934] via-[#3b2a4f] to-[#101322]" },
  "the world": { design: "saturn", tone: "from-[#30364a] via-[#2a294d] to-[#101322]" },
};

const TAROT_ART_SYMBOLS = ["✦", "☉", "☾", "♃", "♀", "♄", "☿", "♆"];
const TAROT_ART_FRAMES = [
  "from-[#2d1b42] via-[#1b2342] to-[#101322]",
  "from-[#321d36] via-[#2a2347] to-[#111827]",
  "from-[#1f2d46] via-[#2a1d42] to-[#141224]",
  "from-[#3a2635] via-[#202f4c] to-[#111322]",
];
const MINOR_SUIT_FRAMES = {
  cups: "from-[#1d3556] via-[#2c2552] to-[#101322]",
  pentacles: "from-[#243f36] via-[#342b49] to-[#101322]",
  swords: "from-[#263650] via-[#202a4c] to-[#101322]",
  wands: "from-[#4a2a2d] via-[#3a284d] to-[#101322]",
};

function tarotArtIndex(card) {
  const name = card.cardName || card.name || "Tarot";
  return [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function tarotArtSymbol(card) {
  const correspondence = majorArcanaCorrespondence(card);
  if (correspondence) return "";
  return TAROT_ART_SYMBOLS[tarotArtIndex(card) % TAROT_ART_SYMBOLS.length];
}

function majorArcanaCorrespondence(card) {
  const name = `${card.cardName || card.name || ""}`.toLowerCase().replace(/^the\s+/, "the ");
  return MAJOR_ARCANA_CORRESPONDENCES[name] ?? null;
}

function minorArcanaSuit(card) {
  const suit = `${card.suit || ""}`.toLowerCase();
  if (["cups", "pentacles", "swords", "wands"].includes(suit)) return suit;
  const name = `${card.cardName || card.name || ""}`.toLowerCase();
  return ["cups", "pentacles", "swords", "wands"].find((item) => name.includes(item)) ?? "";
}

function minorArcanaRank(card) {
  const number = Number(card.number);
  if (Number.isFinite(number) && number > 0) return number;
  const name = `${card.cardName || card.name || ""}`.toLowerCase();
  const court = ["page", "knight", "queen", "king"].find((item) => name.includes(item));
  if (court === "page") return 11;
  if (court === "knight") return 12;
  if (court === "queen") return 13;
  if (court === "king") return 14;
  const words = { ace: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10 };
  return Object.entries(words).find(([word]) => name.includes(word))?.[1] ?? 0;
}

const MINOR_PIP_POSITIONS = {
  1: [[50, 50]],
  2: [[50, 32], [50, 68]],
  3: [[50, 24], [34, 66], [66, 66]],
  4: [[34, 30], [66, 30], [34, 70], [66, 70]],
  5: [[34, 28], [66, 28], [50, 50], [34, 72], [66, 72]],
  6: [[34, 24], [66, 24], [34, 50], [66, 50], [34, 76], [66, 76]],
  7: [[34, 22], [66, 22], [50, 38], [34, 56], [66, 56], [34, 78], [66, 78]],
  8: [[32, 20], [68, 20], [32, 40], [68, 40], [32, 60], [68, 60], [32, 80], [68, 80]],
  9: [[32, 20], [68, 20], [32, 38], [68, 38], [50, 50], [32, 62], [68, 62], [32, 80], [68, 80]],
  10: [[32, 18], [68, 18], [32, 34], [68, 34], [32, 50], [68, 50], [32, 66], [68, 66], [32, 82], [68, 82]],
};

function ElementMotif({ suit, variant = "pip", className = "", style }) {
  const isCourt = variant !== "pip";
  if (suit === "cups") {
    return (
      <span className={`relative block ${className}`} style={style}>
        <span className={`absolute left-1/2 top-[18%] -translate-x-1/2 rotate-45 rounded-[55%_5%_55%_55%] bg-cyan-100/76 shadow-[0_0_16px_rgba(126,214,255,0.34)] ${isCourt ? "h-[54%] w-[54%]" : "h-[62%] w-[62%]"}`} />
        <span className="absolute bottom-[14%] left-[16%] h-[18%] w-[68%] rounded-full border border-cyan-100/28 bg-cyan-200/10" />
        <span className="absolute bottom-[20%] left-[28%] h-[8%] w-[44%] rounded-full bg-white/20 blur-[1px]" />
      </span>
    );
  }
  if (suit === "pentacles") {
    return (
      <span className={`relative block ${className}`} style={style}>
        <span className="absolute left-1/2 top-1/2 h-[64%] w-[64%] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[18%] bg-emerald-200/56 shadow-[0_0_18px_rgba(165,231,177,0.26)]" />
        <span className="absolute left-[28%] top-[22%] h-[28%] w-[28%] rounded-full bg-[#fff1c7]/54" />
        <span className="absolute bottom-[16%] left-[18%] h-[26%] w-[64%] rounded-full bg-emerald-300/16" />
        <span className="absolute bottom-[30%] left-1/2 h-[26%] w-px -translate-x-1/2 bg-emerald-100/42" />
      </span>
    );
  }
  if (suit === "swords") {
    return (
      <span className={`relative block ${className}`} style={style}>
        <span className="absolute left-[8%] top-[46%] h-[8%] w-[84%] rotate-[-18deg] rounded-full bg-sky-100/54 shadow-[0_0_16px_rgba(186,220,255,0.24)]" />
        <span className="absolute left-[18%] top-[24%] h-[5%] w-[54%] rotate-[-18deg] rounded-full bg-white/30" />
        <span className="absolute bottom-[22%] right-[16%] h-[5%] w-[56%] rotate-[-18deg] rounded-full bg-sky-200/24" />
        <span className="absolute right-[10%] top-[32%] h-[28%] w-[28%] rounded-full border border-sky-100/20" />
      </span>
    );
  }
  return (
    <span className={`relative block ${className}`} style={style}>
      <span className="absolute left-1/2 top-[18%] h-[60%] w-[28%] -translate-x-1/2 rounded-full bg-amber-200/72 shadow-[0_0_18px_rgba(246,211,124,0.36)]" />
      <span className="absolute left-[30%] top-[8%] h-[42%] w-[40%] rounded-full bg-rose-300/34 blur-[2px]" />
      <span className="absolute bottom-[10%] left-[28%] h-[18%] w-[44%] rounded-full bg-amber-100/28" />
    </span>
  );
}

function MinorArcanaDesign({ card, compact = false }) {
  const suit = minorArcanaSuit(card);
  const rank = minorArcanaRank(card);
  if (!suit) return null;

  const pipSize = compact ? "h-8 w-8" : "h-10 w-10";
  const positions = MINOR_PIP_POSITIONS[Math.min(rank, 10)] ?? MINOR_PIP_POSITIONS[1];
  const isCourt = rank > 10;
  const courtShape = rank === 11 ? "page" : rank === 12 ? "knight" : rank === 13 ? "queen" : rank === 14 ? "king" : "";
  const courtSize = compact ? "h-20 w-20" : "h-28 w-28";

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-[9%] rounded-full border border-white/10 bg-white/5" />
      <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.09),transparent_62%)]" />
      {isCourt ? (
        <>
          <div className="absolute left-1/2 top-[50%] flex h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/14 bg-white/7 shadow-[0_0_32px_rgba(255,255,255,0.08)]">
            <ElementMotif suit={suit} variant={courtShape} className={courtSize} />
          </div>
          {courtShape === "page" ? <span className="absolute left-[34%] top-[18%] h-2 w-[32%] rounded-full bg-white/28" /> : null}
          {courtShape === "knight" ? <span className="absolute left-[22%] top-[18%] h-[28%] w-[56%] rounded-t-full border border-white/30 border-b-0 bg-white/5" /> : null}
          {courtShape === "queen" || courtShape === "king" ? (
            <span className="absolute left-[28%] top-[13%] h-[14%] w-[44%] rounded-t-md border border-white/34 border-b-0 bg-white/8" />
          ) : null}
          {courtShape === "king" ? <span className="absolute left-1/2 top-[7%] h-[18%] w-1 -translate-x-1/2 rounded-full bg-white/34" /> : null}
          <span className="absolute bottom-[13%] left-[22%] h-2 w-[56%] rounded-full bg-gradient-to-r from-transparent via-white/28 to-transparent" />
        </>
      ) : (
        positions.map(([left, top], index) => (
          <ElementMotif
            key={`${suit}-${rank}-${index}`}
            suit={suit}
            className={`absolute ${pipSize} -translate-x-1/2 -translate-y-1/2`}
            style={{ left: `${left}%`, top: `${top}%` }}
          />
        ))
      )}
    </div>
  );
}

function AstrologicalDesign({ type, compact = false }) {
  const sizeClass = compact ? "h-20 w-20" : "h-28 w-28";
  const stroke = "absolute border border-[#fff1c7]/72 shadow-[0_0_18px_rgba(255,241,199,0.22)]";
  const fill = "absolute rounded-full bg-[#fff1c7]/82 shadow-[0_0_18px_rgba(255,241,199,0.34)]";

  if (type === "sun") {
    return (
      <div className={`relative ${sizeClass}`}>
        <span className={`${stroke} inset-0 rounded-full`} />
        <span className={`${stroke} inset-[24%] rounded-full`} />
        <span className={`${fill} left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2`} />
        <span className="absolute left-1/2 top-[-12%] h-[124%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#fff1c7]/58 to-transparent" />
        <span className="absolute left-[-12%] top-1/2 h-px w-[124%] -translate-y-1/2 bg-gradient-to-r from-transparent via-[#fff1c7]/58 to-transparent" />
      </div>
    );
  }

  if (type === "moon") {
    return (
      <div className={`relative ${sizeClass}`}>
        <span className={`${stroke} inset-[6%] rounded-full border-[#d8c4ff]/70`} />
        <span className="absolute inset-[2%] rounded-full bg-[#fff1c7]/82 shadow-[0_0_26px_rgba(255,241,199,0.28)]" />
        <span className="absolute -right-[4%] top-[-2%] h-[104%] w-[82%] rounded-full bg-[#252557]" />
      </div>
    );
  }

  if (type === "air" || type === "fire" || type === "water") {
    const bar = type === "air";
    const direction = type === "water" || type === "air" ? "rotate-180" : "";
    return (
      <div className={`relative ${sizeClass}`}>
        <span
          className={`absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 ${direction} bg-[#fff1c7]/76 shadow-[0_0_18px_rgba(255,241,199,0.22)]`}
          style={{
            clipPath:
              "polygon(50% 0, 100% 86%, 94% 90%, 50% 12%, 6% 90%, 0 86%)",
          }}
        />
        {bar ? <span className="absolute left-[23%] top-[58%] h-px w-[54%] bg-[#fff1c7]/70" /> : null}
      </div>
    );
  }

  if (type === "venus" || type === "mercury") {
    return (
      <div className={`relative ${sizeClass}`}>
        {type === "mercury" ? <span className={`${stroke} left-[24%] top-[-2%] h-[34%] w-[52%] rounded-b-full border-t-0`} /> : null}
        <span className={`${stroke} left-[20%] top-[10%] h-[58%] w-[60%] rounded-full`} />
        <span className="absolute bottom-[8%] left-1/2 h-[30%] w-px -translate-x-1/2 bg-[#fff1c7]/70" />
        <span className="absolute bottom-[20%] left-[32%] h-px w-[36%] bg-[#fff1c7]/70" />
      </div>
    );
  }

  if (type === "mars") {
    return (
      <div className={`relative ${sizeClass}`}>
        <span className={`${stroke} bottom-[10%] left-[8%] h-[56%] w-[56%] rounded-full`} />
        <span className="absolute right-[8%] top-[8%] h-px w-[48%] rotate-[-45deg] bg-[#fff1c7]/70 origin-right" />
        <span className="absolute right-[7%] top-[8%] h-[26%] w-[26%] border-r border-t border-[#fff1c7]/70" />
      </div>
    );
  }

  if (type === "jupiter") {
    return (
      <div className={`relative ${sizeClass}`}>
        <span className={`${stroke} left-[15%] top-[12%] h-[46%] w-[46%] rounded-full border-r-0`} />
        <span className="absolute left-1/2 top-[8%] h-[82%] w-px bg-[#fff1c7]/68" />
        <span className="absolute left-[26%] top-[52%] h-px w-[54%] bg-[#fff1c7]/68" />
      </div>
    );
  }

  if (type === "saturn") {
    return (
      <div className={`relative ${sizeClass}`}>
        <span className="absolute left-1/2 top-[10%] h-[78%] w-px -translate-x-1/2 bg-[#fff1c7]/72 shadow-[0_0_14px_rgba(255,241,199,0.22)]" />
        <span className="absolute left-[28%] top-[28%] h-px w-[44%] bg-[#fff1c7]/72 shadow-[0_0_14px_rgba(255,241,199,0.22)]" />
        <span className={`${stroke} left-[34%] bottom-[10%] h-[38%] w-[42%] rounded-b-full border-t-0`} />
        <span className="absolute bottom-[20%] right-[22%] h-px w-[26%] rotate-[-32deg] bg-[#fff1c7]/62" />
      </div>
    );
  }

  if (type === "uranus") {
    return (
      <div className={`relative ${sizeClass}`}>
        <span className={`${stroke} left-[30%] top-[22%] h-[38%] w-[40%] rounded-full`} />
        <span className="absolute left-1/2 top-[9%] h-[78%] w-px -translate-x-1/2 bg-[#fff1c7]/70" />
        <span className="absolute bottom-[11%] left-[31%] h-px w-[38%] bg-[#fff1c7]/70" />
        <span className="absolute left-[18%] top-[22%] h-[42%] w-px bg-[#fff1c7]/70" />
        <span className="absolute right-[18%] top-[22%] h-[42%] w-px bg-[#fff1c7]/70" />
        <span className="absolute left-[10%] top-[28%] h-px w-[22%] bg-[#fff1c7]/70" />
        <span className="absolute right-[10%] top-[28%] h-px w-[22%] bg-[#fff1c7]/70" />
      </div>
    );
  }

  if (type === "neptune") {
    return (
      <div className={`relative ${sizeClass}`}>
        <span className="absolute left-1/2 top-[12%] h-[78%] w-px -translate-x-1/2 bg-[#fff1c7]/70" />
        <span className="absolute bottom-[16%] left-[31%] h-px w-[38%] bg-[#fff1c7]/70" />
        <span className={`${stroke} left-[18%] top-[10%] h-[42%] w-[64%] rounded-b-full border-t-0`} />
        <span className="absolute left-[16%] top-[15%] h-[18%] w-px rotate-[24deg] bg-[#fff1c7]/70" />
        <span className="absolute right-[16%] top-[15%] h-[18%] w-px rotate-[-24deg] bg-[#fff1c7]/70" />
      </div>
    );
  }

  if (type === "pluto") {
    return (
      <div className={`relative ${sizeClass}`}>
        <span className={`${stroke} left-[31%] top-[4%] h-[38%] w-[38%] rounded-full`} />
        <span className={`${stroke} left-[22%] top-[34%] h-[28%] w-[56%] rounded-b-full border-t-0`} />
        <span className="absolute left-1/2 top-[34%] h-[56%] w-px -translate-x-1/2 bg-[#fff1c7]/70" />
        <span className="absolute bottom-[16%] left-[32%] h-px w-[36%] bg-[#fff1c7]/70" />
      </div>
    );
  }

  const zodiacShapes = {
    aries: ["left-[18%] top-[14%] h-[60%] w-[34%] rounded-t-full border-r-0", "right-[18%] top-[14%] h-[60%] w-[34%] rounded-t-full border-l-0"],
    taurus: ["left-[20%] top-[34%] h-[56%] w-[60%] rounded-full", "left-[22%] top-[6%] h-[36%] w-[24%] rounded-t-full border-b-0", "right-[22%] top-[6%] h-[36%] w-[24%] rounded-t-full border-b-0"],
    gemini: ["left-[28%] top-[12%] h-[76%] w-px", "right-[28%] top-[12%] h-[76%] w-px", "left-[22%] top-[16%] h-px w-[56%]", "left-[22%] bottom-[16%] h-px w-[56%]"],
    cancer: ["left-[14%] top-[22%] h-[36%] w-[36%] rounded-full", "right-[14%] bottom-[22%] h-[36%] w-[36%] rounded-full", "left-[28%] top-[38%] h-px w-[46%] rotate-[-16deg]", "left-[26%] bottom-[38%] h-px w-[46%] rotate-[-16deg]"],
    leo: ["left-[18%] top-[36%] h-[36%] w-[36%] rounded-full", "right-[16%] top-[16%] h-[62%] w-[44%] rounded-full border-l-0"],
    virgo: ["left-[18%] top-[18%] h-[66%] w-[18%] rounded-full border-r-0", "left-[34%] top-[18%] h-[66%] w-[18%] rounded-full border-r-0", "left-[50%] top-[18%] h-[66%] w-[18%] rounded-full border-r-0", "right-[10%] bottom-[18%] h-[34%] w-[34%] rounded-b-full border-t-0"],
    libra: ["left-[18%] bottom-[22%] h-px w-[64%]", "left-[24%] top-[30%] h-[34%] w-[52%] rounded-t-full border-b-0", "left-[22%] bottom-[36%] h-px w-[56%]"],
    scorpio: ["left-[18%] top-[18%] h-[66%] w-[18%] rounded-full border-r-0", "left-[34%] top-[18%] h-[66%] w-[18%] rounded-full border-r-0", "left-[50%] top-[18%] h-[58%] w-[18%] rounded-full border-r-0", "right-[12%] bottom-[18%] h-px w-[26%] rotate-[-28deg]"],
    sagittarius: [
      "left-[18%] bottom-[22%] h-px w-[76%] origin-left rotate-[-45deg]",
      "right-[11%] top-[14%] h-px w-[28%] origin-right rotate-[0deg]",
      "right-[11%] top-[14%] h-px w-[28%] origin-right rotate-[90deg]",
      "left-[30%] top-[48%] h-px w-[34%] origin-center rotate-[45deg]",
      "left-[50%] top-[28%] h-px w-[24%] origin-center rotate-[45deg]",
    ],
    capricorn: ["left-[18%] top-[18%] h-[56%] w-[20%] rounded-full border-r-0", "left-[36%] top-[20%] h-[56%] w-[24%] rounded-full border-r-0", "right-[10%] bottom-[10%] h-[42%] w-[42%] rounded-full"],
    aquarius: ["left-[12%] top-[36%] h-px w-[76%]", "left-[12%] top-[52%] h-px w-[76%]"],
    pisces: ["left-[16%] top-[14%] h-[72%] w-[30%] rounded-l-full border-r-0", "right-[16%] top-[14%] h-[72%] w-[30%] rounded-r-full border-l-0", "left-[22%] top-1/2 h-px w-[56%]"],
  };

  if (zodiacShapes[type]) {
    return (
      <div className={`relative ${sizeClass}`}>
        {zodiacShapes[type].map((shape) => (
          <span key={shape} className={`${stroke} ${shape}`} />
        ))}
      </div>
    );
  }

  return (
    <div className={`relative ${sizeClass}`}>
      <span className={`${stroke} inset-0 rotate-45`} />
      <span className={`${stroke} inset-[24%] rounded-full`} />
    </div>
  );
}

function TarotCardArt({ card, className = "", compact = false }) {
  const image = cardImage(card);
  if (image) {
    return <img src={image} alt={card.cardName || card.name} loading="lazy" decoding="async" className={`h-full w-full object-cover ${className}`} />;
  }

  const artIndex = tarotArtIndex(card);
  const correspondence = majorArcanaCorrespondence(card);
  const minorSuit = minorArcanaSuit(card);
  const isMinor = !correspondence && minorSuit;
  const frame = correspondence?.tone ?? MINOR_SUIT_FRAMES[minorSuit] ?? TAROT_ART_FRAMES[artIndex % TAROT_ART_FRAMES.length];
  const symbol = tarotArtSymbol(card);
  const name = card.cardName || card.name || "Tarot";

  return (
    <div className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br ${frame} ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(255,246,214,0.18),transparent_24%),radial-gradient(circle_at_20%_78%,rgba(244,194,194,0.16),transparent_28%),radial-gradient(circle_at_82%_74%,rgba(126,214,255,0.13),transparent_26%)]" />
      <div className="absolute inset-[8%] rounded-[18px] border border-white/22 shadow-[0_0_28px_rgba(216,196,255,0.16)_inset]" />
      <div className="absolute left-1/2 top-[16%] h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/34 to-transparent" />
      <div className="absolute bottom-[16%] left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#f4c2c2]/34 to-transparent" />
      <div className="absolute h-[62%] w-[62%] rounded-full border border-white/18 shadow-[0_0_34px_rgba(244,194,194,0.12)]" />
      <div className="absolute h-[43%] w-[43%] rotate-45 border border-[#d8c4ff]/24" />
      <div className="absolute h-[74%] w-px bg-gradient-to-b from-transparent via-white/18 to-transparent" />
      <div className="absolute h-px w-[74%] bg-gradient-to-r from-transparent via-white/18 to-transparent" />
      {correspondence ? (
        <div className="relative flex h-[52%] w-[52%] items-center justify-center rounded-full border border-white/18 bg-white/7 shadow-[0_0_36px_rgba(255,255,255,0.12)] backdrop-blur-sm">
          <AstrologicalDesign type={correspondence.design} compact={compact} />
        </div>
      ) : isMinor ? (
        <div className="relative h-[76%] w-[76%]">
          <MinorArcanaDesign card={card} compact={compact} />
        </div>
      ) : (
        <div className="relative flex h-[44%] w-[44%] items-center justify-center rounded-full border border-white/24 bg-white/8 shadow-[0_0_36px_rgba(255,255,255,0.12)] backdrop-blur-sm">
          <span className={compact ? "text-4xl text-[#fff1c7] drop-shadow-[0_0_16px_rgba(255,241,199,0.48)]" : "text-6xl text-[#fff1c7] drop-shadow-[0_0_20px_rgba(255,241,199,0.52)]"}>
            {symbol}
          </span>
        </div>
      )}
      <div className="absolute left-4 right-4 top-4 flex justify-between text-[10px] text-white/54">
        <span>✦</span>
        <span>✦</span>
      </div>
      <div className="absolute bottom-4 left-4 right-4 text-center">
        <p className="truncate text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">{name}</p>
      </div>
    </div>
  );
}

function TarotCardPreview({ card, editable = false }) {
  return (
    <article className="flex min-h-[260px] flex-col rounded-xl border border-white/10 bg-white/7 p-4 shadow-lg">
      <div className="aspect-[3/4] overflow-hidden rounded-lg border border-white/10 bg-[#241b34]">
        <TarotCardArt card={card} />
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-white">{card.name}</h3>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">
            {card.arcana} {card.suit && card.suit !== "none" ? `/ ${card.suit}` : ""}
          </p>
        </div>
        {editable ? (
          <Link to={`/tarot/cards/${card.id}/edit`} className="rounded-full border border-white/12 p-2 text-slate-100 transition hover:bg-white/10" aria-label={`Edit ${card.name}`}>
            <Edit3 className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-300">{card.uprightMeaning || card.upright_meaning}</p>
      {card.keywords?.length ? (
        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          {card.keywords.slice(0, 3).map((keyword) => (
            <span key={keyword} className="rounded-full bg-white/8 px-2.5 py-1 text-xs text-slate-200">{keyword}</span>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export function TarotHomePage({ user }) {
  return (
    <TarotShell user={user}>
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="mb-3 text-sm uppercase tracking-[0.28em] text-[#f4c2c2]">Tarot</p>
          <h1 className="text-4xl font-semibold text-white md:text-5xl">Cards, readings, and saved signs</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { to: "/tarot/decks", icon: BookOpen, title: "Decks", text: "Browse the default 78 cards or create your own deck." },
            { to: "/tarot/read", icon: Sparkles, title: "Draw", text: "Ask a question and draw one or three cards." },
            { to: "/tarot/readings", icon: Star, title: "Saved", text: "Review readings, pin what matters, and prune the rest." },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.to} to={item.to} className="rounded-2xl border border-white/10 bg-white/7 p-5 transition hover:-translate-y-0.5 hover:bg-white/11">
                <Icon className="h-6 w-6 text-[#f4c2c2]" />
                <h2 className="mt-5 text-xl font-semibold text-white">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.text}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </TarotShell>
  );
}

export function TarotDeckListPage({ user }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deckType, setDeckType] = useState("tarot");
  const [allowReversed, setAllowReversed] = useState(true);

  const loadDecks = () => {
    setError("");
    apiFetch("/api/tarot/decks/").then(setData).catch((err) => setError(err.message || "Failed to load decks."));
  };

  useEffect(() => {
    apiFetch("/api/tarot/decks/").then(setData).catch((err) => setError(err.message || "Failed to load decks."));
  }, []);

  const createDeck = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await apiFetch("/api/tarot/decks/", {
        method: "POST",
        body: JSON.stringify({ name, description, deckType, allowReversed }),
      });
      setName("");
      setDescription("");
      loadDecks();
    } catch (err) {
      setError(err.message || "Failed to create deck.");
    }
  };

  return (
    <TarotShell user={user} wide>
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Link to="/tarot" className="mb-2 inline-flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-[#f4c2c2] transition hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              Tarot / Decks
            </Link>
            <h1 className="text-3xl font-semibold text-white">Deck Library</h1>
          </div>
          <Link to="/tarot/read" className="inline-flex items-center gap-2 rounded-full bg-[#f4c2c2] px-5 py-3 font-semibold text-[#2a2036]">
            <Sparkles className="h-4 w-4" /> DRAW
          </Link>
        </div>
        <ErrorNotice message={error} />
        {!data ? <LoadingNotice /> : null}
        {data ? (
          <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
            <div className="space-y-6">
              <DeckSection title="System Decks" decks={data.systemDecks} />
              <DeckSection title="Shared Decks" decks={data.sharedDecks ?? []} />
              <DeckSection title="My Decks" decks={data.myDecks} editable />
            </div>
            <Panel>
              <h2 className="text-lg font-semibold text-white">Create Deck</h2>
              {user ? (
                <form className="mt-4 space-y-4" onSubmit={createDeck}>
                  <input className="w-full rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none" placeholder="Deck name" value={name} onChange={(event) => setName(event.target.value)} />
                  <textarea className="min-h-28 w-full rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none" placeholder="Description" value={description} onChange={(event) => setDescription(event.target.value)} />
                  <select className="w-full rounded-xl border border-white/10 bg-[#221a32] px-4 py-3 text-white" value={deckType} onChange={(event) => setDeckType(event.target.value)}>
                    <option value="tarot">Tarot</option>
                    <option value="oracle">Oracle</option>
                  </select>
                  <label className="flex items-center gap-3 text-sm text-slate-200">
                    <input type="checkbox" checked={allowReversed} onChange={(event) => setAllowReversed(event.target.checked)} />
                    Allow reversed cards
                  </label>
                  <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#f4c2c2] px-5 py-3 font-semibold text-[#2a2036]" type="submit">
                    <Plus className="h-4 w-4" /> CREATE
                  </button>
                </form>
              ) : (
                <p className="mt-4 text-sm leading-7 text-slate-300">Login to create personal decks. System decks are available to browse.</p>
              )}
            </Panel>
          </div>
        ) : null}
      </div>
    </TarotShell>
  );
}

function DeckSection({ title, decks, editable = false }) {
  return (
    <Panel>
      <h2 className="mb-4 text-lg font-semibold text-white">{title}</h2>
      {decks.length ? (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {decks.map((deck) => (
            <Link key={deck.id} to={`/tarot/decks/${deck.id}`} className="rounded-xl border border-white/10 bg-white/7 p-4 transition hover:bg-white/11">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold text-white">{deck.name}</h3>
                <span className="rounded-full bg-white/8 px-2 py-1 text-xs text-slate-300">{deck.cardCount} cards</span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-300">{deck.description || "No description."}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.18em] text-slate-400">
                {deck.deckType} / {deck.allowReversed ? "reversed" : "upright only"} {editable ? "" : "/ readonly"}
                {deck.isPublic ? " / shared" : ""}
              </p>
              {deck.ownerName ? <p className="mt-2 text-xs text-slate-500">by {deck.ownerName}</p> : null}
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-300">No decks yet.</p>
      )}
    </Panel>
  );
}

export function TarotDeckDetailPage({ user }) {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");
  const [arcana, setArcana] = useState("all");
  const [error, setError] = useState("");
  const [shareConfirmOpen, setShareConfirmOpen] = useState(false);
  const [shareConfirmText, setShareConfirmText] = useState("");
  const [deckForm, setDeckForm] = useState({
    name: "",
    description: "",
    deckType: "tarot",
    allowReversed: true,
    isPublic: false,
  });

  useEffect(() => {
    apiFetch(`/api/tarot/decks/${deckId}/cards/`)
      .then((nextData) => {
        setData(nextData);
        setDeckForm({
          name: nextData.deck.name,
          description: nextData.deck.description ?? "",
          deckType: nextData.deck.deckType,
          allowReversed: nextData.deck.allowReversed,
          isPublic: nextData.deck.isPublic,
        });
        setShareConfirmOpen(false);
        setShareConfirmText("");
      })
      .catch((err) => setError(err.message || "Failed to load deck."));
  }, [deckId]);

  const filteredCards = useMemo(() => {
    const cards = data?.cards ?? [];
    const needle = query.trim().toLowerCase();
    return cards.filter((card) => {
      const matchesArcana = arcana === "all" || card.arcana === arcana;
      const text = `${card.name} ${(card.keywords ?? []).join(" ")} ${card.uprightMeaning ?? ""}`.toLowerCase();
      return matchesArcana && (!needle || text.includes(needle));
    });
  }, [arcana, data, query]);
  const canEditDeck = Boolean(
    data?.deck &&
      !data.deck.isSystem &&
      (data.deck.ownerId === user?.id || (data.deck.ownerId == null && user)),
  );

  const saveDeck = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const updatedDeck = await apiFetch(`/api/tarot/decks/${deckId}/`, {
        method: "PUT",
        body: JSON.stringify(deckForm),
      });
      setData((current) => current ? { ...current, deck: updatedDeck } : current);
    } catch (err) {
      setError(err.message || "Failed to save deck.");
    }
  };

  const deleteDeck = async () => {
    if (!window.confirm("Delete this deck and all of its cards?")) return;
    setError("");
    try {
      await apiFetch(`/api/tarot/decks/${deckId}/`, { method: "DELETE" });
      navigate("/tarot/decks");
    } catch (err) {
      setError(err.message || "Failed to delete deck.");
    }
  };

  const publishDeck = async () => {
    const expectedName = deckForm.name.trim();
    if (!expectedName || shareConfirmText !== expectedName) return;
    setError("");
    try {
      const updatedDeck = await apiFetch(`/api/tarot/decks/${deckId}/`, {
        method: "PUT",
        body: JSON.stringify({ ...deckForm, isPublic: true }),
      });
      setData((current) => current ? { ...current, deck: updatedDeck } : current);
      setDeckForm((current) => ({ ...current, isPublic: true }));
      setShareConfirmOpen(false);
      setShareConfirmText("");
    } catch (err) {
      setError(err.message || "Failed to share deck.");
    }
  };

  const unpublishDeck = async () => {
    setError("");
    try {
      const updatedDeck = await apiFetch(`/api/tarot/decks/${deckId}/`, {
        method: "PUT",
        body: JSON.stringify({ ...deckForm, isPublic: false }),
      });
      setData((current) => current ? { ...current, deck: updatedDeck } : current);
      setDeckForm((current) => ({ ...current, isPublic: false }));
      setShareConfirmOpen(false);
      setShareConfirmText("");
    } catch (err) {
      setError(err.message || "Failed to make deck private.");
    }
  };

  return (
    <TarotShell user={user} wide>
      <div className="mx-auto max-w-7xl">
        <ErrorNotice message={error} />
        {!data ? <LoadingNotice /> : null}
        {data ? (
          <>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-sm uppercase tracking-[0.28em] text-[#f4c2c2]">Tarot / Deck</p>
                <h1 className="text-3xl font-semibold text-white">{data.deck.name}</h1>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-300">{data.deck.description}</p>
              </div>
              <div className="flex gap-3">
                {canEditDeck ? (
                  <Link to={`/tarot/decks/${data.deck.id}/cards/new`} className="inline-flex items-center gap-2 rounded-full bg-[#f4c2c2] px-5 py-3 font-semibold text-[#2a2036]">
                    <Plus className="h-4 w-4" /> CARD
                  </Link>
                ) : null}
                <Link to="/tarot/read" className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-5 py-3 text-white">
                  <Sparkles className="h-4 w-4" /> DRAW
                </Link>
              </div>
            </div>
            <Panel className="mb-5">
              <div className="flex flex-col gap-3 md:flex-row">
                <label className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input className="w-full rounded-xl border border-white/10 bg-white/8 px-10 py-3 text-white outline-none" placeholder="Search cards" value={query} onChange={(event) => setQuery(event.target.value)} />
                </label>
                <select className="rounded-xl border border-white/10 bg-[#221a32] px-4 py-3 text-white" value={arcana} onChange={(event) => setArcana(event.target.value)}>
                  <option value="all">All</option>
                  {ARCANA_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </div>
            </Panel>
            <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredCards.map((card) => <TarotCardPreview key={card.id} card={card} editable={canEditDeck} />)}
              </div>
              {canEditDeck ? (
                <Panel className="h-fit">
                  <h2 className="text-lg font-semibold text-white">Edit Deck</h2>
                  <form className="mt-4 space-y-4" onSubmit={saveDeck}>
                    <input
                      className="w-full rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none"
                      value={deckForm.name}
                      onChange={(event) => setDeckForm((current) => ({ ...current, name: event.target.value }))}
                    />
                    <textarea
                      className="min-h-28 w-full rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none"
                      value={deckForm.description}
                      onChange={(event) => setDeckForm((current) => ({ ...current, description: event.target.value }))}
                    />
                    <select
                      className="w-full rounded-xl border border-white/10 bg-[#221a32] px-4 py-3 text-white"
                      value={deckForm.deckType}
                      onChange={(event) => setDeckForm((current) => ({ ...current, deckType: event.target.value }))}
                    >
                      <option value="tarot">Tarot</option>
                      <option value="oracle">Oracle</option>
                    </select>
                    <label className="flex items-center gap-3 text-sm text-slate-200">
                      <input
                        type="checkbox"
                        checked={deckForm.allowReversed}
                        onChange={(event) => setDeckForm((current) => ({ ...current, allowReversed: event.target.checked }))}
                      />
                      Allow reversed cards
                    </label>
                    <div className="rounded-xl border border-white/10 bg-white/6 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {deckForm.isPublic ? "Shared Deck" : "Private Deck"}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-slate-300">
                            {deckForm.isPublic
                              ? "Other users can browse and draw from this deck."
                              : "Share this deck after checking the cards and description."}
                          </p>
                        </div>
                        <span className={`rounded-full px-2.5 py-1 text-xs ${deckForm.isPublic ? "bg-emerald-300/14 text-emerald-100" : "bg-white/8 text-slate-300"}`}>
                          {deckForm.isPublic ? "PUBLIC" : "PRIVATE"}
                        </span>
                      </div>

                      {deckForm.isPublic ? (
                        <button
                          className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-white/12 bg-white/8 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/12"
                          type="button"
                          onClick={unpublishDeck}
                        >
                          Make private
                        </button>
                      ) : (
                        <>
                          {shareConfirmOpen ? (
                            <div className="mt-4 space-y-3">
                              <p className="text-sm leading-6 text-slate-300">
                                Type <span className="font-semibold text-white">{deckForm.name}</span> to confirm sharing.
                              </p>
                              <input
                                className="w-full rounded-xl border border-white/10 bg-[#221a32] px-4 py-3 text-white outline-none"
                                value={shareConfirmText}
                                onChange={(event) => setShareConfirmText(event.target.value)}
                              />
                              <div className="flex gap-2">
                                <button
                                  className="inline-flex flex-1 items-center justify-center rounded-full bg-[#f4c2c2] px-4 py-2.5 text-sm font-semibold text-[#2a2036] disabled:cursor-not-allowed disabled:opacity-45"
                                  type="button"
                                  disabled={shareConfirmText !== deckForm.name.trim()}
                                  onClick={publishDeck}
                                >
                                  Share Deck
                                </button>
                                <button
                                  className="inline-flex items-center justify-center rounded-full border border-white/12 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                                  type="button"
                                  onClick={() => {
                                    setShareConfirmOpen(false);
                                    setShareConfirmText("");
                                  }}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-[#f4c2c2]/40 bg-[#f4c2c2]/12 px-4 py-2.5 text-sm font-semibold text-[#ffdbe3] transition hover:bg-[#f4c2c2]/18"
                              type="button"
                              onClick={() => setShareConfirmOpen(true)}
                            >
                              Share Deck
                            </button>
                          )}
                        </>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#f4c2c2] px-5 py-3 font-semibold text-[#2a2036]" type="submit">
                        <Check className="h-4 w-4" /> SAVE
                      </button>
                      <button className="inline-flex items-center justify-center rounded-full border border-rose-200/20 px-4 py-3 text-rose-100 transition hover:bg-rose-300/10" type="button" onClick={deleteDeck} aria-label="Delete deck">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                </Panel>
              ) : null}
            </div>
          </>
        ) : null}
      </div>
    </TarotShell>
  );
}

export function TarotCardEditorPage({ user }) {
  const { deckId, cardId } = useParams();
  const navigate = useNavigate();
  const imageInputRef = useRef(null);
  const [loadedDeckId, setLoadedDeckId] = useState(deckId ?? "");
  const [imageFile, setImageFile] = useState(null);
  const imagePreviewUrl = useMemo(() => (imageFile ? URL.createObjectURL(imageFile) : ""), [imageFile]);
  const [form, setForm] = useState({
    name: "",
    arcana: "oracle",
    suit: "none",
    number: "",
    keywords: "",
    uprightMeaning: "",
    reversedMeaning: "",
    image: "",
    order: 0,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!cardId) return;
    apiFetch(`/api/tarot/cards/${cardId}/`)
      .then((card) => {
        setForm({
          name: card.name,
          arcana: card.arcana,
          suit: card.suit,
          number: card.number ?? "",
          keywords: (card.keywords ?? []).join(", "),
          uprightMeaning: card.uprightMeaning,
          reversedMeaning: card.reversedMeaning,
          image: card.image,
          order: card.order,
        });
        setLoadedDeckId(String(card.deckId));
      })
      .catch((err) => setError(err.message || "Failed to load card."));
  }, [cardId]);

  useEffect(() => {
    const objectUrl = imagePreviewUrl;
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [imagePreviewUrl]);

  const updateField = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));
  const chooseImage = () => {
    imageInputRef.current?.click();
  };
  const handleImageFile = (event) => {
    const file = event.target.files?.[0] ?? null;
    setImageFile(file);
    if (file) {
      setForm((current) => ({ ...current, image: "" }));
    }
  };
  const submit = async (event) => {
    event.preventDefault();
    setError("");
    const payload = {
      ...form,
      deckId,
      suit: form.arcana === "minor" ? form.suit : "none",
      number: form.number === "" ? null : Number(form.number),
      order: Number(form.order || 0),
      keywords: form.keywords.split(",").map((keyword) => keyword.trim()).filter(Boolean),
    };
    const body = imageFile
      ? Object.entries(payload).reduce((formData, [key, value]) => {
          formData.append(key, Array.isArray(value) ? JSON.stringify(value) : value ?? "");
          return formData;
        }, new FormData())
      : JSON.stringify(payload);
    if (imageFile) {
      body.append("imageFile", imageFile);
    }
    try {
      const saved = await apiFetch(cardId ? `/api/tarot/cards/${cardId}/` : "/api/tarot/cards/", {
        method: imageFile || !cardId ? "POST" : "PUT",
        body,
      });
      navigate(`/tarot/decks/${saved.deckId}`);
    } catch (err) {
      setError(err.message || "Failed to save card.");
    }
  };

  const previewImage = imagePreviewUrl || form.image;

  const deleteCard = async () => {
    if (!cardId || !window.confirm("Delete this card?")) return;
    setError("");
    try {
      await apiFetch(`/api/tarot/cards/${cardId}/`, { method: "DELETE" });
      navigate(`/tarot/decks/${loadedDeckId}`);
    } catch (err) {
      setError(err.message || "Failed to delete card.");
    }
  };

  return (
    <TarotShell user={user}>
      <Panel className="mx-auto max-w-3xl">
        <p className="mb-2 text-sm uppercase tracking-[0.28em] text-[#f4c2c2]">Tarot / Card</p>
        <h1 className="text-3xl font-semibold text-white">{cardId ? "Edit Card" : "Create Card"}</h1>
        <ErrorNotice message={error} />
        <form className="mt-6 grid gap-4" onSubmit={submit}>
          <input className="rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none" placeholder="Card name" value={form.name} onChange={updateField("name")} />
          <div className="grid gap-4 md:grid-cols-3">
            <select className="rounded-xl border border-white/10 bg-[#221a32] px-4 py-3 text-white" value={form.arcana} onChange={updateField("arcana")}>
              {ARCANA_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
            <select className="rounded-xl border border-white/10 bg-[#221a32] px-4 py-3 text-white" value={form.suit} onChange={updateField("suit")} disabled={form.arcana !== "minor"}>
              {SUIT_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
            <input className="rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none" placeholder="Number" value={form.number} onChange={updateField("number")} />
          </div>
          <input className="rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none" placeholder="Keywords, comma separated" value={form.keywords} onChange={updateField("keywords")} />
          <textarea className="min-h-32 rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none" placeholder="Upright meaning" value={form.uprightMeaning} onChange={updateField("uprightMeaning")} />
          <textarea className="min-h-32 rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none" placeholder="Reversed meaning" value={form.reversedMeaning} onChange={updateField("reversedMeaning")} />
          <div className="grid gap-3 md:grid-cols-[1fr_auto]">
            <input className="rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none" placeholder="Image URL" value={form.image} onChange={updateField("image")} disabled={Boolean(imageFile)} />
            <input ref={imageInputRef} className="hidden" type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageFile} />
            <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/8 px-4 py-3 font-semibold text-white transition hover:bg-white/12" type="button" onClick={chooseImage}>
              <ImageIcon className="h-4 w-4" />
              Image
            </button>
          </div>
          {imageFile ? (
            <p className="text-sm text-slate-300">
              Selected: {imageFile.name}{" "}
              <button
                className="font-semibold text-[#f4c2c2] hover:text-white"
                type="button"
                onClick={() => {
                  setImageFile(null);
                  if (imageInputRef.current) {
                    imageInputRef.current.value = "";
                  }
                }}
              >
                clear
              </button>
            </p>
          ) : null}
          <div className="grid gap-3 rounded-xl border border-white/10 bg-white/6 p-3 md:grid-cols-[120px_1fr] md:items-center">
            <div className="aspect-[3/4] overflow-hidden rounded-lg border border-white/10 bg-[#241b34]">
              {previewImage ? (
                <img src={previewImage} alt="Selected tarot card preview" className="h-full w-full object-cover" />
              ) : (
                <TarotCardArt card={{ ...form, name: form.name || "New Card" }} compact />
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Card image preview</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {previewImage ? "This image will be shown on the card." : "Choose an image file or enter an image URL."}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#f4c2c2] px-5 py-3 font-semibold text-[#2a2036]" type="submit">
              <Check className="h-4 w-4" /> SAVE
            </button>
            {cardId ? (
              <button className="inline-flex items-center justify-center rounded-full border border-rose-200/20 px-5 py-3 text-rose-100 transition hover:bg-rose-300/10" type="button" onClick={deleteCard}>
                <Trash2 className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        </form>
      </Panel>
    </TarotShell>
  );
}

export function TarotReadingPage({ user }) {
  const [decks, setDecks] = useState([]);
  const [deckId, setDeckId] = useState("");
  const [spreadType, setSpreadType] = useState("one_card");
  const [allowReversed, setAllowReversed] = useState(true);
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    apiFetch("/api/tarot/decks/")
      .then((data) => {
        const nextDecks = [...data.systemDecks, ...(data.sharedDecks ?? []), ...data.myDecks];
        setDecks(nextDecks);
        setDeckId(String(nextDecks[0]?.id ?? ""));
      })
      .catch((err) => setError(err.message || "Failed to load decks."));
  }, []);

  const draw = async (event) => {
    event.preventDefault();
    setError("");
    setResult(null);
    setDrawing(true);
    try {
      const reading = await apiFetch("/api/tarot/readings/draw/", {
        method: "POST",
        body: JSON.stringify({ deckId: Number(deckId), spreadType, allowReversed, question, includeAi: true }),
      });
      setResult(reading);
    } catch (err) {
      setError(err.message || "Failed to draw cards.");
    } finally {
      setDrawing(false);
    }
  };

  return (
    <TarotShell user={user} wide>
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[360px_1fr]">
        <Panel>
          <p className="mb-2 text-sm uppercase tracking-[0.28em] text-[#f4c2c2]">Tarot / Draw</p>
          <h1 className="text-3xl font-semibold text-white">Draw Cards</h1>
          <ErrorNotice message={error} />
          <form className="mt-6 space-y-4" onSubmit={draw}>
            <select className="w-full rounded-xl border border-white/10 bg-[#221a32] px-4 py-3 text-white" value={deckId} onChange={(event) => setDeckId(event.target.value)}>
              {decks.map((deck) => <option key={deck.id} value={deck.id}>{deck.name}</option>)}
            </select>
            <select className="w-full rounded-xl border border-white/10 bg-[#221a32] px-4 py-3 text-white" value={spreadType} onChange={(event) => setSpreadType(event.target.value)}>
              <option value="one_card">One card</option>
              <option value="three_card">Three cards</option>
            </select>
            <textarea className="min-h-28 w-full rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none" placeholder="Question" value={question} onChange={(event) => setQuestion(event.target.value)} />
            <label className="flex items-center gap-3 text-sm text-slate-200">
              <input type="checkbox" checked={allowReversed} onChange={(event) => setAllowReversed(event.target.checked)} />
              Allow reversed cards
            </label>
            <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#f4c2c2] px-5 py-3 font-semibold text-[#2a2036] disabled:cursor-wait disabled:opacity-70" type="submit" disabled={drawing}>
              <Sparkles className="h-4 w-4" /> {drawing ? "DRAWING..." : "DRAW AND SAVE"}
            </button>
          </form>
        </Panel>
        <ReadingResult result={result} loading={drawing} />
      </div>
    </TarotShell>
  );
}

function ReadingResult({ result, loading = false }) {
  if (loading) {
    return <Panel className="flex min-h-[420px] items-center justify-center text-center text-slate-300">Drawing cards and listening for the reading...</Panel>;
  }
  if (!result) {
    return <Panel className="flex min-h-[420px] items-center justify-center text-center text-slate-300">Your reading will appear here.</Panel>;
  }
  return (
    <Panel>
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-[#f4c2c2]">{result.spreadType}</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">{result.question || "Untitled reading"}</h2>
        </div>
        <Link to={`/tarot/readings/${result.id}`} className="rounded-full border border-white/12 px-4 py-2 text-sm text-white">DETAIL</Link>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {result.cards.map((card) => (
          <article key={card.position} className="rounded-xl border border-white/10 bg-white/7 p-4">
            <div className={`mb-4 aspect-[3/4] overflow-hidden rounded-lg border border-white/10 bg-[#241b34] ${card.isReversed ? "rotate-180" : ""}`}>
              <TarotCardArt card={{ ...card, image: card.image, name: card.cardName }} compact />
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{card.positionLabel}</p>
            <h3 className="mt-3 text-lg font-semibold text-white">{card.cardName}</h3>
            <p className="mt-1 text-sm text-[#f4c2c2]">{card.isReversed ? "Reversed" : "Upright"}</p>
            <p className="mt-4 text-sm leading-7 text-slate-300">{card.meaning}</p>
          </article>
        ))}
      </div>
      <p className="mt-5 text-sm text-slate-400">Remaining saved readings: {result.remaining}/{result.limit}</p>
      {result.aiInterpretation ? (
        <div className="mt-4 rounded-2xl border border-[#f4c2c2]/20 bg-[#f4c2c2]/8 p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-[#f4c2c2]">Witch's Reading</p>
          <div className="mt-3 whitespace-pre-line text-sm leading-8 text-slate-100">{result.aiInterpretation}</div>
        </div>
      ) : null}
    </Panel>
  );
}

export function TarotReadingHistoryPage({ user }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const loadReadings = () => apiFetch("/api/tarot/readings/").then(setData).catch((err) => setError(err.message || "Failed to load readings."));
  useEffect(() => { loadReadings(); }, []);

  const patchReading = async (reading, patch) => {
    await apiFetch(`/api/tarot/readings/${reading.id}/`, { method: "PATCH", body: JSON.stringify(patch) });
    loadReadings();
  };
  const deleteReading = async (reading) => {
    await apiFetch(`/api/tarot/readings/${reading.id}/`, { method: "DELETE" });
    loadReadings();
  };

  return (
    <TarotShell user={user} wide>
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.28em] text-[#f4c2c2]">Tarot / Saved</p>
            <h1 className="text-3xl font-semibold text-white">Reading History</h1>
          </div>
          <Link to="/tarot/read" className="rounded-full bg-[#f4c2c2] px-5 py-3 font-semibold text-[#2a2036]">DRAW</Link>
        </div>
        <ErrorNotice message={error} />
        {!data ? <LoadingNotice /> : null}
        {data ? (
          <div className="space-y-4">
            <p className="text-sm text-slate-400">Remaining saved readings: {data.remaining}/{data.limit}</p>
            {data.readings.map((reading) => (
              <Panel key={reading.id}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <Link to={`/tarot/readings/${reading.id}`} className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{new Date(reading.createdAt).toLocaleString()}</p>
                    <h2 className="mt-2 text-xl font-semibold text-white">{reading.question || "Untitled reading"}</h2>
                    <p className="mt-2 text-sm text-slate-300">{reading.cards.map((card) => card.cardName).join(" / ")}</p>
                  </Link>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => patchReading(reading, { isPinned: !reading.isPinned })} className={`rounded-full border px-3 py-2 ${reading.isPinned ? "border-[#f4c2c2] bg-[#f4c2c2] text-[#2a2036]" : "border-white/12 text-white"}`}>
                      <Star className="h-4 w-4" />
                    </button>
                    <button type="button" onClick={() => deleteReading(reading)} className="rounded-full border border-white/12 px-3 py-2 text-white">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Panel>
            ))}
          </div>
        ) : null}
      </div>
    </TarotShell>
  );
}

export function TarotReadingDetailPage({ user }) {
  const { readingId } = useParams();
  const [reading, setReading] = useState(null);
  const [memo, setMemo] = useState("");
  const [error, setError] = useState("");

  const loadReading = () => {
    apiFetch(`/api/tarot/readings/${readingId}/`).then((data) => {
      setReading(data);
      setMemo(data.memo || "");
    }).catch((err) => setError(err.message || "Failed to load reading."));
  };
  useEffect(loadReading, [readingId]);

  const saveMemo = async () => {
    const updated = await apiFetch(`/api/tarot/readings/${readingId}/`, { method: "PATCH", body: JSON.stringify({ memo }) });
    setReading(updated);
  };

  return (
    <TarotShell user={user} wide>
      <div className="mx-auto max-w-5xl">
        <ErrorNotice message={error} />
        {!reading ? <LoadingNotice /> : null}
        {reading ? (
          <Panel>
            <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-[#f4c2c2]">{reading.spreadType}</p>
                <h1 className="mt-2 text-3xl font-semibold text-white">{reading.question || "Untitled reading"}</h1>
              </div>
              <button type="button" className="rounded-full border border-white/12 px-4 py-2 text-white" onClick={async () => setReading(await apiFetch(`/api/tarot/readings/${reading.id}/`, { method: "PATCH", body: JSON.stringify({ isPinned: !reading.isPinned }) }))}>
                <Star className={`h-4 w-4 ${reading.isPinned ? "fill-[#f4c2c2] text-[#f4c2c2]" : ""}`} />
              </button>
            </div>
            <ReadingResult result={reading} />
            <div className="mt-5">
              <label className="mb-2 block text-sm text-slate-300">Memo</label>
              <textarea className="min-h-32 w-full rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none" value={memo} onChange={(event) => setMemo(event.target.value)} />
              <button type="button" onClick={saveMemo} className="mt-3 rounded-full bg-[#f4c2c2] px-5 py-3 font-semibold text-[#2a2036]">SAVE MEMO</button>
            </div>
          </Panel>
        ) : null}
      </div>
    </TarotShell>
  );
}
