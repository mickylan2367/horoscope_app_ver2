import { useMemo } from "react";

const seededRandom = (seed) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

export default function HoroscopeLanding() {
    const stars = useMemo(() => {
        return Array.from({ length: 140 }, (_, i) => {
            const size = seededRandom(i + 1) * 4 + 1.5; // 1.5px ~ 5.5px
            return {
                id: i,
                size,
                top: `${seededRandom(i + 201) * 100}%`,
                left: `${seededRandom(i + 401) * 100}%`,
                opacity: seededRandom(i + 601) * 0.6 + 0.2,
                duration: `${seededRandom(i + 801) * 4 + 3}s`,
                delay: `${seededRandom(i + 1001) * 5}s`,
                blur: seededRandom(i + 1201) > 0.7 ? "0 0 12px rgba(255,255,255,0.95), 0 0 24px rgba(255,255,255,0.75), 0 0 42px rgba(168,85,247,0.45)" : "0 0 8px rgba(255,255,255,0.95), 0 0 16px rgba(255,255,255,0.65)",
            };
        });
    }, []);
    const sparks = useMemo(() => {
        return Array.from({ length: 18 }, (_, i) => ({
            id: i,
            top: `${seededRandom(i + 1401) * 100}%`,
            left: `${seededRandom(i + 1601) * 100}%`,
            animation: `floatSpark ${seededRandom(i + 1801) * 10 + 10}s linear infinite`,
            animationDelay: `${seededRandom(i + 2001) * 8}s`,
        }));
    }, []);

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#070b17] text-slate-100">
            {/* 背景全体 */}
            <div className="pointer-events-none absolute inset-0">
                {/* ベースの宇宙グラデーション */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(244,114,182,0.20),transparent_30%),radial-gradient(circle_at_85%_18%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.18),transparent_35%),radial-gradient(circle_at_50%_85%,rgba(59,130,246,0.16),transparent_30%)]" />

                {/* ふんわりした大きな光 */}
                <div className="absolute left-[-10%] top-[8%] h-[340px] w-[340px] rounded-full bg-fuchsia-500/20 blur-3xl" />
                <div className="absolute right-[-8%] top-[12%] h-[300px] w-[300px] rounded-full bg-cyan-400/20 blur-3xl" />
                <div className="absolute left-[25%] top-[38%] h-[280px] w-[280px] rounded-full bg-violet-500/20 blur-3xl" />
                <div className="absolute right-[18%] bottom-[8%] h-[260px] w-[260px] rounded-full bg-sky-400/15 blur-3xl" />

                {/* 星 */}
                {stars.map((star) => (
                    <span
                        key={star.id}
                        className="absolute rounded-full bg-white"
                        style={{
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            top: star.top,
                            left: star.left,
                            opacity: star.opacity,
                            boxShadow: star.blur,
                            animation: `twinkle ${star.duration} ease-in-out infinite`,
                            animationDelay: star.delay,
                        }}
                    />
                ))}

                {/* 流れ星 */}
                {Array.from({ length: 4 }).map((_, i) => (
                    <span
                        key={`shooting-star-${i}`}
                        className="shooting-star absolute"
                        style={{
                            top: `${12 + i * 18}%`,
                            left: `${-20 + i * 6}%`,
                            animationDelay: `${i * 3.5}s`,
                            animationDuration: `${10 + i * 1.5}s`,
                        }}
                    />
                ))}

                {/* きらっと流れる粒 */}
                {sparks.map((spark) => (
                    <span
                        key={`spark-${spark.id}`}
                        className="absolute h-[2px] w-[2px] rounded-full bg-white"
                        style={{
                            top: spark.top,
                            left: spark.left,
                            boxShadow:
                                "0 0 10px rgba(255,255,255,0.9), 0 0 24px rgba(255,255,255,0.6), 0 0 40px rgba(99,102,241,0.35)",
                            animation: spark.animation,
                            animationDelay: spark.animationDelay,
                        }}
                    />
                ))}

                {/* 薄いノイズ感 */}
                <div className="absolute inset-0 opacity-[0.10] bg-[radial-gradient(rgba(255,255,255,0.8)_0.6px,transparent_0.6px)] [background-size:22px_22px]" />
            </div>

            {/* アニメーション定義 */}
            <style>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.25;
            transform: scale(0.85);
          }
          25% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.6);
          }
          75% {
            opacity: 0.55;
            transform: scale(1.05);
          }
        }

        .shooting-star {
  width: 140px;
  height: 2px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.95),
    rgba(255, 255, 255, 0)
  );
  border-radius: 9999px;
  opacity: 0;
  filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.9))
          drop-shadow(0 0 18px rgba(255, 255, 255, 0.6))
          drop-shadow(0 0 28px rgba(168, 85, 247, 0.45));
  transform: rotate(-25deg) translate3d(0, 0, 0);
  animation-name: shooting;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

.shooting-star::before {
  content: "";
  position: absolute;
  right: 0;
  top: 50%;
  width: 10px;
  height: 10px;
  background: white;
  border-radius: 9999px;
  transform: translateY(-50%);
  box-shadow:
    0 0 10px rgba(255, 255, 255, 1),
    0 0 20px rgba(255, 255, 255, 0.8),
    0 0 34px rgba(125, 211, 252, 0.6);
}

@keyframes shooting {
  0% {
    opacity: 0;
    transform: rotate(-25deg) translate3d(0, 0, 0) scale(0.85);
  }
  8% {
    opacity: 1;
  }
  30% {
    opacity: 1;
    transform: rotate(-25deg) translate3d(420px, 180px, 0) scale(1);
  }
  100% {
    opacity: 0;
    transform: rotate(-25deg) translate3d(700px, 300px, 0) scale(0.92);
  }
}

        @keyframes floatSpark {
          0% {
            transform: translate3d(0, 0, 0) scale(0.8);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          50% {
            transform: translate3d(40px, -30px, 0) scale(1.2);
            opacity: 1;
          }
          100% {
            transform: translate3d(90px, -80px, 0) scale(0.7);
            opacity: 0;
          }
        }
      `}</style>

            {/* コンテンツ */}
            <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-10 md:px-10">
                <header className="relative z-10 flex items-center justify-between py-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-fuchsia-200/80">
                            Akashic Reading
                        </p>
                        <h1 className="mt-2 text-2xl font-semibold md:text-3xl">
                            星と記憶のリーディング
                        </h1>
                    </div>

                    <button className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm backdrop-blur-md transition hover:bg-white/15">
                        Sign In
                    </button>
                </header>

                <main className="relative z-10 grid flex-1 items-center gap-10 py-8 md:grid-cols-[1.1fr_0.9fr] md:py-16">
                    <section>
                        <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-200/20 bg-white/10 px-4 py-2 text-sm text-fuchsia-100/90 backdrop-blur-md">
                            <span className="h-2 w-2 rounded-full bg-fuchsia-300 shadow-[0_0_12px_rgba(244,114,182,0.9)]" />
                            Birth Chart / Heliocentric / Sabian
                        </div>

                        <h2 className="mt-6 max-w-2xl text-4xl font-semibold leading-tight md:text-6xl">
                            あなたの人生を、
                            <span className="bg-gradient-to-r from-fuchsia-200 via-violet-200 to-cyan-100 bg-clip-text text-transparent">
                                静かな魔導書
                            </span>
                            のようにひらく。
                        </h2>

                        <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 md:text-lg">
                            生年月日と出生地から、あなたの本質や才能、人生の流れをやさしく読み解く占星術アプリ。
                            幻想的な世界観の中で、結果をページをめくるように体験できます。
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <button className="rounded-2xl bg-gradient-to-r from-fuchsia-400/90 to-violet-400/90 px-6 py-3 text-sm font-medium text-slate-950 shadow-2xl shadow-fuchsia-900/30 transition hover:-translate-y-0.5">
                                リーディングを始める
                            </button>
                            <button className="rounded-2xl border border-white/15 bg-white/10 px-6 py-3 text-sm font-medium backdrop-blur-md transition hover:bg-white/15">
                                デモを見る
                            </button>
                        </div>
                    </section>

                    <section className="relative">
                        <div className="mx-auto max-w-md rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
                            <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(22,26,48,0.90),rgba(34,25,56,0.92))] p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.3em] text-cyan-100/70">
                                            Reading Book
                                        </p>
                                        <h3 className="mt-2 text-xl font-medium">Akashic Record</h3>
                                    </div>

                                    <div className="rounded-full border border-fuchsia-200/20 bg-fuchsia-300/10 px-3 py-1 text-xs text-fuchsia-100">
                                        page 01
                                    </div>
                                </div>

                                <div className="mt-6 rounded-[1.25rem] border border-white/8 bg-white/5 p-5">
                                    <p className="text-sm leading-7 text-slate-300">
                                        あなたの星は、静かに深い場所で光っています。表には見えにくくても、内側には確かな意志と、
                                        世界を読み取るための感受性があります。
                                    </p>
                                </div>

                                <div className="mt-5 flex items-center justify-between text-sm text-slate-300">
                                    <span>Geocentric / Heliocentric</span>
                                    <span className="text-fuchsia-100">Open the next page →</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
