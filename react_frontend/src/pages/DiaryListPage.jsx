import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import Layout from "../components/Layout";
import CalendarCard from "../components/CalendarCard";
import DiaryCard from "../components/DiaryCard";
import DiaryEditorForm from "../components/DiaryEditorForm";
import { apiFetch } from "../api";

export default function DiaryListPage({ user, authReady }) {
  const [diaries, setDiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [calendarDate, setCalendarDate] = useState(() => new Date());
  const [selectedDiaryId, setSelectedDiaryId] = useState(null);
  const [notice, setNotice] = useState("");
  const diaryRefs = useRef({});

  const loadDiaries = ({ showLoading = false } = {}) => {
    if (showLoading) setLoading(true);
    return apiFetch("/api/diaries/")
      .then((data) => setDiaries(data))
      .catch((err) => setError(err.message || "Failed to load diaries."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    apiFetch("/api/diaries/")
      .then((data) => setDiaries(data))
      .catch((err) => setError(err.message || "Failed to load diaries."))
      .finally(() => setLoading(false));
  }, []);

  const diaryDates = useMemo(
    () => [...new Set(diaries.map((diary) => diary.date).filter(Boolean))],
    [diaries]
  );
  const selectedDiary = diaries.find((diary) => diary.id === selectedDiaryId);

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    const target = diaryRefs.current[date];
    if (!target) {
      setNotice("No diary entry for this date.");
      return;
    }

    setNotice("");
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleChangeMonth = (offset) => {
    setNotice("");
    setCalendarDate((current) => {
      const next = new Date(current);
      next.setMonth(current.getMonth() + offset, 1);
      return next;
    });
  };

  const closeEditor = () => setSelectedDiaryId(null);

  const handleSaved = (savedDiary) => {
    setSelectedDiaryId(null);
    if (savedDiary?.date) setSelectedDate(savedDiary.date);
    loadDiaries({ showLoading: true });
  };

  useEffect(() => {
    if (!selectedDiaryId) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeEditor();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedDiaryId]);

  return (
    <Layout user={user} wide={Boolean(selectedDiaryId)}>
      <div className={`grid gap-6 ${selectedDiaryId ? "lg:grid-cols-[220px_minmax(0,440px)_minmax(560px,1fr)]" : "lg:grid-cols-[260px_minmax(0,1fr)]"}`}>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <CalendarCard
            diaryDates={diaryDates}
            selectedDate={selectedDate}
            displayDate={calendarDate}
            onChangeMonth={handleChangeMonth}
            onSelectDate={handleSelectDate}
          />
        </aside>

        <section className={`space-y-5 ${selectedDiaryId ? "lg:max-w-[440px] lg:justify-self-start" : ""}`}>
          <div className="rounded-2xl border border-[#d6edf8] bg-[#dff4ff] p-4 text-center shadow-sm">
            <Link className="font-semibold text-[#5c3a3a]" to="/diary/new">
              +ADD
            </Link>
          </div>


          {!authReady || loading ? <p className="text-[#8b6870]">Loading...</p> : null}
          {error ? <p className="rounded-2xl bg-white p-4 text-[#a8465d]">{error}</p> : null}
          {notice ? <p className="rounded-2xl bg-white p-4 text-[#8b6870]">{notice}</p> : null}

          {!loading && !error && diaries.length > 0
            ? diaries.map((diary) => (
                <DiaryCard
                  key={diary.id}
                  diary={diary}
                  isActive={selectedDate === diary.date || selectedDiaryId === diary.id}
                  onOpenEdit={(diaryId) => setSelectedDiaryId(diaryId)}
                  cardRef={(element) => {
                    if (element) diaryRefs.current[diary.date] = element;
                  }}
                />
              ))
            : null}

          {!loading && !error && diaries.length === 0 ? (
            <div className="rounded-2xl border border-[#f1cbd3] bg-white p-6 text-center text-[#8b6870] shadow-sm">
              No diary entries yet.
            </div>
          ) : null}

        </section>

        {selectedDiaryId ? (
          <aside className="fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto bg-[#fbeff2] p-4 shadow-2xl lg:sticky lg:top-24 lg:z-auto lg:max-h-[calc(100vh-7rem)] lg:w-full lg:max-w-none lg:justify-self-stretch lg:overflow-y-auto lg:bg-transparent lg:p-0 lg:shadow-none">
            <div className="mb-3 flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8b6870]">Edit Diary</p>
                <h2 className="text-lg font-bold text-[#5c3a3a]">{selectedDiary?.date ?? "Loading..."}</h2>
              </div>
              <button
                type="button"
                onClick={closeEditor}
                aria-label="Close editor"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#f1cbd3] text-[#5c3a3a] hover:bg-[#fff4f7]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <DiaryEditorForm
              diaryId={selectedDiaryId}
              isEdit
              compact
              onCancel={closeEditor}
              onSaved={handleSaved}
            />
          </aside>
        ) : null}
      </div>
    </Layout>
  );
}
