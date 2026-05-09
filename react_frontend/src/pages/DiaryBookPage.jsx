import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import CosmicBackground from "../components/CosmicBackground";
import StarrySky from "../components/StarrySky.jsx";
import CalendarCard from "../components/CalendarCard";
import DiaryCard from "../components/DiaryCard";
import DiaryEditorForm from "../components/DiaryEditorForm";
import { apiFetch } from "../api";

const DIARY_PAGE_SIZE = 12;
const DIARY_IMAGE_REVEAL_DELAY_MS = 220;
const DIARY_PAGE_TRANSITION_MS = 460;
const diaryPageBlurMotion = {
  initial: { opacity: 0, filter: "blur(12px)", scale: 0.985 },
  animate: { opacity: 1, filter: "blur(0px)", scale: 1 },
  exit: { opacity: 0, filter: "blur(12px)", scale: 0.985 },
  transition: { duration: 0.46, ease: "easeInOut" },
};

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const dateKeyFromTimestamp = (value) => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";
  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const tarotReadingToDiaryEntry = (reading) => {
  const date = dateKeyFromTimestamp(reading.createdAt ?? reading.created_at);
  const cardNames = reading.cards?.map((card) => card.cardName ?? card.card_name).filter(Boolean) ?? [];
  const question = reading.question || "Untitled reading";
  const interpretation = reading.aiInterpretation || reading.ai_interpretation || "";
  const memo = reading.memo || "";
  const cardList = cardNames.length ? cardNames.join(" / ") : "No cards recorded";
  const renderedContent = `
    <p><strong>Tarot Reading</strong></p>
    <p>${escapeHtml(question)}</p>
    <p><small>${escapeHtml(cardList)}</small></p>
    ${interpretation ? `<p>${escapeHtml(interpretation).replace(/\n/g, "<br />")}</p>` : ""}
    ${memo ? `<p><strong>Memo</strong><br />${escapeHtml(memo).replace(/\n/g, "<br />")}</p>` : ""}
  `;

  return {
    id: `tarot-${reading.id}`,
    sourceType: "tarot",
    tarotReadingId: reading.id,
    date,
    sortDateTime: reading.createdAt ?? reading.created_at ?? date,
    title: `Tarot: ${question}`,
    renderedContent,
    rendered_content: renderedContent,
    images: [],
    cards: reading.cards ?? [],
  };
};

export default function DiaryBookPage({
  authReady = true,
  diaryId = null,
  isEdit = false,
  forceEditor = false,
  initialPageIndex = 0,
}) {
  return (
    <DiaryBookContent
      authReady={authReady}
      diaryId={diaryId}
      isEdit={isEdit}
      forceEditor={forceEditor}
      initialPageIndex={initialPageIndex}
    />
  );
}

export function DiaryBookContent({
  authReady = true,
  diaryId = null,
  isEdit = false,
  forceEditor = false,
  initialPageIndex = 0,
  initialSelectedDate = "",
  embedded = false,
  onExitToBook,
  onPageStateChange,
  onOpenTarotReading,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedDateFromState = embedded ? initialSelectedDate : location.state?.selectedDate ?? "";
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
  const [visibleDiaryCount, setVisibleDiaryCount] = useState(DIARY_PAGE_SIZE);
  const [listImagesReady, setListImagesReady] = useState(false);
  const [pageTransition, setPageTransition] = useState(null);
  const [editorTransition, setEditorTransition] = useState(null);
  const listScrollRef = useRef(null);
  const selectedDiaryRef = useRef(null);
  const editorTransitionTimerRef = useRef(null);

  useEffect(() => {
    Promise.all([
      apiFetch("/api/diaries/"),
      apiFetch("/api/tarot/readings/")
        .then((data) => data.readings ?? [])
        .catch(() => []),
    ])
      .then(([diaryData, tarotReadings]) => {
        const diaryEntries = Array.isArray(diaryData)
          ? diaryData.map((diary) => ({ ...diary, sourceType: "diary", sortDateTime: diary.date }))
          : [];
        const tarotEntries = tarotReadings
          .map(tarotReadingToDiaryEntry)
          .filter((entry) => entry.date);
        setDiaries([...diaryEntries, ...tarotEntries]);
      })
      .catch((err) => setError(err.message || "Failed to load diaries."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!pageTransition || pageIndex !== pageTransition.targetPageIndex) return undefined;

    const timeoutId = window.setTimeout(() => {
      if (!embedded) {
        navigate(pageTransition.route, pageTransition.state);
      }
      setPageTransition(null);
    }, DIARY_PAGE_TRANSITION_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [embedded, navigate, pageIndex, pageTransition]);

  useEffect(() => {
    if (!editorTransition || pageIndex !== 2) return undefined;
    if (embedded) return undefined;

    editorTransitionTimerRef.current = window.setTimeout(() => {
      navigate(editorTransition.route, selectedDate ? { state: { selectedDate } } : undefined);
    }, DIARY_PAGE_TRANSITION_MS);

    return () => {
      if (editorTransitionTimerRef.current) {
        window.clearTimeout(editorTransitionTimerRef.current);
        editorTransitionTimerRef.current = null;
      }
    };
  }, [editorTransition, embedded, navigate, pageIndex, selectedDate]);

  useEffect(() => {
    if (pageIndex !== 1 || loading || error) return undefined;

    const timeoutId = window.setTimeout(() => {
      setListImagesReady(true);
    }, DIARY_IMAGE_REVEAL_DELAY_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [error, loading, pageIndex]);

  const diaryDates = useMemo(
    () => [...new Set(diaries.filter((diary) => diary.sourceType === "diary").map((diary) => diary.date).filter(Boolean))],
    [diaries],
  );
  const tarotOnlyDates = useMemo(
    () => {
      const diaryDateSet = new Set(diaryDates);
      return [...new Set(diaries
        .filter((diary) => diary.sourceType === "tarot" && diary.date && !diaryDateSet.has(diary.date))
        .map((diary) => diary.date))];
    },
    [diaries, diaryDates],
  );
  const calendarMarkedDates = useMemo(
    () => [...new Set([...diaryDates, ...tarotOnlyDates])],
    [diaryDates, tarotOnlyDates],
  );
  const calendarMarkerTypes = useMemo(
    () => ({
      diaryDates,
      tarotOnlyDates,
    }),
    [diaryDates, tarotOnlyDates],
  );
  const sortedDiaries = useMemo(() => {
    return [...diaries].sort((left, right) => {
      const rightTime = new Date(right.sortDateTime || right.date || 0).getTime();
      const leftTime = new Date(left.sortDateTime || left.date || 0).getTime();
      return rightTime - leftTime;
    });
  }, [diaries]);
  const scrollTargetDiaryIndex = useMemo(() => {
    if (!selectedDate) return -1;
    const exactIndex = sortedDiaries.findIndex((diary) => diary.date === selectedDate);
    if (exactIndex >= 0) return exactIndex;

    const olderOrSameIndex = sortedDiaries.findIndex((diary) => diary.date && diary.date <= selectedDate);
    if (olderOrSameIndex >= 0) return olderOrSameIndex;

    return sortedDiaries.length > 0 ? sortedDiaries.length - 1 : -1;
  }, [selectedDate, sortedDiaries]);
  const visibleDiaryLimit = useMemo(() => {
    if (scrollTargetDiaryIndex < 0) return visibleDiaryCount;
    return Math.max(visibleDiaryCount, scrollTargetDiaryIndex + DIARY_PAGE_SIZE);
  }, [scrollTargetDiaryIndex, visibleDiaryCount]);
  const visibleDiaries = useMemo(
    () => sortedDiaries.slice(0, visibleDiaryLimit),
    [sortedDiaries, visibleDiaryLimit],
  );
  const hasMoreDiaries = visibleDiaryLimit < sortedDiaries.length;

  const scrollToSelectedDiary = useCallback(() => {
    const container = listScrollRef.current;
    const selectedCard = selectedDiaryRef.current;
    if (!container || !selectedCard) return false;

    const targetTop = container.scrollTop + selectedCard.getBoundingClientRect().top - container.getBoundingClientRect().top;
    container.scrollTo({
      top: targetTop,
      behavior: "auto",
    });
    return true;
  }, []);

  useLayoutEffect(() => {
    if (pageIndex !== 1 || scrollTargetDiaryIndex < 0) return;
    scrollToSelectedDiary();
  }, [pageIndex, scrollTargetDiaryIndex, scrollToSelectedDiary, visibleDiaryLimit]);

  useEffect(() => {
    if (pageIndex !== 1 || scrollTargetDiaryIndex < 0 || loading || error) return undefined;

    let frameId = 0;
    const timeoutIds = [];
    const scheduleScroll = (delay) => {
      const timeoutId = window.setTimeout(() => {
        frameId = window.requestAnimationFrame(() => {
          scrollToSelectedDiary();
        });
      }, delay);
      timeoutIds.push(timeoutId);
    };

    scheduleScroll(0);
    scheduleScroll(listImagesReady ? 240 : 520);

    return () => {
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [error, listImagesReady, loading, pageIndex, scrollTargetDiaryIndex, scrollToSelectedDiary, visibleDiaryLimit]);

  const activeEditorDiaryId = editorTransition?.diaryId ?? diaryId;
  const selectedDiary = diaries.find((diary) => String(diary.id) === String(activeEditorDiaryId));
  const editorTitle = isEdit ? "Edit Diary" : "Add Your Journal";
  const editorFormId = "diary-editor-form";

  const goToBookIntro = useCallback(() => {
    if (embedded) {
      onExitToBook?.();
      return;
    }

    navigate("/bookdesign", { state: { page: 1 } });
  }, [embedded, navigate, onExitToBook]);

  const handleBackToList = useCallback(() => {
    setListImagesReady(false);
    setPageTransition({
      route: "/diary/list",
      targetPageIndex: 1,
      state: selectedDate ? { selectedDate } : undefined,
    });
    setPageIndex(1);
  }, [selectedDate]);

  const handleBackToCalendar = useCallback(() => {
    setPageTransition({
      route: "/diary",
      targetPageIndex: 0,
      state: undefined,
    });
    setPageIndex(0);
  }, []);

  const goToNextPage = useCallback(() => {
    setListImagesReady(false);
    setPageTransition({
      route: "/diary/list",
      targetPageIndex: 1,
      state: selectedDate ? { selectedDate } : undefined,
    });
    setPageIndex(1);
  }, [selectedDate]);

  const goToEditor = useCallback((targetRoute, targetDiaryId = null) => {
    if (editorTransitionTimerRef.current) {
      window.clearTimeout(editorTransitionTimerRef.current);
      editorTransitionTimerRef.current = null;
    }
    setEditorTransition({ route: targetRoute, diaryId: targetDiaryId });
    setPageIndex(2);
  }, []);

  const handleSelectDate = useCallback((date) => {
    setNotice("");
    setSelectedDate(date);
    setListImagesReady(false);
    const exactIndex = sortedDiaries.findIndex((diary) => diary.date === date);
    const targetIndex =
      exactIndex >= 0
        ? exactIndex
        : sortedDiaries.findIndex((diary) => diary.date && diary.date <= date);
    setVisibleDiaryCount(targetIndex >= 0 ? Math.max(DIARY_PAGE_SIZE, targetIndex + DIARY_PAGE_SIZE) : DIARY_PAGE_SIZE);
    setPageTransition({
      route: "/diary/list",
      targetPageIndex: 1,
      state: { selectedDate: date },
    });
    setPageIndex(1);
  }, [sortedDiaries]);

  const handleChangeMonth = useCallback((offset) => {
    setNotice("");
    setCalendarDate((current) => {
      const next = new Date(current);
      next.setMonth(current.getMonth() + offset, 1);
      return next;
    });
  }, []);

  const handleSaved = useCallback((savedDiary) => {
    const nextDate = savedDiary?.date || selectedDate || "";
    if (nextDate) {
      setSelectedDate(nextDate);
    }
    setListImagesReady(false);
    setEditorTransition(null);
    setPageTransition({
      route: "/diary/list",
      targetPageIndex: 1,
      state: nextDate ? { selectedDate: nextDate } : undefined,
    });
    setPageIndex(1);

    if (embedded) {
      return;
    }

    if (nextDate) {
      navigate("/diary/list", { state: { selectedDate: nextDate } });
      return;
    }
    navigate("/diary/list");
  }, [embedded, navigate, selectedDate]);

  const handleCardOpen = useCallback((entry) => {
    if (entry?.sourceType === "tarot") {
      if (embedded && onOpenTarotReading) {
        onOpenTarotReading(entry);
        return;
      }
      navigate(`/tarot/readings/${entry.tarotReadingId}`);
      return;
    }
    goToEditor(`/diary/${entry.id}/edit`, entry.id);
  }, [embedded, goToEditor, navigate, onOpenTarotReading]);

  const showMoreDiaries = useCallback(() => {
    setVisibleDiaryCount((current) => Math.max(current, visibleDiaryLimit) + DIARY_PAGE_SIZE);
  }, [visibleDiaryLimit]);

  useEffect(() => {
    if (!embedded) return;

    onPageStateChange?.({
      pageIndex,
      canGoBack: pageIndex > 0,
      canGoForward: pageIndex < 1,
      goBack: pageIndex === 0 ? goToBookIntro : pageIndex === 1 ? handleBackToCalendar : handleBackToList,
      goForward: pageIndex === 0 ? goToNextPage : null,
    });
  }, [embedded, goToBookIntro, handleBackToCalendar, handleBackToList, goToNextPage, onPageStateChange, pageIndex]);

  const content = (
    <>
      {!embedded ? <CosmicBackground variant="hero" animated /> : null}

      {!embedded ? (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(196,136,255,0.16),transparent_26%),radial-gradient(circle_at_82%_16%,rgba(126,214,255,0.14),transparent_24%),radial-gradient(circle_at_50%_80%,rgba(117,138,255,0.12),transparent_28%),linear-gradient(180deg,rgba(7,11,23,0.1),rgba(7,11,23,0.88))]" />
      ) : null}

      {!embedded ? <StarrySky /> : null}

      <div className={embedded ? "diary-embedded-stage" : "relative z-10 flex min-h-screen items-center justify-center px-4 py-6 md:px-6"}>
        <div className={`diary-book-shell ${embedded ? "diary-book-shell-embedded" : ""}`}>
          <div className="diary-book-spine" />
          <div className="diary-book-page-stack">
            <AnimatePresence mode="wait" initial={false}>
              {pageIndex === 0 ? (
                <Motion.section
                  key="calendar"
                  {...diaryPageBlurMotion}
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
                        diaryDates={calendarMarkedDates}
                        markerTypes={calendarMarkerTypes}
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
                  {...diaryPageBlurMotion}
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
                            ? `Jumped back to: ${selectedDate}`
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

                        {!loading && !error && visibleDiaries.length > 0
                          ? visibleDiaries.map((diary) => (
                              <DiaryCard
                                key={diary.id}
                                diary={diary}
                                cardRef={
                                  diary.id === sortedDiaries[scrollTargetDiaryIndex]?.id
                                    ? selectedDiaryRef
                                    : undefined
                                }
                                deferImages={!listImagesReady}
                                onOpenEdit={handleCardOpen}
                              />
                            ))
                          : null}

                        {!loading && !error && hasMoreDiaries ? (
                          <button type="button" className="diary-more-button" onClick={showMoreDiaries}>
                            MORE
                          </button>
                        ) : null}

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
                  {...diaryPageBlurMotion}
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
        .diary-embedded-stage {
          position: relative;
          z-index: 2;
          height: 100%;
          min-height: 0;
          display: flex;
          align-items: stretch;
          justify-content: center;
        }

        .diary-book-shell {
          position: relative;
          width: min(760px, calc(100vw - 28px));
          min-height: min(90vh, 900px);
          perspective: 1600px;
        }

        .diary-book-shell-embedded {
          width: 100%;
          min-height: 100%;
          perspective: none;
        }

        .diary-book-shell-embedded .diary-book-spine,
        .diary-book-shell-embedded .diary-book-glow {
          display: none;
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

        .diary-book-shell-embedded .diary-book-page-stack {
          min-height: 100%;
          padding-left: 0;
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

        .diary-book-shell-embedded .diary-page {
          border: 0;
          border-radius: 16px;
          background: transparent;
          box-shadow: none;
        }

        .diary-book-shell-embedded .diary-page-inner {
          padding: 18px 20px 58px 22px;
        }

        .diary-book-shell-embedded .diary-page-list .diary-page-inner {
          padding: 18px 20px 58px 22px;
        }

        .diary-book-shell-embedded .diary-page-calendar .diary-page-inner {
          padding: 18px 20px 58px 22px;
        }

        .diary-book-shell-embedded .diary-page-editor .diary-page-inner {
          padding: 18px 20px 58px 22px;
        }

        .diary-book-shell-embedded .diary-page-topbar {
          margin-bottom: 8px;
        }

        .diary-book-shell-embedded .diary-page-nav {
          left: 22px;
          right: 20px;
          bottom: 6px;
        }

        .diary-book-shell-embedded .diary-page-nav .diary-nav-button {
          display: none;
        }

        .diary-book-shell-embedded .diary-page-nav {
          justify-content: flex-end;
        }

        .diary-book-shell-embedded .diary-sheet-calendar,
        .diary-book-shell-embedded .diary-sheet-list {
          margin-bottom: 8px;
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

        .diary-more-button {
          display: flex;
          width: min(220px, 100%);
          height: 44px;
          align-items: center;
          justify-content: center;
          margin: 4px auto 20px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.1);
          color: #f5f7ff;
          font-weight: 700;
          letter-spacing: 0.12em;
          cursor: pointer;
          transition:
            transform 180ms ease,
            background-color 180ms ease,
            box-shadow 180ms ease;
        }

        .diary-more-button:hover {
          transform: translateY(-1px);
          background: rgba(255,255,255,0.18);
          box-shadow:
            0 14px 28px rgba(0,0,0,0.18),
            0 0 0 1px rgba(255,255,255,0.14) inset;
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

          .diary-book-shell-embedded {
            width: 100%;
            min-height: 100%;
          }

          .diary-book-shell-embedded .diary-book-page-stack {
            min-height: 100%;
            padding-left: 0;
          }

          .diary-book-shell-embedded .diary-page-inner,
          .diary-book-shell-embedded .diary-page-list .diary-page-inner,
          .diary-book-shell-embedded .diary-page-calendar .diary-page-inner,
          .diary-book-shell-embedded .diary-page-editor .diary-page-inner {
            padding: 14px 14px 52px 16px;
          }

          .diary-book-shell-embedded .diary-page-nav {
            left: 16px;
            right: 14px;
            bottom: -4px;
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
    </>
  );

  if (embedded) {
    return content;
  }

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#070b17] text-white">
      {content}
    </div>
  );
}
