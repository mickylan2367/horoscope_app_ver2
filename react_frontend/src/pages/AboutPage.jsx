import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";
import me from "../assets/me.jpg";

const career = [
  {
    year: "2021~",
    en: "Programming and making things with code.",
    ja: "プログラミングを始め、コードで何かを作ることに向き合いはじめました。",
  },
  {
    year: "2023~",
    en: "Found AI and applied math very interesting, and started to learn them.",
    ja: "AIと応用数学に興味を持ち、学び始めました。",
  },
  {
    year: "Now",
    en: "Building Daily Witchcrafts as one connected world.",
    ja: "Daily Witchcrafts を誰もが安心して占いができる世界へ育てています。",
  },
];

function Background() {
  const stars = Array.from({ length: 16 }).map((_, i) => ({
    id: i,
    left: `${(i * 17) % 100}%`,
    top: `${(i * 23) % 100}%`,
    delay: (i % 5) * 0.45,
    duration: 3 + (i % 4),
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#070b17]">
      <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute text-white/70"
          style={{
            left: star.left,
            top: star.top,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="relative isolate min-h-screen bg-[#070b17] text-white">
      <Background />

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-5 sm:px-6 md:px-8 md:py-7">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white transition hover:bg-white/10"
          >
            Back to Home
          </Link>
        </div>

        <section className="mt-4 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-md sm:p-5 md:p-6">
          <div className="mx-auto max-w-5xl">
            <h1 className="text-xs font-medium uppercase tracking-[0.28em] text-fuchsia-100/80 md:text-sm">
              profile & contact
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-200">
              If you have any questions or would like to get in touch, please e-mail me at <a href="mailto:mickylan2367@gmail.com" className="text-fuchsia-400 hover:underline">
                mickylan2367@gmail.com
              </a>
            </p>

            <div className="mt-5 grid items-stretch gap-4 rounded-2xl border border-white/10 bg-black/10 p-4 shadow-xl backdrop-blur-md md:grid-cols-[128px_1fr] md:p-5">
              <Motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
                className="mx-auto h-36 w-full max-w-44 overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-fuchsia-400/40 to-indigo-400/30 p-[3px] shadow-[0_0_20px_rgba(168,85,247,0.35)] md:h-auto md:min-h-full md:max-w-none"
              >
                <img
                  src={me}
                  alt="profile"
                  className="h-full w-full rounded-[0.85rem] object-cover"
                />
              </Motion.div>

              <div>
                <h2 className="text-lg font-semibold text-white md:text-xl">MICKYLAN</h2>

                <div className="mt-3 space-y-3 text-sm leading-6 text-slate-200">
                  <div>
                    <p>
                      I love anime and reading, and I am especially passionate about Western astrology.
                    </p>
                    <p className="mt-1 text-sm leading-6 text-fuchsia-100/80">
                      アニメと読書、そして特に西洋占星術が大好き。
                    </p>
                  </div>

                  <div>
                    <p>I am still learning tarot, so I have a long way to go.</p>
                    <p className="mt-1 text-sm leading-6 text-fuchsia-100/80">
                      タロットはまだ勉強中です。
                    </p>
                  </div>

                  <div>
                    <p>
                      Even though AI, science, and astrology may seem different, I find it
                      fascinating that they all try to understand the future in their own way.
                    </p>
                    <p className="mt-1 text-sm leading-6 text-fuchsia-100/80">
                      AI、科学、占星術は一見ちがうものに見えますが、それぞれの方法で未来を理解しようとしているところがとても面白いとおもい制作しました。
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href="https://github.com/mickylan2367"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white transition hover:bg-white/10"
                  >
                    <ExternalLink className="h-4 w-4" />
                    GitHub
                  </a>
                  <a
                    href="https://qiita.com/mitzukan"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white transition hover:bg-white/10"
                  >
                    <Sparkles className="h-4 w-4" />
                    Qiita
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur-md md:p-5">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-fuchsia-200/80">
                <span>Motto</span>
              </div>
              <h2 className="mt-2 text-lg font-semibold text-white md:text-xl">THE SERENITY PRAYER</h2>
              <div className="mt-3 space-y-3 text-sm leading-6 text-slate-200">
                <p>
                  O God, give me the serenity to accept what cannot be changed,
                  <br />
                  変えられないものを受け入れる静けさを、私にお与えください。
                </p>
                <p>
                  courage to change what should be changed,
                  <br />
                  変えるべきものを変える勇気を、私にお与えください。
                </p>
                <p>
                  and wisdom to distinguish the one from the other.
                  <br />
                  その違いを見分ける知恵を、私にお与えください。
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-black/10 p-4 shadow-xl backdrop-blur-md md:p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-fuchsia-200/70">
                Career
              </p>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                {career.map((item) => (
                  <div key={item.year} className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs uppercase tracking-[0.28em] text-fuchsia-200/70">
                      {item.year}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-200">{item.en}</p>
                    <p className="mt-1 text-sm leading-6 text-fuchsia-100/80">{item.ja}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
