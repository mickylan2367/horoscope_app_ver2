import { useState } from "react";

export default function DiaryForm({ initialData, onSubmit, isEdit = false }) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [date, setDate] = useState(initialData?.date ?? "");
  const [content, setContent] = useState(initialData?.content ?? "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, date, content });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl"
    >
      <h2 className="mb-6 text-2xl font-semibold text-white">
        {isEdit ? "Edit Diary" : "Add Your Journal"}
      </h2>

      <div className="mb-4">
        <label className="mb-2 block text-sm text-slate-300">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white"
        />
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm text-slate-300">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white"
        />
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-sm text-slate-300">Content</label>
        <textarea
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white"
        />
      </div>

      <button
        type="submit"
        className="rounded-full bg-fuchsia-300 px-6 py-3 text-sm font-medium text-slate-950"
      >
        {isEdit ? "UPDATE" : "SAVE"}
      </button>
    </form>
  );
}