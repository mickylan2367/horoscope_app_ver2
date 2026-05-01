import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import * as FullpageModule from "@fullpage/react-fullpage";
import logo2 from "./assets/logo2.jpg";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Moon,
  Sparkles,
  Compass,
  ChevronLeft,
  ChevronRight,
  User,
  Wand2,
} from "lucide-react";

const ReactFullpage =
  FullpageModule?.default?.default ??
  FullpageModule?.default ??
  FullpageModule;

const experienceCards = [
  {
    id: 1,
    title: "今日の記憶をひらく",
    subtitle: "Diary × Tarot",
    text: "その日にあった出来事や気持ちを、1枚のカードに重ねて見つめなおす。日記をただ保存するだけではなく、感情の輪郭をやさしくすくいあげます。",
  },
  {
    id: 2,
    title: "星の流れを読む",
    subtitle: "Astrology",
    text: "日々の気分や出来事を、占星術の視点からそっと見直すための入り口。あなたの時間と感情の流れを、静かに読み解いていきます。",
  },
  {
    id: 3,
    title: "物語として残す",
    subtitle: "Your Archive",
    text: "カードをめくるように記録をたどりながら、あなた自身の歩みをひとつの物語として残していく。占い体験と記録体験が自然につながります。",
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

function GlowBackground() {
  const stars = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        left: `${(i * 13) % 100}%`,
        top: `${(i * 19) % 100}%`,
        delay: (i % 6) * 0.5,
        duration: 2.8 + (i % 5),
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

      {stars.map((star) => (
        <Motion.div
          key={star.id}
          className="absolute"
          style={{ left: star.left, top: star.top }}
          animate={{
            opacity: [0.25, 0.95, 0.25],
            scale: [0.8, 1.15, 0.8],
            y: [0, -8, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: star.duration,
            delay: star.delay,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="h-4 w-4 text-white/70" />
        </Motion.div>
      ))}
    </div>
  );
}

function SwipeCards() {
  const [index, setIndex] = useState(0);

  const goPrev = () =>
    setIndex((prev) => (prev - 1 + experienceCards.length) % experienceCards.length);
  const goNext = () =>
    setIndex((prev) => (prev + 1) % experienceCards.length);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
      <div className="relative mx-auto flex min-h-[420px] w-full max-w-md items-center justify-center">
        <div className="absolute h-[310px] w-[220px] -translate-x-5 translate-y-4 rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm" />
        <div className="absolute h-[310px] w-[220px] translate-x-5 -translate-y-4 rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm" />

        <AnimatePresence mode="wait">
          <Motion.div
            key={experienceCards[index].id}
            initial={{ opacity: 0, y: 20, rotate: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, rotate: 4, scale: 0.95 }}
            transition={{ duration: 0.35 }}
            className="relative z-10 h-[340px] w-[240px] rounded-[2rem] border border-fuchsia-200/20 bg-gradient-to-b from-[#23152f] via-[#15162a] to-[#0d1020] p-6 shadow-[0_20px_80px_rgba(168,85,247,0.25)]"
          >
            <div className="flex h-full flex-col justify-between">
              <div>
                <div className="mb-5 flex items-center justify-between text-fuchsia-200/80">
                  <Moon className="h-5 w-5" />
                  <span className="text-xs uppercase tracking-[0.3em]">Arcana</span>
                </div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                  {experienceCards[index].subtitle}
                </p>
                <h3 className="mt-3 text-2xl font-semibold leading-tight text-white">
                  {experienceCards[index].title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {experienceCards[index].text}
                </p>
              </div>

              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{String(experienceCards.length).padStart(2, "0")}</span>
              </div>
            </div>
          </Motion.div>
        </AnimatePresence>
      </div>

      <div>
        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={goPrev}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10"
            aria-label="前のカード"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goNext}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10"
            aria-label="次のカード"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 flex gap-2">
          {experienceCards.map((card, i) => (
            <button
              key={card.id}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${i === index ? "w-10 bg-fuchsia-300" : "w-2 bg-white/30"
                }`}
              aria-label={`カード${i + 1}へ`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}



export default function Home() {
  return (
    <div className="bg-[#070b17] text-white">
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
                <GlowBackground />

                <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-24 md:px-10">
                  <div className="max-w-3xl">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-fuchsia-300/20 bg-white/5 px-4 py-2 text-sm text-fuchsia-100 backdrop-blur-md">
                      <Star className="h-4 w-4" />
                      <span>AI × Witchcrafts</span>
                    </div>

                    <h1 className="text-5xl font-semibold leading-tight text-white md:text-7xl md:leading-[1.1]">
                      Daily WitchCrafts
                    </h1>

                    <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                      日々の出来事や感情を、占星術とタロットの視点で静かに見つめなおすための場所。記録することと、読み解くことを、ひとつの体験にまとめた占いサイトです。
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
                        コンセプトを見る
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <section className="section">
                <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-24 md:px-10">
                  <SectionTitle
                    icon={<Sparkles className="h-4 w-4" />}
                    eyebrow="Concept"
                    title="AI × Witchcrafts"
                    description="あなたの写真がタロットに。幸せな記憶をさかのぼって、未来を読みます。
                    ホロスコープと日記を結び付けてあなたの星をたどる魔女見習い必須アイテム"
                  />

                  <div className="grid gap-5 md:grid-cols-3">
                    {[
                      {
                        title: "Diary",
                        text: "その日の出来事や気持ちを記録して、自分だけの時間の流れを残す。",
                      },
                      {
                        title: "Astrology",
                        text: "星の配置や流れをヒントに、心や出来事の背景を見つめる。",
                      },
                      {
                        title: "Tarot",
                        text: "カードの象徴を通して、記憶や感情に新しい解釈を与える。",
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
                <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-24 md:px-10">
                  <SectionTitle
                    icon={<Moon className="h-4 w-4" />}
                    eyebrow="Experience"
                    title="Your Original Tarot"
                    description="未来を占いながら、タロットに描かれた過去の思い出したい楽しい記憶が蘇ります。自由にあなただけのタロットやオラクルカードを作りましょう"
                  />
                  <SwipeCards />
                </div>
              </section>

              <section className="section">
                <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-24 md:px-10">
                  <SectionTitle
                    icon={<Wand2 className="h-4 w-4" />}
                    eyebrow="Author"
                    title="MICKYLAN"
                    description="しがないエンジニア、ときどき魔女"
                  />

                  <div className="grid gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md md:grid-cols-[180px_1fr] md:p-8">
                   <Motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="h-28 w-28 rounded-full p-[3px] 
                bg-gradient-to-br from-fuchsia-400 to-indigo-400
                shadow-[0_0_20px_rgba(168,85,247,0.6)]"
                      >
                      <img
                        src={logo2}
                        alt="me"
                        className="h-full w-full rounded-full object-cover"
                      />
                  </Motion.div>

                    <div>
                      <h3 className="text-2xl font-semibold text-white">MICKYLAN</h3>
                      <p className="mt-4 text-sm leading-8 text-slate-300 md:text-base">
                        I love anime and reading, and I’m especially passionate about Western astrology.
                        I’m still learning tarot, so I have a long way to go!

                        My strengths are astrology and English.
                        Even though AI, science, and astrology may seem different,
                        I find it fascinating that they all try to understand the future in their own way.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </div>
  );
}
