import { Link } from "react-router-dom";
import { BookOpen, Sparkles } from "lucide-react";
import Layout from "../components/Layout";
import CosmicPanel from "../components/CosmicPanel";

export default function DailyWitchcraftsHome({ user }) {
  return (
    <Layout user={user} spellEffects compactHeader backgroundVariant="soft">
      <CosmicPanel as="section" tone="panel" className="relative overflow-hidden px-8 py-16 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold tracking-[0.18em] uppercase text-white shadow-[0_0_22px_rgba(0,0,0,0.2)] backdrop-blur-md">
            <Sparkles className="h-4 w-4" />
            <span>welcome</span>
          </div>

          <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
            Daily Witchcrafts
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-slate-200 md:text-base">
            Choose where to go next. Open your diary archive or step into the Akashic
            Record for chart reading and star guidance.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <Link
              to="/diary"
              className="group flex h-full flex-col rounded-[2rem] border border-white/14 bg-white/10 px-6 py-6 text-left text-white shadow-[0_16px_52px_rgba(0,0,0,0.14)] transition hover:-translate-y-1 hover:bg-white/14"
            >
              <div className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.18em] uppercase text-slate-100">
                <BookOpen className="h-4 w-4" />
                <span>LovelyWitch Life</span>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-white">Open your entries</h2>
              <p className="mt-3 text-sm leading-7 text-slate-200">
                Review your saved notes, edit past records, and continue writing from
                the archive.
              </p>
            </Link>
            <Link
              to="/bookdesign"
              className="group flex h-full flex-col rounded-[2rem] border border-white/14 bg-white/10 px-6 py-6 text-left text-white shadow-[0_16px_52px_rgba(0,0,0,0.14)] transition hover:-translate-y-1 hover:bg-white/14"
            >
              <div className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.18em] uppercase text-slate-100">
                <Sparkles className="h-4 w-4" />
                <span>Akashic Record</span>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-white">Open chart reading</h2>
              <p className="mt-3 text-sm leading-7 text-slate-200">
                Step into the chart book to calculate and read your horoscope in the
                BookDesign interface.
              </p>
            </Link>
          </div>
        </div>
      </CosmicPanel>
    </Layout>
  );
}
