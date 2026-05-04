import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import CosmicBackground from "../components/CosmicBackground";
import CalendarCard from "../components/CalendarCard";
import DiaryCard from "../components/DiaryCard";
import DiaryEditorForm from "../components/DiaryEditorForm";
import { apiFetch } from "../api";

const seededRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export default function DiaryBookPage({
  authReady = true,
  diaryId = null,
  isEdit = false,
  forceEditor = false,
  initialPageIndex = 0,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedDateFromState = location.state?.selectedDate ?? "";
  const [diaries, setDiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [selectedDate, setSelectedDate] = useState(selectedDateFromState);
  const [calendarDate, setCalendarDate] = useState(() => {
    if (!selectedDateFromState) return new Date();
    const parsed = new Date(`${selectedDateFromState}T00:00:00`);
    return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
  });
  const [pageIndex, setPageIndex] = useState(() => {
    if (forceEditor || diaryId || isEdit) return 2;
    return initialPageIndex;
  });
  const [pageTransition, setPageTransition] = useState(null);
  const [editorTransition, setEditorTransition] = useState(null);
  const listScrollRef = useRef(null);
  const editorTransitionTimerRef = useRef(null);

  const starStyles = useMemo(
    () =>
      Array.from({ length: 110 }, (_, i) => {
        const size = seededRandom(i + 1) * 3.5 + 1.2;
        return {
          width: `${size}px`,
          height: `${size}px`,
          top: `${seededRandom(i + 201) * 100}%`,
          left: `${seededRandom(i + 401) * 100}%`,
          opacity: seededRandom(i + 601) * 0.7 + 0.2,
          boxShadow:
            "0 0 8px rgba(255,255,255,0.95), 0 0 18px rgba(180,210,255,0.55), 0 0 28px rgba(181,120,255,0.25)",
          animationDuration: `${seededRandom(i + 801) * 4 + 3}s`,
          animationDelay: `${seededRandom(i + 1001) * 4}s`,
        };
      }),
    [],
  );

  useEffect(() => {
    apiFetch("/api/diaries/")
      .then((data) => setDiaries(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message || "Failed to load diaries."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (pageIndex !== 1 || !listScrollRef.current) return;
    listScrollRef.current.scrollTo({ top: 0, behavior: "auto" });
  }, [pageIndex, selectedDate]);

  useEffect(() => {
    if (!pageTransition || pageIndex !== pageTransition.targetPageIndex) return undefined;

    const timeoutId = window.setTimeout(() => {
      navigate(pageTransition.route, pageTransition.state);
      setPageTransition(null);
    }, 520);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [navigate, pageIndex, pageTransition]);

  useEffect(() => {
    if (!editorTransition || pageIndex !== 2) return undefined;
    editorTransitionTimerRef.current = window.setTimeout(() => {
      navigate(editorTransition.route, selectedDate ? { state: { selectedDate } } : undefined);
    }, 520);

    return () => {
      if (editorTransitionTimerRef.current) {
        window.clearTimeout(editorTransitionTimerRef.current);
        editorTransitionTimerRef.current = null;
      }
    };
  }, [editorTransition, navigate, pageIndex, selectedDate]);

  const diaryDates = useMemo(
    () => [...new Set(diaries.map((diary) => diary.date).filter(Boolean))],
    [diaries],
  );

  const sortedDiaries = useMemo(() => {
    if (!selectedDate) return diaries;
    const selected = diaries.filter((diary) => diary.date === selectedDate);
    const remaining = diaries.filter((diary) => diary.date !== selectedDate);
    return [...selected, ...remaining];
  }, [diaries, selectedDate]);

  const activeEditorDiaryId = editorTransition?.diaryId ?? diaryId;
  const selectedDiary = diaries.find((diary) => String(diary.id) === String(activeEditorDiaryId));
  const editorTitle = isEdit ? "Edit Diary" : "Add Your Journal";
  const editorFormId = "diary-editor-form";

  const goToBookIntro = () => {
    navigate("/chart/warp", {
      state: {
        source: "diary",
        target: "/bookdesign",
        targetState: { page: 1 },
      },
    });
  };

  const handleBackToList = () => {
    setPageTransition({
      route: "/diary/list",
      targetPageIndex: 1,
      state: selectedDate ? { selectedDate } : undefined,
    });
    setPageIndex(1);
  };

  const handleBackToCalendar = () => {
    setPageTransition({
      route: "/diary",
      targetPageIndex: 0,
      state: undefined,
    });
    setPageIndex(0);
  };

  const goToNextPage = () => {
    setPageTransition({
      route: "/diary/list",
      targetPageIndex: 1,
      state: selectedDate ? { selectedDate } : undefined,
    });
    setPageIndex(1);
  };

  const goToEditor = (targetRoute, targetDiaryId = null) => {
    if (editorTransitionTimerRef.current) {
      window.clearTimeout(editorTransitionTimerRef.current);
      editorTransitionTimerRef.current = null;
    }
    setEditorTransition({ route: targetRoute, diaryId: targetDiaryId });
    setPageIndex(2);
  };

  const handleSelectDate = (date) => {
    setNotice("");
    setSelectedDate(date);
    setPageTransition({
      route: "/diary/list",
      targetPageIndex: 1,
      state: { selectedDate: date },
    });
    setPageIndex(1);
  };

  const handleChangeMonth = (offset) => {
    setNotice("");
    setCalendarDate((current) => {
      const next = new Date(current);
      next.setMonth(current.getMonth() + offset, 1);
      return next;
    });
  };

  const handleSaved = (savedDiary) => {
    const nextDate = savedDiary?.date || selectedDate || "";
    if (nextDate) {
      navigate("/diary/list", { state: { selectedDate: nextDate } });
      return;
    }
    navigate("/diary/list");
  };

  const handleCardOpen = (targetDiaryId) => {
    goToEditor(`/diary/${targetDiaryId}/edit`, targetDiaryId);
  };

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#070b17] text-white">
      <CosmicBackground variant="hero" animated />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(196,136,255,0.16),transparent_26%),radial-gradient(circle_at_82%_16%,rgba(126,214,255,0.14),transparent_24%),radial-gradient(circle_at_50%_80%,rgba(117,138,255,0.12),transparent_28%),linear-gradient(180deg,rgba(7,11,23,0.1),rgba(7,11,23,0.88))]" />

      <div className="star-layer" aria-hidden="true">
        {starStyles.map((style, i) => (
          <span key={i} className="star" style={style} />
        ))}

        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={`shooting-${i}`}
            className="shooting-star"
            style={{
              top: `${12 + i * 18}%`,
              left: `${-20 + i * 4}%`,
              animationDelay: `${i * 3.5}s`,
              animationDuration: `${10 + i * 1.2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-6 md:px-6">
        <div className="diary-book-shell">
          <div className="diary-book-spine" />
          <div className="diary-book-page-stack">
            <AnimatePresence mode="wait" initial={false}>
              {pageIndex === 0 ? (
                <Motion.section
                  key="calendar"
                  initial={{ opacity: 0, x: -40, rotateY: 8 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: 36, rotateY: -8 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="diary-page diary-page-calendar"
                >
                  <div className="diary-page-inner">
                    <div className="diary-page-topbar">
                      <div>
                        <h2 className="reading-title">CALENDAR</h2>
                        <p className="reading-subtitle">Diary / Calendar</p>
                      </div>
                    </div>

                    <div className="diary-sheet diary-sheet-calendar">
                      <CalendarCard
                        diaryDates={diaryDates}
                        selectedDate={selectedDate}
                        displayDate={calendarDate}
                        onChangeMonth={handleChangeMonth}
                        onSelectDate={handleSelectDate}
                      />
                    </div>

                    <div className="diary-page-nav diary-page-nav-calendar">
                      <button type="button" className="diary-nav-button" onClick={goToBookIntro}>
                        <ArrowLeft className="h-4 w-4" />
                      </button>
                      <button type="button" className="diary-nav-button" onClick={goToNextPage}>
                        <span>LIST</span>
                        <ArrowLeft className="h-4 w-4 rotate-180" />
                      </button>
                    </div>
                  </div>
                </Motion.section>
              ) : null}

              {pageIndex === 1 ? (
                <Motion.section
                  key="list"
                  initial={{ opacity: 0, x: 40, rotateY: -8 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: -36, rotateY: 8 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="diary-page diary-page-list"
                >
                  <div className="diary-page-inner">
                    <div className="diary-page-topbar">
                      <div>
                        <h2 className="reading-title">
                          {selectedDate || "All entries"}
                        </h2>
                        <p className="reading-subtitle">Diary / Entries</p>
                        <p className="diary-page-caption">
                          {selectedDate
                            ? `Showing the selected day first: ${selectedDate}`
                          : "Browse your archive and open any card to edit it."}
                        </p>
                      </div>
                    </div>

                    <div className="diary-sheet diary-sheet-list">
                      <div ref={listScrollRef} className="diary-list-scroll">
                        {loading || !authReady ? (
                          <p className="diary-muted">Loading...</p>
                        ) : null}
                        {error ? <p className="diary-error">{error}</p> : null}
                        {notice ? <p className="diary-notice">{notice}</p> : null}

                        {!loading && !error && sortedDiaries.length > 0
                          ? sortedDiaries.map((diary) => (
                              <DiaryCard
                                key={diary.id}
                                diary={diary}
                                isActive={selectedDate === diary.date}
                                onOpenEdit={handleCardOpen}
                              />
                            ))
                          : null}

                        {!loading && !error && sortedDiaries.length === 0 ? (
                          <div className="diary-empty">
                            No diary entries yet.
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="diary-page-nav diary-page-nav-list">
                      <button type="button" className="diary-nav-button" onClick={handleBackToCalendar}>
                        <ArrowLeft className="h-4 w-4" />
                      </button>
                      <button type="button" className="diary-add-button" onClick={() => goToEditor("/diary/new")}>
                        <span>+ADD</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </Motion.section>
              ) : null}

              {pageIndex === 2 ? (
                <Motion.section
                  key="editor"
                  initial={{ opacity: 0, x: 44, rotateY: -12 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: -30, rotateY: 10 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="diary-page diary-page-editor"
                >
                  <div className="diary-page-inner">
                    <div className="diary-page-topbar">
                      <div>
                        <h2 className="reading-title">
                          {selectedDiary?.date ?? editorTitle}
                        </h2>
                        <p className="reading-subtitle">Diary / Edit</p>
                      </div>
                    </div>

                    <div className="diary-sheet diary-sheet-editor">
                      <DiaryEditorForm
                        formId={editorFormId}
                        diaryId={activeEditorDiaryId}
                        isEdit={Boolean(activeEditorDiaryId) || isEdit}
                        compact
                        onSaved={handleSaved}
                      />
                    </div>

                    <div className="diary-page-nav diary-page-nav-editor">
                      <button type="button" className="diary-nav-button" onClick={handleBackToList}>
                        <ArrowLeft className="h-4 w-4" />
                        <span>LIST</span>
                      </button>
                      <button type="submit" form={editorFormId} className="diary-add-button">
                        <span>{isEdit || activeEditorDiaryId ? "UPDATE" : "SAVE"}</span>
                        <Save className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </Motion.section>
              ) : null}
            </AnimatePresence>
          </div>

          <div className="diary-book-glow" />
        </div>
      </div>

      <style>{`
        .diary-book-shell {
          position: relative;
          width: min(760px, calc(100vw - 28px));
          min-height: min(90vh, 900px);
          perspective: 1600px;
        }

        .diary-book-spine {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 34px;
          border-radius: 8px;
          background:
            radial-gradient(circle at 10% 10%, #ffffff 1px, transparent 2px),
            radial-gradient(circle at 25% 25%, #aeefff 1.5px, transparent 3px),
            radial-gradient(circle at 40% 15%, #ffd6ff 2px, transparent 4px),
            radial-gradient(circle at 60% 30%, #ffffff 1px, transparent 2px),
            radial-gradient(circle at 80% 20%, #c8b6ff 1.5px, transparent 3px),
            radial-gradient(circle at 15% 60%, #ffffff 2px, transparent 4px),
            radial-gradient(circle at 35% 75%, #aeefff 1px, transparent 2px),
            radial-gradient(circle at 55% 85%, #ffd6ff 1.5px, transparent 3px),
            radial-gradient(circle at 75% 70%, #ffffff 2px, transparent 4px),
            radial-gradient(circle at 90% 50%, #c8b6ff 1px, transparent 2px),
            linear-gradient(to bottom, rgba(120,150,255,0.42), rgba(180,120,255,0.62));
          box-shadow:
            0 0 12px rgba(140, 160, 255, 0.55),
            inset 0 0 6px rgba(255,255,255,0.2);
          animation: spineSparkle 3s ease-in-out infinite alternate;
          z-index: 2;
        }

        .diary-book-spine::after {
          content: "";
          position: absolute;
          left: 27px;
          top: 0;
          bottom: 0;
          width: 10px;
          background: linear-gradient(to right, rgba(0,0,0,0.22), rgba(255,255,255,0.10));
        }

        .diary-book-page-stack {
          position: relative;
          min-height: min(90vh, 900px);
          padding-left: 34px;
        }

        .star-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .star {
          position: absolute;
          border-radius: 999px;
          background: white;
          animation: twinkle ease-in-out infinite;
        }

        .shooting-star {
          position: absolute;
          width: 150px;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0),
            rgba(255,255,255,0.95),
            rgba(255,255,255,0)
          );
          opacity: 0;
          transform: rotate(-26deg);
          filter:
            drop-shadow(0 0 6px rgba(255,255,255,0.95))
            drop-shadow(0 0 16px rgba(197, 225, 255, 0.65))
            drop-shadow(0 0 26px rgba(184, 128, 255, 0.40));
          animation: shooting ease-in-out infinite;
        }

        .shooting-star::after {
          content: "";
          position: absolute;
          right: -2px;
          top: 50%;
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: white;
          transform: translateY(-50%);
          box-shadow:
            0 0 10px rgba(255,255,255,1),
            0 0 20px rgba(255,255,255,0.75),
            0 0 34px rgba(115, 206, 255, 0.55);
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.25;
            transform: scale(0.85);
          }
          50% {
            opacity: 1;
            transform: scale(1.55);
          }
        }

        @keyframes shooting {
          0% {
            opacity: 0;
            transform: rotate(-26deg) translate3d(0, 0, 0);
          }
          10% {
            opacity: 1;
          }
          35% {
            opacity: 1;
            transform: rotate(-26deg) translate3d(420px, 180px, 0);
          }
          100% {
            opacity: 0;
            transform: rotate(-26deg) translate3d(720px, 310px, 0);
          }
        }

        .diary-page {
          position: absolute;
          inset: 0;
          border-radius: 24px;
          background:
            radial-gradient(circle at top left, rgba(143, 168, 255, 0.12), transparent 26%),
            linear-gradient(135deg, rgba(31, 34, 56, 0.96), rgba(42, 47, 77, 0.96));
          border: 1px solid rgba(255,255,255,0.06);
          box-shadow:
            0 18px 42px rgba(0,0,0,0.32),
            inset 0 1px 0 rgba(255,255,255,0.06);
          overflow: hidden;
          transform-origin: left center;
          backface-visibility: hidden;
        }

        .diary-page-inner {
          height: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 32px 40px 76px 44px;
        }

        .diary-page-list .diary-page-inner {
          padding-top: 40px;
          padding-bottom: 92px;
        }

        .diary-page-calendar .diary-page-inner {
          padding-top: 44px;
          padding-bottom: 96px;
        }

        .diary-page-editor .diary-page-inner {
          padding-bottom: 88px;
        }

        .diary-page-editor .diary-page-topbar {
          margin-bottom: 10px;
        }

        .diary-page-topbar {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 14px;
        }

        .reading-title {
          margin: 0 0 12px;
          padding-left: 12px;
          border-left: 4px solid #8fa8ff;
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #f7f8ff;
          text-shadow: 0 0 10px rgba(180, 190, 255, 0.24);
          flex-shrink: 0;
        }

        .reading-subtitle {
          margin: 0;
          padding-left: 12px;
          font-size: 13px;
          letter-spacing: 0.16em;
          color: rgba(220, 228, 255, 0.72);
          text-transform: uppercase;
          flex-shrink: 0;
        }

        .diary-page-caption {
          margin: 10px 0 0;
          max-width: 36rem;
          font-size: 14px;
          line-height: 1.8;
          color: rgba(220, 228, 255, 0.75);
        }

        .diary-page-nav {
          position: absolute;
          left: 44px;
          right: 10px;
          bottom: 24px;
          display: flex;
          justify-content: space-between;
          gap: 12px;
          pointer-events: none;
          z-index: 10;
        }

        .diary-page-nav .diary-nav-button,
        .diary-page-nav .diary-add-button {
          pointer-events: auto;
        }

        .diary-nav-button,
        .diary-add-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 46px;
          padding: 0 18px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.14);
          color: #f5f7ff;
          background: rgba(255,255,255,0.08);
          box-shadow: 0 10px 24px rgba(0,0,0,0.18);
          cursor: pointer;
          transition:
            transform 180ms ease,
            background-color 180ms ease,
            box-shadow 180ms ease,
            filter 180ms ease;
          white-space: nowrap;
        }

        .diary-nav-button:hover {
          background: rgba(255, 255, 255, 0.18);
          border-color: rgba(255, 255, 255, 0.34);
          transform: translateY(-1px);
          filter: brightness(1.12);
          box-shadow:
            0 14px 28px rgba(0,0,0,0.22),
            0 0 0 1px rgba(255,255,255,0.18) inset,
            0 0 18px rgba(255,255,255,0.16);
        }

        .diary-add-button:hover {
          background: linear-gradient(135deg, #f8dede, #ece3ff);
          transform: translateY(-1px);
          filter: brightness(1.04);
          box-shadow:
            0 14px 28px rgba(0,0,0,0.22),
            0 0 0 1px rgba(255,255,255,0.16) inset,
            0 0 18px rgba(255,255,255,0.12);
        }

        .diary-nav-button:active,
        .diary-add-button:active {
          transform: translateY(0);
          filter: brightness(0.98);
        }

        .diary-add-button {
          background: linear-gradient(135deg, #f4c2c2, #d8c4ff);
          color: #2c2036;
          border-color: rgba(255,255,255,0.18);
          font-weight: 700;
        }

        .diary-sheet {
          flex: 1;
          min-height: 0;
          border-radius: 22px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
          overflow: hidden;
        }

        .diary-sheet-calendar {
          display: flex;
          align-items: stretch;
          justify-content: center;
          padding: 10px 12px;
          margin-bottom: 18px;
          border: none;
          box-shadow: none;
          background: transparent;
        }

        .diary-sheet-list {
          display: flex;
          flex-direction: column;
          padding: 14px 14px 4px;
          margin-bottom: 18px;
          border: none;
          box-shadow: none;
          background: transparent;
        }

        .diary-sheet-editor {
          padding: 8px 14px 14px;
          overflow-y: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          border: none;
          box-shadow: none;
          background: transparent;
        }

        .diary-sheet-editor::-webkit-scrollbar {
          display: none;
        }

        .diary-list-scroll {
          height: 100%;
          min-height: 0;
          overflow-y: auto;
          padding-right: 10px;
          padding-bottom: 0;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .diary-list-scroll::-webkit-scrollbar {
          display: none;
        }

        .diary-muted,
        .diary-notice,
        .diary-error,
        .diary-empty {
          margin: 0 0 16px;
          padding: 12px 16px;
          border-radius: 16px;
          background: rgba(255,255,255,0.08);
          color: rgba(245,247,255,0.84);
        }

        .diary-error {
          background: rgba(167, 70, 93, 0.2);
          color: #ffdce4;
        }

        .diary-notice {
          background: rgba(244, 194, 194, 0.18);
          color: #f8e7f0;
        }

        .diary-empty {
          text-align: center;
          padding: 22px 16px;
        }

        .diary-page-footer {
          display: flex;
          justify-content: center;
          padding-top: 8px;
        }

        .diary-footer-note {
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(220, 228, 255, 0.64);
        }

        .diary-book-glow {
          position: absolute;
          inset: auto 18% 10% 18%;
          height: 140px;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(255,255,255,0.18), rgba(123,165,255,0.06) 42%, transparent 72%);
          filter: blur(24px);
          opacity: 0.55;
          pointer-events: none;
          z-index: 0;
        }

        @media (max-width: 768px) {
          .diary-book-shell {
            width: min(100vw - 12px, 760px);
            min-height: calc(100vh - 28px);
          }

          .diary-book-page-stack {
            min-height: calc(100vh - 28px);
            padding-left: 34px;
          }

          .diary-book-spine {
            left: 0;
          }

          .diary-page-inner {
            padding: 24px 16px 72px 20px;
          }

          .diary-page-list .diary-page-inner {
            padding-top: 32px;
            padding-bottom: 60px;
          }

          .diary-page-calendar .diary-page-inner {
            padding-top: 36px;
            padding-bottom: 66px;
          }

          .diary-page-editor .diary-page-inner {
            padding-bottom: 58px;
          }

          .diary-page-editor .diary-page-topbar {
            margin-bottom: 8px;
          }

          .diary-page-topbar {
            flex-direction: column;
          }

          .diary-page-nav {
            left: 20px;
            right: 10px;
            bottom: 14px;
          }

          .diary-sheet-editor {
            padding: 8px 14px 14px;
          }

          .diary-sheet-calendar {
            padding: 10px;
            margin-bottom: 10px;
          }

          .diary-sheet-list {
            margin-bottom: 10px;
          }
        }
      `}</style>
    </div>
  );
}
