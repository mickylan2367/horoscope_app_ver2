import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as FullpageModule from "@fullpage/react-fullpage";
import { motion as Motion, AnimatePresence } from "framer-motion";
import CosmicBackground from "./components/CosmicBackground";
import {
  Star,
  Moon,
  Sparkles,
  Compass,
  Wand2,
  MousePointer2,
} from "lucide-react";

const ReactFullpage =
  FullpageModule?.default?.default ??
  FullpageModule?.default ??
  FullpageModule;

const experienceCards = [
  {
    id: 1,
    title: "Diary Notes",
    subtitle: "Diary / Tarot",
    text: "Capture the mood of the day and let tarot add another layer of meaning.",
  },
  {
    id: 2,
    title: "Follow the Stars",
    subtitle: "Astrology",
    text: "Astrology helps me see patterns, timing, and the shape of the future.",
  },
  {
    id: 3,
    title: "Keep It as an Archive",
    subtitle: "Your Archive",
    text: "Save what matters and return to it whenever you need a quiet reminder.",
  },
];

const majorArcanaCards = [
  {
    id: 1,
    title: "The Fool",
    subtitle: "Major Arcana",
    text: "A fresh start, trust, and an open path ahead.",
  },
  {
    id: 2,
    title: "The Magician",
    subtitle: "Major Arcana",
    text: "Focus, skill, and the will to shape what comes next.",
  },
  {
    id: 3,
    title: "The High Priestess",
    subtitle: "Major Arcana",
    text: "Intuition, quiet knowing, and hidden layers.",
  },
  {
    id: 4,
    title: "The Empress",
    subtitle: "Major Arcana",
    text: "Abundance, care, and creative growth.",
  },
  {
    id: 5,
    title: "The Moon",
    subtitle: "Major Arcana",
    text: "Unclear signals, dreams, and the need to listen closely.",
  },
  {
    id: 6,
    title: "The World",
    subtitle: "Major Arcana",
    text: "Completion, integration, and the feeling of arrival.",
  },
];

function SectionTitle({ icon, eyebrow, title, description }) {
  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center gap-2 text-sm tracking-[0.22em] uppercase text-fuchsia-200/80">
        {icon}
        <span>{eyebrow}</span>
      </div>
      <h1 className="text-3xl font-semibold text-white md:text-4xl">{title}</h1>
      {description && (
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

const deckThemes = {
  original: {
    ring: "border-fuchsia-200/20",
    shadow: "shadow-[0_20px_80px_rgba(168,85,247,0.25)]",
    glow: "from-[#23152f] via-[#15162a] to-[#0d1020]",
    accent: "text-fuchsia-200/80",
    dot: "bg-fuchsia-300",
  },
  tarot: {
    ring: "border-[#8d7444]/45",
    shadow: "shadow-[0_20px_80px_rgba(84,68,36,0.3)]",
    glow: "from-[#3a3025]/95 via-[#2c241c]/95 to-[#1f1814]/95",
    accent: "text-[#b99a62]/80",
    dot: "bg-[#b99a62]",
  },
};

function toRomanNumeral(number) {
  const numerals = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let remaining = number;
  let output = "";
  numerals.forEach(([value, symbol]) => {
    while (remaining >= value) {
      output += symbol;
      remaining -= value;
    }
  });
  return output;
}

function CardDeck({ cards, theme, title, icon }) {
  const [index, setIndex] = useState(0);
  const current = cards[index];
  const styles = deckThemes[theme];
  const DeckIcon = icon;
  const isTarot = theme === "tarot";

  const goPrev = () =>
    setIndex((prev) => (prev - 1 + cards.length) % cards.length);
  const goNext = () =>
    setIndex((prev) => (prev + 1) % cards.length);

  React.useEffect(() => {
    const intervalMs = isTarot ? 10000 : 5000;
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % cards.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [cards.length, isTarot]);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  };

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-slate-400">
        <DeckIcon className={`h-4 w-4 ${styles.accent}`} />
        <span>{title}</span>
      </div>

      <div
        className="group relative flex min-h-[480px] w-full items-center justify-center outline-none"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label={`${title} deck`}
      >
        <div className={`absolute h-[360px] w-[290px] -translate-x-6 translate-y-5 rounded-[2rem] border ${styles.ring} bg-white/5 shadow-2xl backdrop-blur-sm`} />
        <div className={`absolute h-[360px] w-[290px] translate-x-6 -translate-y-5 rounded-[2rem] border ${styles.ring} bg-white/5 shadow-2xl backdrop-blur-sm`} />

        <AnimatePresence mode="wait">
          <Motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20, rotate: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, rotate: 4, scale: 0.95 }}
            transition={{ duration: 0.35 }}
            className={`relative z-10 h-[420px] w-[340px] rounded-[2rem] border ${styles.ring} bg-gradient-to-b ${styles.glow} p-7 ${styles.shadow} ${isTarot ? "backdrop-blur-sm" : ""} transition-transform duration-300 group-hover:scale-[1.01]`}
          >
            {isTarot ? (
              <div className="relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[#8d7444]/40 bg-[#1a1512]/85 text-[#f1e6cf]">
                <div className="pointer-events-none absolute inset-0 opacity-55 [background-image:radial-gradient(circle_at_top,_rgba(185,154,98,0.12),_transparent_42%),radial-gradient(circle_at_bottom,_rgba(255,255,255,0.03),_transparent_48%)]" />
                <div className="relative flex h-full flex-col p-5">
                  <div className="flex items-start justify-between text-[10px] font-medium uppercase tracking-[0.4em] text-[#b99a62]/80">
                    <span>{toRomanNumeral(index + 1)}</span>
                    <span>{current.subtitle}</span>
                  </div>

                  <div className="mt-5 flex flex-1 flex-col rounded-[1.25rem] border border-[#b99a62]/20 bg-[#241d18]/70 px-4 py-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
                    <div className="flex items-center gap-3 text-[#b99a62]/70">
                      <div className="h-px flex-1 bg-[#b99a62]/25" />
                      <Sparkles className="h-4 w-4" />
                      <div className="h-px flex-1 bg-[#b99a62]/25" />
                    </div>

                    <div className="flex flex-1 flex-col items-center justify-center text-center">
                      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-[#b99a62]/35 bg-[#faf2df]/8 text-[#d8c08e] shadow-[0_0_18px_rgba(185,154,98,0.12)]">
                        <Moon className="h-9 w-9" />
                      </div>
                      <h3 className="font-serif text-3xl uppercase tracking-[0.22em] text-[#f1e6cf]">
                        {current.title}
                      </h3>
                      <div className="mt-4 h-px w-28 bg-[#b99a62]/30" />
                    </div>

                    <p className="mx-auto mt-auto max-w-[240px] text-center text-sm leading-7 text-[#d8c9ab]">
                      {current.text}
                    </p>

                    <div className="mt-4 flex items-center gap-3 text-[#b99a62]/70">
                      <div className="h-px flex-1 bg-[#b99a62]/25" />
                      <Sparkles className="h-4 w-4" />
                      <div className="h-px flex-1 bg-[#b99a62]/25" />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.35em] text-[#b99a62]/80">
                    <span>Arcana</span>
                    <span>{String(index + 1).padStart(2, "0")}/{String(cards.length).padStart(2, "0")}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className={`mb-5 flex items-center justify-between ${styles.accent}`}>
                    <Moon className="h-5 w-5" />
                    <span className="text-xs uppercase tracking-[0.3em]">Arcana</span>
                  </div>
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                    {current.subtitle}
                  </p>
                  <h3 className="mt-3 text-3xl font-semibold leading-tight text-white">
                    {current.title}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-slate-300">
                    {current.text}
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{String(cards.length).padStart(2, "0")}</span>
                </div>
              </div>
            )}

            <div className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-white/80 opacity-0 shadow-lg backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100">
                <MousePointer2 className="h-3.5 w-3.5" />
                <span>Click left or right side</span>
              </div>
            </div>
          </Motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={goPrev}
          aria-label={`Previous ${title}`}
          className="absolute left-1/2 top-1/2 z-20 h-[420px] w-[170px] -translate-x-full -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        />
        <button
          type="button"
          onClick={goNext}
          aria-label={`Next ${title}`}
          className="absolute left-1/2 top-1/2 z-20 h-[420px] w-[170px] -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        />
      </div>
    </div>
  );
}

function SwipeCards() {
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
      <CardDeck cards={experienceCards} theme="original" title="Original Tarot" icon={Moon} />
      <CardDeck cards={majorArcanaCards} theme="tarot" title="Major Arcana" icon={Sparkles} />
    </div>
  );
}



export default function Home() {
  return (
    <div className="relative isolate bg-[#070b17] text-white">
      <CosmicBackground variant="hero" />
      <div className="relative z-10">
        <ReactFullpage
          licenseKey={"gplv3-license"}
          navigation={true}
          anchors={["home", "concept", "experience", "author"]}
          scrollingSpeed={1000}
          easingcss3="cubic-bezier(0.645, 0.045, 0.355, 1)"
          autoScrolling={true}
          fitToSection={true}
          fitToSectionDelay={150}
          scrollOverflow={false}
          navigationPosition="right"
          credits={{ enabled: false }}
          render={({ fullpageApi }) => {
            return (
              <ReactFullpage.Wrapper>
                <section className="section relative isolate overflow-hidden">

                  <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-24 md:px-10">
                    <div className="max-w-3xl">
                      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-fuchsia-300/20 bg-white/5 px-4 py-2 text-sm text-fuchsia-100 backdrop-blur-md">
                        <Star className="h-4 w-4" />
                        <span>AI × Witchcrafts</span>
                    </div>

                    <h1 className="text-5xl font-semibold leading-tight text-white md:text-7xl md:leading-[1.1]">
                      Daily Witchcrafts
                    </h1>

                    <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                      A quiet space where astrology, tarot, and daily notes meet.
                      It is a place to look back gently, read the symbols around you,
                      and gather the stories that feel worth keeping.
                    </p>

                    <div className="mt-10 flex flex-wrap items-center gap-4">
                      <Link
                        to="/home"
                        className="inline-flex items-center gap-2 rounded-full bg-fuchsia-300 px-6 py-3 text-sm font-medium text-slate-950 transition hover:scale-[1.02]"
                      >
                        <Compass className="h-4 w-4" />
                        Travel
                      </Link>
                      <button
                        type="button"
                        onClick={() => fullpageApi.moveTo("concept")}
                        className="rounded-full border border-white/15 px-6 py-3 text-sm text-slate-200 transition hover:bg-white/5"
                      >
                        Explore Concept
                      </button>
                    </div>
                  </div>
                  </div>
                </section>

                <section className="section">
                  <div className="mx-auto flex min-h-screen max-w-[88rem] flex-col justify-center px-6 py-24 md:px-10">
                  <SectionTitle
                    icon={<Sparkles className="h-4 w-4" />}
                    eyebrow="Concept"
                    title="AI & Witchcrafts"
                    description="A quiet space where astrology, tarot, and daily notes meet."
                  />

                  <div className="grid gap-5 md:grid-cols-3">
                    {[
                      {
                        title: "Diary",
                        text: "Hold on to the thoughts and moods that matter most.",
                      },
                      {
                        title: "Astrology",
                        text: "Read timing, patterns, and the shape of what comes next.",
                      },
                      {
                        title: "Tarot",
                        text: "Turn cards into small hints and clear directions.",
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md"
                      >
                        <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-slate-300">{item.text}</p>
                      </div>
                    ))}
                  </div>
                  </div>
                </section>

                <section className="section">
                  <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-24 md:px-10">
                  <SectionTitle
                    icon={<Moon className="h-4 w-4" />}
                    eyebrow="Experience"
                    title="Your Original Tarot"
                    description="A custom reading flow built around your own symbols and story. 
                    Click the left or right side of each card, or let it flip by itself."
                  />
                  <SwipeCards />
                  </div>
                </section>

                <section className="section">
                  <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-24 md:px-10">
                  <SectionTitle
                    icon={<Wand2 className="h-4 w-4" />}
                    eyebrow="Author"
                    title="MICKYLAN"
                    description="I love anime and reading, and I’m especially interested in Western astrology."
                  />

                  <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md md:p-8">
                    <div className="max-w-5xl">
                      <h3 className="text-2xl font-semibold text-white">Disclaimer(免責事項)</h3>
                      <p className="mt-4 text-sm leading-8 text-slate-300 md:text-base">
                        This site is created for personal reflection and entertainment. It is not intended to replace professional advice, diagnosis, or treatment.The content on this site is meant for reflection and enjoyment only, and should not be considered professional advice.

                        <br />
                        <br />
                        Astrology and tarot content on this site are provided for reflection and entertainment only, and are not a substitute for professional advice.
                      </p>

                      <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                          to="/about"
                          className="inline-flex items-center gap-2 rounded-full bg-fuchsia-300 px-4 py-2 text-sm font-medium text-slate-950 transition hover:scale-[1.02]"
                        >
                          AboutUs
                        </Link>
                      </div>
                    </div>
                  </div>
                  </div>
                </section>
              </ReactFullpage.Wrapper>
            );
          }}
        />
      </div>
    </div>
  );
}
