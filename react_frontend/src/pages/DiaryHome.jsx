import { Link } from "react-router-dom";
import { BookOpen, PenSquare, Sparkles } from "lucide-react";
import Layout from "../components/Layout";

export default function DiaryHome({ user }) {
  return (
    <Layout user={user}>
      <section className="relative overflow-hidden rounded-2xl bg-white px-8 py-16 text-center shadow-sm">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#f8e1e7] px-4 py-2 text-sm font-semibold tracking-[0.18em] text-[#5c3a3a] uppercase">
            <Sparkles className="h-4 w-4" />
            <span>Diary Space</span>
          </div>

          <h1 className="text-4xl font-bold leading-tight text-[#5c3a3a] md:text-6xl">
            Welcome to
            <br />
            LovelyWitch Diary
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-[#8b6870] md:text-base">
            Record your magical daily life. Write your thoughts, keep your memories,
            and look back on them like little spells scattered through time.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/diary/new"
              className="inline-flex items-center gap-2 rounded-full bg-[#f4c2c2] px-6 py-3 text-sm font-semibold text-[#5c3a3a] transition hover:bg-[#e8b0b0]"
            >
              <PenSquare className="h-4 w-4" />
              Write a New Entry
            </Link>
            <Link
              to="/diary"
              className="inline-flex items-center gap-2 rounded-full border border-[#e8b0b0] bg-white px-6 py-3 text-sm text-[#5c3a3a] transition hover:bg-[#fff4f7]"
            >
              <BookOpen className="h-4 w-4" />
              View Records
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
