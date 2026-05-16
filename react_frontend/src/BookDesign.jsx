import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LucideHeading3, Sparkles } from "lucide-react";
import { apiFetch } from "./api";
import StarrySky from "./components/StarrySky.jsx";
import { DiaryBookContent } from "./pages/DiaryBookPage.jsx";
import { TarotReadingCards, TarotReadingContent, TarotReadingMessage } from "./pages/TarotPages.jsx";

const emptyForm = {
  personName: "",
  place: "",
  birthDate: "",
  birthTime: "",
};

const groupProfiles = (profiles) =>
  profiles.reduce((groups, profile) => {
    const first = (profile.personName || "#").charAt(0).toUpperCase();
    const key = /[A-Z]/.test(first) ? first : "#";
    return {
      ...groups,
      [key]: [...(groups[key] ?? []), profile],
    };
  }, {});

const sortGroupedEntries = (groups) =>
  Object.entries(groups).sort(([left], [right]) => {
    if (left === "#") return 1;
    if (right === "#") return -1;
    return left.localeCompare(right);
  });

function StarBookIntroPage({ onExit }) {
  return (
    <div className="guest-card">
      <div className="guest-eyebrow">
        <Sparkles className="h-4 w-4" />
        <span>あなたの星の物語を、ひとつずつ開いていく。</span>
      </div>
      <h2 className="guest-subtitle">Horoscope & Sabian Symbol Reading</h2>
      <p className="guest-text">
        <br />
        最初のページでは、ここで何が見えるのかをやさしく案内します。
        <br />
        On the first page, we gently guide you through what you can discover here.
        <br />
        その先には、誰でものぞける無料の Akashic Index。
        <br />
        Beyond that, you can explore the free Akashic Index that anyone can browse.
        <br />
        <br />
        <br />
        有名人の星の並びや、運命の輪の気配を、ページをめくるように楽しめます。
        <br />
        You can enjoy celebrity charts and the subtle hints of fate as if turning the pages of a storybook.
        <br />
        ログインすると、あなた自身の記録が加わり、保存したホロスコープや新しい星の読み解きを続けて開けます。
        <br />
        When you sign in, your own records appear, along with saved horoscopes and new readings that continue your journey through the stars.
      </p>
      <div className="guest-actions">
        <button
          type="button"
          className="guest-button"
          onClick={onExit}
          aria-label="Exit"
        >
          ×
        </button>
      </div>
    </div>
  );
}

function ChooserMedia({ type }) {
  if (type === "chart") {
    return (
      <div className="chooser-media-frame chooser-media-chart">
        <div className="chooser-media-glow" />
        <div className="chooser-illustration chart-illustration">
          <span className="chart-orbit chart-orbit-outer" />
          <span className="chart-orbit chart-orbit-inner" />
          <span className="chart-dot chart-dot-one" />
          <span className="chart-dot chart-dot-two" />
          <span className="chart-dot chart-dot-three" />
        </div>
      </div>
    );
  }

  if (type === "diary") {
    return (
      <div className="chooser-media-frame chooser-media-diary">
        <div className="chooser-media-glow" />
        <div className="chooser-illustration diary-illustration">
          <span className="diary-book" />
          <span className="diary-ribbon" />
          <span className="diary-line diary-line-one" />
          <span className="diary-line diary-line-two" />
          <span className="diary-heart" />
        </div>
      </div>
    );
  }

  return (
    <div className="chooser-media-frame chooser-media-tarot">
      <div className="chooser-media-glow" />
      <div className="chooser-illustration tarot-illustration">
        <span className="tarot-card tarot-card-back" />
        <span className="tarot-card tarot-card-front" />
        <span className="tarot-moon" />
        <span className="tarot-star tarot-star-one" />
        <span className="tarot-star tarot-star-two" />
      </div>
    </div>
  );
}

function ChooserCard({ type, eyebrow, title, text, onClick }) {
  return (
    <button
      type="button"
      className="chooser-card"
      onClick={onClick}
    >
      <div className="chooser-media" aria-hidden="true">
        <ChooserMedia type={type} />
      </div>
      <div className="chooser-copy">
        <div className="chooser-eyebrow">{eyebrow}</div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </button>
  );
}

function BookChooserPage({ onOpenAkashicIndex, onOpenDiaryBook, onOpenTarotIndex }) {
  return (
    <div className="chooser-page">
      <div className="chooser-grid">
        <ChooserCard
          type="chart"
          eyebrow="Chart"
          title="Open Akashic Index"
          text="Open the current chart app pages and the shared free index."
          onClick={onOpenAkashicIndex}
        />
        <ChooserCard
          type="diary"
          eyebrow="Diary"
          title="Open Diary Book"
          text="Move into the diary book with the calendar, list, and edit pages."
          onClick={onOpenDiaryBook}
        />
        <ChooserCard
          type="tarot"
          eyebrow="Tarot"
          title="Open Tarot Room"
          text="Enter the tarot app to draw cards, browse decks."
          onClick={onOpenTarotIndex}
        />
      </div>
    </div>
  );
}

export default function BookDesign({ user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [profilesData, setProfilesData] = useState({
    publicProfiles: [],
    privateProfiles: [],
  });
  const [form, setForm] = useState(emptyForm);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [result, setResult] = useState(null);
  const [currentPage, setCurrentPage] = useState(() => location.state?.page ?? 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOpeningDiary, setIsOpeningDiary] = useState(false);
  const [isOpeningTarot, setIsOpeningTarot] = useState(false);
  const [pendingBookSection, setPendingBookSection] = useState(null);
  const [diaryNavState, setDiaryNavState] = useState(null);
  const [diaryInitialPageIndex, setDiaryInitialPageIndex] = useState(0);
  const [diaryInitialSelectedDate, setDiaryInitialSelectedDate] = useState("");
  const [tarotBookReading, setTarotBookReading] = useState(null);
  const [tarotReturnToDiaryDate, setTarotReturnToDiaryDate] = useState("");

  const isAuthenticated = Boolean(user);

  useEffect(() => {
    apiFetch("/api/chart/profiles/")
      .then((data) => {
        if (Array.isArray(data)) {
          setProfilesData({ publicProfiles: data, privateProfiles: [] });
          return;
        }
        setProfilesData({
          publicProfiles: data.publicProfiles ?? [],
          privateProfiles: isAuthenticated ? data.privateProfiles ?? [] : [],
        });
      })
      .catch((err) => setError(err.message || "Failed to load profiles."));

    if (!isAuthenticated) {
      setForm(emptyForm);
      setResult(null);
      setCurrentPage(0);
      setLoading(false);
      setError("");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (location.state?.bookSection === "tarot") {
      setIsOpeningDiary(false);
      setIsOpeningTarot(true);
      setPendingBookSection(null);
      setTarotReturnToDiaryDate("");
      setCurrentPage(location.state?.tarotPage === "draw" ? 3 : 2);
      return;
    }

    if (location.state?.bookSection === "diary") {
      setIsOpeningTarot(false);
      setIsOpeningDiary(true);
      setPendingBookSection(null);
      setDiaryInitialPageIndex(location.state?.diaryPage === "list" ? 1 : 0);
      setDiaryInitialSelectedDate(location.state?.selectedDate ?? "");
      setCurrentPage(2);
      return;
    }

    if (typeof location.state?.page === "number") {
      setCurrentPage(location.state.page);
    }
  }, [location.state?.bookSection, location.state?.diaryPage, location.state?.page, location.state?.selectedDate, location.state?.tarotPage]);

  const publicGroupedEntries = useMemo(
    () => sortGroupedEntries(groupProfiles(profilesData.publicProfiles)),
    [profilesData.publicProfiles],
  );

  const privateGroupedEntries = useMemo(
    () => sortGroupedEntries(groupProfiles(profilesData.privateProfiles)),
    [profilesData.privateProfiles],
  );

  const update = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
  };

  const refreshProfiles = useCallback(async () => {
    const nextProfiles = await apiFetch("/api/chart/profiles/");
    setProfilesData({
      publicProfiles: nextProfiles.publicProfiles ?? [],
      privateProfiles: nextProfiles.privateProfiles ?? [],
    });
  }, []);

  const openProfileForEdit = useCallback((profile) => {
    setForm({
      personName: profile.personName ?? "",
      place: profile.place ?? "",
      birthDate: profile.birthDate ?? "",
      birthTime: profile.birthTime ?? "",
    });
    setSelectedProfile(profile);
    setResult(null);
    setError("");
    setCurrentPage(4);
  }, []);

  const saveProfile = useCallback(async () => {
    if (!isAuthenticated) {
      return;
    }

    setLoading(true);
    setError("");
    try {
      const payload = {
        personName: form.personName,
        place: form.place,
        birthDate: form.birthDate,
        birthTime: form.birthTime,
      };

      const endpoint = selectedProfile?.id
        ? "/api/chart/profiles/update/"
        : "/api/chart/profiles/create/";
      const body = {
        ...payload,
        ...(selectedProfile?.id ? { profileId: selectedProfile.id } : {}),
        ...(
          selectedProfile &&
          selectedProfile.place === form.place &&
          selectedProfile.lat != null &&
          selectedProfile.lon != null
            ? { lat: selectedProfile.lat, lon: selectedProfile.lon }
            : {}
        ),
      };

      const savedProfile = await apiFetch(endpoint, {
        method: "POST",
        body: JSON.stringify(body),
      });

      setSelectedProfile(savedProfile);
      setForm({
        personName: savedProfile.personName ?? payload.personName,
        place: savedProfile.place ?? payload.place,
        birthDate: savedProfile.birthDate ?? payload.birthDate,
        birthTime: savedProfile.birthTime ?? payload.birthTime,
      });
      await refreshProfiles();
      setCurrentPage(4);
    } catch (err) {
      setError(err.message || "Failed to save profile.");
    } finally {
      setLoading(false);
    }
  }, [form.birthDate, form.birthTime, form.personName, form.place, isAuthenticated, refreshProfiles, selectedProfile]);

  const calculate = useCallback(
    async ({ includeAi = false, saveProfile = false, profileId = null } = {}) => {
      if (!isAuthenticated && !profileId) {
        return;
      }

      setLoading(true);
      setError("");
      try {
        const payload = profileId
          ? { profileId, includeAi, saveProfile }
          : { ...form, includeAi, saveProfile };
        const data = await apiFetch("/api/chart/calculate/", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        setResult(data);
        setCurrentPage(isAuthenticated ? 5 : 3);
        if (saveProfile) {
          await refreshProfiles();
        }
      } catch (err) {
        setError(err.message || "Chart calculation failed.");
      } finally {
        setLoading(false);
      }
    },
    [form, isAuthenticated, refreshProfiles],
  );

  const closeAndLogout = useCallback(async () => {
    if (isAuthenticated) {
      await apiFetch("/api/auth/logout/", { method: "POST", body: "{}" });
      onLogout?.();
      navigate("/diary/warp", { state: { target: "/thank-you", warpMode: "collapse" } });
      return;
    }

    navigate("/diary/warp", { state: { target: "/" } });
  }, [isAuthenticated, navigate, onLogout]);

  const openDiaryBook = useCallback(() => {
    setIsOpeningDiary(true);
    setIsOpeningTarot(false);
    setTarotReturnToDiaryDate("");
    setDiaryInitialPageIndex(0);
    setDiaryInitialSelectedDate("");
    setCurrentPage(1);
    setPendingBookSection("diary");
  }, []);

  const openTarotIndex = useCallback(() => {
    setIsOpeningTarot(true);
    setIsOpeningDiary(false);
    setTarotBookReading(null);
    setTarotReturnToDiaryDate("");
    setCurrentPage(1);
    setPendingBookSection("tarot");
  }, []);

  const openAkashicIndex = useCallback(() => {
    setIsOpeningDiary(false);
    setIsOpeningTarot(false);
    setPendingBookSection(null);
    setTarotReturnToDiaryDate("");
    setCurrentPage(2);
  }, []);

  const closeDiaryBook = useCallback(() => {
    setIsOpeningDiary(false);
    setDiaryNavState(null);
    setCurrentPage(1);
  }, []);

  const closeTarotIndex = useCallback(() => {
    setIsOpeningTarot(false);
    setTarotBookReading(null);
    setTarotReturnToDiaryDate("");
    setCurrentPage(1);
  }, []);

  const returnToDiaryListFromTarot = useCallback(() => {
    setIsOpeningTarot(false);
    setTarotBookReading(null);
    setTarotReturnToDiaryDate("");
    setIsOpeningDiary(true);
    setDiaryInitialPageIndex(1);
    setDiaryInitialSelectedDate(tarotReturnToDiaryDate);
    setCurrentPage(2);
  }, [tarotReturnToDiaryDate]);

  const openTarotReadingFromDiary = useCallback(async (entry) => {
    const readingId = entry?.tarotReadingId;
    if (!readingId) return;

    setError("");
    try {
      const reading = await apiFetch(`/api/tarot/readings/${readingId}/`);
      setTarotBookReading(reading);
      setTarotReturnToDiaryDate(entry.date ?? "");
      setIsOpeningDiary(false);
      setDiaryNavState(null);
      setIsOpeningTarot(true);
      setPendingBookSection(null);
      setCurrentPage(4);
    } catch (err) {
      setError(err.message || "Failed to load tarot reading.");
    }
  }, []);

  const pages = useMemo(() => {
    const items = [
      {
        key: "intro",
        title: "Welcome to your Star Book",
        content: <StarBookIntroPage onExit={closeAndLogout} />,
      },
      {
        key: "chooser",
        title: "INDEX",
        subtitle: "select page",
        content: (
          <BookChooserPage
            onOpenAkashicIndex={openAkashicIndex}
            onOpenDiaryBook={openDiaryBook}
            onOpenTarotIndex={openTarotIndex}
          />
        ),
      },
      {
        key: "public-index",
        title: "SHARED AKASHIC INDEX",
        subtitle: "notable people star charts",
        content: (
          <ProfileIndex
            entries={publicGroupedEntries}
            emptyMessage="No shared profiles are available yet."
            interactive
            onSelect={(profile) => calculate({ includeAi: true, profileId: profile.id })}
          />
        ),
      },
    ].filter(Boolean);

    if (isAuthenticated) {
      items.push(
        {
          key: "private-index",
          title: "MY AKASHIC INDEX",
          subtitle: "Your saved profiles",
          content: (
              <ProfileIndex
                entries={privateGroupedEntries}
                emptyMessage="No saved profiles yet."
                interactive
                onSelect={openProfileForEdit}
              />
            ),
          },
        {
          key: "form",
          title: "STAR TITLE",
          content: (
            <form
              className="form-card"
              onSubmit={(event) => {
                event.preventDefault();
                calculate({ includeAi: true });
              }}
            >
              <div className="form-row">
                <label htmlFor="person-name">Person Name</label>
                <input
                  id="person-name"
                  type="text"
                  value={form.personName}
                  onChange={update("personName")}
                  placeholder="Name"
                />
              </div>

              <div className="form-row">
                <label htmlFor="birth-place">Place</label>
                <input
                  id="birth-place"
                  type="text"
                  value={form.place}
                  onChange={update("place")}
                  placeholder="Birth place"
                />
              </div>

              <div className="form-row">
                <label htmlFor="birth-date">Birth Date</label>
                <input
                  id="birth-date"
                  type="date"
                  value={form.birthDate}
                  onChange={update("birthDate")}
                  required
                />
              </div>

              <div className="form-row">
                <label htmlFor="birth-time">Birth Time</label>
                <input
                  id="birth-time"
                  type="time"
                  value={form.birthTime}
                  onChange={update("birthTime")}
                />
              </div>

              <div className="form-actions">
                <button
                  className="secondary-btn"
                  type="button"
                  onClick={saveProfile}
                  disabled={loading}
                >
                  {selectedProfile?.id ? "Update" : "Save"}
                </button>
                <button className="primary-btn" type="submit" disabled={loading}>
                  {loading ? "Opening..." : "Open"}
                </button>
              </div>
            </form>
          ),
        },
      );
    }

    if (result?.aiTextGeo) {
      items.push({
        key: "record",
        title: "RECORD",
        content: <div className="reading-body">{result.aiTextGeo}</div>,
      });
    }

    if (result?.aiTextHelio) {
      items.push({
        key: "gift",
        title: "GIFT",
        content: <div className="reading-body">{result.aiTextHelio}</div>,
      });
    }

    if (result?.chartGeoUrl) {
      items.push({
        key: "chart",
        title: "GEOCENTRIC",
        content: (
          <div className="reading-body">
            <div className="chart-box">
              <img src={result.chartGeoUrl} alt="Horoscope chart" />
            </div>
          </div>
        ),
      });
    }

    if (isOpeningDiary) {
      items.splice(2, 0, {
        key: "diary-book",
        title: "DIARY CALENDAR",
        subtitle: "Diary / Calendar",
        content: (
          <div className="book-diary-content">
            <DiaryBookContent
              authReady
              embedded
              initialPageIndex={diaryInitialPageIndex}
              initialSelectedDate={diaryInitialSelectedDate}
              onExitToBook={closeDiaryBook}
              onOpenTarotReading={openTarotReadingFromDiary}
              onPageStateChange={setDiaryNavState}
            />
          </div>
        ),
      });
    }

    if (isOpeningTarot) {
      items.splice(2, 0, {
        key: "tarot-index",
        title: "TAROT INDEX",
        subtitle: "select tarot page",
        content: (
          <div className="tarot-index-page">
            <button type="button" className="tarot-index-card" onClick={() => {
              setTarotBookReading(null);
              setTarotReturnToDiaryDate("");
              setCurrentPage(3);
            }}>
              <span className="tarot-index-art tarot-index-art-reading" aria-hidden="true">
                <span className="tarot-art-card tarot-art-card-one" />
                <span className="tarot-art-card tarot-art-card-two" />
                <span className="tarot-art-moon" />
                <span className="tarot-art-face" />
                <span className="tarot-art-bow tarot-art-bow-reading" />
                <span className="tarot-art-spark tarot-art-spark-one" />
                <span className="tarot-art-spark tarot-art-spark-two" />
              </span>
              <span className="tarot-index-kicker">Reading</span>
              <strong>Draw Cards</strong>
              <span>Open a tarot reading and save the result.</span>
            </button>
            <button type="button" className="tarot-index-card" onClick={() => navigate("/tarot/decks")}>
              <span className="tarot-index-art tarot-index-art-decks" aria-hidden="true">
                <span className="tarot-art-stack tarot-art-stack-one" />
                <span className="tarot-art-stack tarot-art-stack-two" />
                <span className="tarot-art-stack tarot-art-stack-three" />
                <span className="tarot-art-gem" />
                <span className="tarot-art-bow tarot-art-bow-decks" />
                <span className="tarot-art-spark tarot-art-spark-three" />
              </span>
              <span className="tarot-index-kicker">Decks</span>
              <strong>Card Library</strong>
              <span>Browse and edit tarot decks and cards.</span>
            </button>
          </div>
        ),
      });
      items.splice(3, 0, {
        key: "tarot-read",
        title: "TAROT DRAW",
        subtitle: "draw cards",
        content: (
          <div className="book-tarot-reading-content">
            <TarotReadingContent
              embedded
              showResultPanel={false}
              onReadingComplete={(reading) => {
                setTarotBookReading(reading);
                setCurrentPage(4);
              }}
            />
          </div>
        ),
      });
      items.splice(4, 0, {
        key: "tarot-cards",
        title: "TAROT CARDS",
        subtitle: "drawn cards",
        content: (
          <div className="book-tarot-result-content">
            {tarotBookReading ? (
              <TarotReadingCards result={tarotBookReading} />
            ) : (
              <p className="rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-slate-200">Your reading will appear here.</p>
            )}
          </div>
        ),
      });
      items.splice(5, 0, {
        key: "tarot-message",
        title: "TAROT MESSAGE",
        subtitle: "witch's reading",
        content: (
          <div className="book-tarot-result-content">
            {tarotBookReading ? (
              <>
                <div className="book-tarot-message-scroll">
                  <TarotReadingMessage result={tarotBookReading} />
                </div>
              </>
            ) : (
              <p className="rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-slate-200">Your reading will appear here.</p>
            )}
          </div>
        ),
      });
      items.splice(6, 0, {
        key: "tarot-consult",
        title: "TAROT CONSULT",
        subtitle: "talk with the reading",
        content: (
          <div className="book-tarot-result-content book-tarot-consult-content">
            <TarotConsultPanel reading={tarotBookReading} onBackToMessage={() => setCurrentPage(5)} />
          </div>
        ),
      });
    }

    return items;
  }, [
    calculate,
    closeAndLogout,
    closeDiaryBook,
    form.birthDate,
    form.birthTime,
    form.personName,
    form.place,
    isAuthenticated,
    isOpeningDiary,
    isOpeningTarot,
    diaryInitialPageIndex,
    diaryInitialSelectedDate,
    loading,
    navigate,
    openAkashicIndex,
    openDiaryBook,
    openTarotReadingFromDiary,
    openTarotIndex,
    privateGroupedEntries,
    publicGroupedEntries,
    openProfileForEdit,
    result,
    saveProfile,
    selectedProfile,
    tarotBookReading,
  ]);

  const pageCount = pages.length;

  useEffect(() => {
    setCurrentPage((current) => Math.min(current, pageCount - 1));
  }, [pageCount]);

  useEffect(() => {
    if (!pendingBookSection) return undefined;

    const frameId = window.requestAnimationFrame(() => {
      setCurrentPage(2);
      setPendingBookSection(null);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [pendingBookSection]);

  return (
    <>
      <style>{sharedStyles}</style>

      <div className={`app-shell ${isOpeningDiary ? "app-shell-diary-opening" : ""}`}>
        {error ? <div className="chart-error">{error}</div> : null}

        <StarrySky className="book-starry-sky" tone="warm" shootingAngle={-18} />

        <div className="page-wrap">
          <div className="book-shell">
            <div className="book">
              {pages.map((page, index) => (
                <section
                  key={page.key}
                  className={`page page-${page.key} ${index === currentPage ? "active" : "hidden"}`}
                >
                  <h2 className="reading-title">{page.title}</h2>
                  {page.subtitle ? <p className="reading-subtitle">{page.subtitle}</p> : null}
                  {page.content}
                </section>
              ))}

              {isOpeningDiary ? (
                <div className="book-nav">
                  <button
                    onClick={diaryNavState?.goBack ?? closeDiaryBook}
                    disabled={!diaryNavState?.goBack}
                    type="button"
                  >
                    {"<"}
                  </button>
                  {diaryNavState?.goForward ? (
                    <button
                      onClick={diaryNavState.goForward}
                      type="button"
                    >
                      {">"}
                    </button>
                  ) : null}
                </div>
              ) : null}

              {isOpeningTarot ? (
                <div className="book-nav">
                  <button
                    onClick={() => {
                      if (currentPage === 4 && tarotReturnToDiaryDate) {
                        returnToDiaryListFromTarot();
                        return;
                      }
                      if (currentPage > 2) {
                        setCurrentPage((page) => page - 1);
                        return;
                      }
                      closeTarotIndex();
                    }}
                    type="button"
                  >
                    {"<"}
                  </button>
                  {currentPage === 2 ? (
                    <button onClick={() => setCurrentPage(3)} type="button">
                      {">"}
                    </button>
                  ) : null}
                  {(currentPage === 3 || currentPage === 4 || currentPage === 5) && tarotBookReading ? (
                    <button onClick={() => setCurrentPage((page) => page + 1)} type="button">
                      {">"}
                    </button>
                  ) : null}
                </div>
              ) : null}

              {!isOpeningDiary && !isOpeningTarot ? (
                <div className="book-nav">
                  <button
                    onClick={() => setCurrentPage((page) => Math.max(0, page - 1))}
                    disabled={currentPage === 0}
                    type="button"
                  >
                    {"<"}
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage((page) => Math.min(pageCount - 1, page + 1))
                    }
                    disabled={currentPage === pageCount - 1}
                    type="button"
                  >
                    {">"}
                  </button>
                </div>
              ) : null}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

function TarotConsultPanel({ reading, onBackToMessage }) {
  const initialMessages = useMemo(() => [
    {
      role: "assistant",
      content: "Ask about this saved reading. I will stay close to the cards, the question, and the message already on the page.",
    },
  ], []);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Ask about this saved reading. I will stay close to the cards, the question, and the message already on the page.",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!reading?.id) {
      setMessages(initialMessages);
      return undefined;
    }

    let active = true;
    setLoadingHistory(true);
    setError("");
    apiFetch(`/api/tarot/readings/${reading.id}/consult/`)
      .then((data) => {
        if (!active) return;
        setMessages(data.messages?.length ? data.messages : initialMessages);
      })
      .catch((err) => {
        if (!active) return;
        setMessages(initialMessages);
        setError(err.message || "Could not load the consult history.");
      })
      .finally(() => {
        if (active) setLoadingHistory(false);
      });

    return () => {
      active = false;
    };
  }, [initialMessages, reading?.id]);

  const sendMessage = async (event) => {
    event.preventDefault();
    const message = input.trim();
    if (!message || !reading?.id || sending) return;

    setMessages((current) => [...current, { role: "user", content: message }]);
    setInput("");
    setError("");
    setSending(true);
    try {
      const data = await apiFetch(`/api/tarot/readings/${reading.id}/consult/`, {
        method: "POST",
        body: JSON.stringify({ message }),
      });
      setMessages(data.messages?.length ? data.messages : (current) => [...current, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setError(err.message || "Could not open the consult.");
    } finally {
      setSending(false);
    }
  };

  if (!reading) {
    return (
      <div className="tarot-consult-empty">
        <p>Draw cards first, then the consult page can open around that saved reading.</p>
        <button type="button" onClick={onBackToMessage}>Back to message</button>
      </div>
    );
  }

  return (
    <div className="tarot-consult-panel">
      <div className="tarot-consult-summary">
        <div>
          <p className="tarot-consult-kicker">{reading.spreadType}</p>
          <h3>{reading.question || "Untitled reading"}</h3>
        </div>
        <button type="button" onClick={onBackToMessage}>Message</button>
      </div>

      <div className="tarot-consult-messages" aria-live="polite">
        {loadingHistory ? <div className="tarot-consult-message tarot-consult-message-assistant">Loading previous consult...</div> : null}
        {messages.map((message, index) => (
          <div className={`tarot-consult-message tarot-consult-message-${message.role}`} key={message.id ?? `${message.role}-${index}`}>
            {message.content}
          </div>
        ))}
        {sending ? <div className="tarot-consult-message tarot-consult-message-assistant">Listening to the reading...</div> : null}
      </div>

      {error ? <p className="tarot-consult-error">{error}</p> : null}

      <form className="tarot-consult-form" onSubmit={sendMessage}>
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about this reading"
          rows={3}
        />
        <button type="submit" disabled={!input.trim() || sending}>
          {sending ? "SENDING..." : "SEND"}
        </button>
      </form>
    </div>
  );
}

function ProfileIndex({ entries, emptyMessage, interactive = false, onSelect, note }) {
  return (
    <div className="index-book-page">
      {note ? <p className="index-note">{note}</p> : null}
      <div className="index-body">
        {entries.length === 0 ? (
          <p className="reading-muted">{emptyMessage}</p>
        ) : (
          entries.map(([initial, items]) => (
            <section className="index-group" key={initial}>
              <h3 className="index-letter">{initial}</h3>
              <div className="index-list">
                {items.map((profile) =>
                  interactive ? (
                    <button
                      className="index-name-btn"
                      key={profile.id}
                      type="button"
                      disabled={!interactive}
                      onClick={() => onSelect?.(profile)}
                    >
                      <span className="index-name">{profile.personName}</span>
                      <span className="index-meta">{profile.birthDate}</span>
                    </button>
                  ) : (
                    <div className="index-name-btn index-name-btn-static" key={profile.id}>
                      <span className="index-name">{profile.personName}</span>
                      <span className="index-meta">{profile.birthDate}</span>
                    </div>
                  ),
                )}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}

const sharedStyles = `
  * {
    box-sizing: border-box;
  }

  html, body, #root {
    margin: 0;
    min-height: 100%;
    font-family: "Segoe UI", "Hiragino Sans", "Yu Gothic UI", sans-serif;
    background:
      radial-gradient(circle at 15% 20%, rgba(196, 136, 255, 0.18), transparent 26%),
      radial-gradient(circle at 82% 16%, rgba(126, 214, 255, 0.16), transparent 24%),
      radial-gradient(circle at 50% 80%, rgba(117, 138, 255, 0.14), transparent 28%),
      linear-gradient(180deg, #161b2d 0%, #252b46 45%, #32385a 100%);
    color: #f2f4ff;
  }

  .app-shell {
    position: relative;
    min-height: 100vh;
    min-height: 100dvh;
    overflow: hidden;
    background:
      radial-gradient(circle at 15% 20%, rgba(196, 136, 255, 0.18), transparent 26%),
      radial-gradient(circle at 82% 16%, rgba(126, 214, 255, 0.16), transparent 24%),
      radial-gradient(circle at 50% 80%, rgba(117, 138, 255, 0.14), transparent 28%),
      linear-gradient(180deg, #161b2d 0%, #252b46 45%, #32385a 100%);
    transition: background 720ms ease, filter 720ms ease;
  }

  .app-shell::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(circle at 17% 18%, rgba(151, 91, 218, 0.16), transparent 24%),
      radial-gradient(circle at 78% 18%, rgba(255, 147, 97, 0.13), transparent 22%),
      radial-gradient(circle at 42% 78%, rgba(190, 73, 104, 0.12), transparent 26%),
      linear-gradient(180deg, rgba(5, 7, 18, 0.34), rgba(5, 7, 18, 0.94));
    opacity: 0;
    transition: opacity 720ms ease;
    z-index: 0;
  }

  .app-shell-diary-opening::before {
    opacity: 1;
  }

  .app-shell-diary-opening .book-starry-sky {
    opacity: 0.88;
    transition: opacity 720ms ease;
  }

  .page-wrap {
    position: relative;
    z-index: 1;
    min-height: 100%;
    width: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
  }

  .chart-error {
    width: min(760px, calc(100vw - 28px));
    margin: 18px auto 0;
    padding: 12px 16px;
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(167, 70, 93, 0.16);
    color: #ffdce4;
    backdrop-filter: blur(6px);
  }

  .book-shell {
    width: min(680px, calc(100vw - 40px), calc((100dvh - 24px) * 0.78));
    height: calc(100vh - 24px);
    height: calc(100dvh - 24px);
    min-height: min(680px, calc(100dvh - 24px));
    max-height: 900px;
    margin: 8px auto 8px;
    padding-top: 0;
    display: flex;
    flex-direction: column;
    perspective: 1600px;
    position: relative;
    overflow: hidden;
  }

  .book {
    position: relative;
    flex: 1;
    min-height: 0;
    width: 100%;
  }

  .book::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 34px;
    z-index: 3;
    border-radius: 8px;
    border: 1.5px solid rgba(255,255,255,0.24);
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
      0 0 16px rgba(140, 160, 255, 0.68),
      0 0 28px rgba(216, 196, 255, 0.22),
      inset 0 0 8px rgba(255,255,255,0.28);
    animation: spineSparkle 3s ease-in-out infinite alternate;
  }

  .book::after {
    content: "";
    position: absolute;
    left: 27px;
    top: 0;
    bottom: 0;
    width: 10px;
    background: linear-gradient(to right, rgba(0,0,0,0.3), rgba(255,255,255,0.18), rgba(255,255,255,0.04));
    box-shadow: 1px 0 0 rgba(255,255,255,0.14), -1px 0 0 rgba(0,0,0,0.22);
    z-index: 3;
  }

  @keyframes spineSparkle {
    0% {
      opacity: 0.65;
      filter: brightness(0.92);
    }
    100% {
      opacity: 1;
      filter: brightness(1.28);
    }
  }

  .page {
    position: absolute;
    inset: 0;
    padding: 26px 28px 66px 40px;
    margin-left: 0;
    border-radius: 18px;
    background:
      radial-gradient(circle at top left, rgba(143, 168, 255, 0.08), transparent 28%),
      linear-gradient(135deg, rgba(31, 34, 56, 0.18), rgba(42, 47, 77, 0.12));
    color: #f5f7ff;
    box-shadow:
      0 14px 34px rgba(0,0,0,0.18),
      0 0 0 1px rgba(255,255,255,0.08),
      0 0 24px rgba(216,196,255,0.12),
      inset 0 1px 0 rgba(255,255,255,0.08),
      inset 0 0 30px rgba(255,255,255,0.025);
    border: 2px solid rgba(255,255,255,0.28);
    backdrop-filter: blur(2px);
    transform-origin: left center;
    backface-visibility: hidden;
    transition: transform 0.8s ease, opacity 0.45s ease;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .page.hidden {
    opacity: 0;
    pointer-events: none;
    transform: rotateY(-100deg);
  }

  .page.active {
    opacity: 1;
    transform: rotateY(0deg);
    z-index: 2;
  }

  .diary-entry-page {
    position: relative;
    flex: 1;
    min-height: 0;
    display: grid;
    place-items: center;
    overflow: hidden;
    border-radius: 18px;
    background:
      radial-gradient(circle at 18% 18%, rgba(196, 136, 255, 0.16), transparent 26%),
      radial-gradient(circle at 82% 18%, rgba(126, 214, 255, 0.12), transparent 24%),
      linear-gradient(180deg, rgba(7, 11, 23, 0.42), rgba(13, 20, 41, 0.92));
  }

  .book-diary-content {
    height: 100%;
    min-height: 0;
    margin: -12px -14px -70px -22px;
    color: #fff;
  }

  .book-diary-content .reading-title,
  .book-diary-content .reading-subtitle {
    display: none;
  }

  .book-diary-content .diary-page {
    border-radius: 20px;
    box-shadow:
      0 12px 34px rgba(0,0,0,0.26),
      inset 0 1px 0 rgba(255,255,255,0.06);
  }

  .tarot-index-page {
    position: relative;
    flex: 1;
    min-height: 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-content: center;
    max-width: 520px;
    margin: 0 auto;
    gap: 14px;
    padding: 24px 4px 10px 18px;
  }

  .book-tarot-reading-content,
  .book-tarot-result-content {
    flex: 1;
    min-height: 0;
    margin: -8px -10px -40px -18px;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 4px 10px 66px 26px;
    scrollbar-width: none;
  }

  .book-tarot-reading-content {
    padding-top: 0;
  }

  .book-tarot-reading-content::-webkit-scrollbar,
  .book-tarot-result-content::-webkit-scrollbar,
  .book-tarot-message-scroll::-webkit-scrollbar {
    display: none;
  }

  .book-tarot-reading-content .tarot-reading-embedded {
    align-items: start;
    width: 100%;
    min-width: 0;
    max-width: 100%;
  }

  .book-tarot-reading-content .tarot-reading-sheet {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    width: calc(100% + 12px);
    min-height: min(100%, 502px);
    overflow: hidden;
    padding: 0;
    border: none;
    background: transparent;
    box-shadow: none;
  }

  .book-tarot-message-scroll {
    max-height: 100%;
    overflow-y: auto;
    padding-left: 12px;
    padding-right: 6px;
    scrollbar-width: none;
  }

  .book-tarot-result-content .tarot-reading-card-live {
    padding: 8px;
    border-radius: 12px;
  }

  .book-tarot-result-content .tarot-reading-card-face {
    margin-bottom: 7px;
    border-radius: 9px;
  }

  .book-tarot-result-content .tarot-reading-card-live h3 {
    margin-top: 7px;
    font-size: 14px;
  }

  .book-tarot-result-content .tarot-reading-card-live p:last-child {
    margin-top: 7px;
    font-size: 12px;
    line-height: 1.4;
  }

  .book-tarot-result-content > div {
    gap: 9px;
  }

  .book-tarot-message-scroll > div {
    border-color: transparent;
    background: transparent;
    padding: 0;
  }

  .book-tarot-message-scroll > div > p:first-child {
    display: none;
  }

  .book-tarot-message-scroll > div > div {
    font-size: 16px;
    line-height: 1.9;
    color: rgba(245,247,255,0.93);
    text-align: justify;
  }

  .book-tarot-consult-content {
    display: flex;
    padding-bottom: 82px;
  }

  .tarot-consult-panel {
    min-height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: auto auto minmax(0, 1fr) auto auto;
    gap: 10px;
    color: #f5f7ff;
  }

  .tarot-consult-summary {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 16px;
    background: rgba(255,255,255,0.07);
    padding: 12px;
  }

  .tarot-consult-summary h3 {
    margin: 4px 0 0;
    color: #fff;
    font-size: 16px;
    line-height: 1.4;
  }

  .tarot-consult-summary button,
  .tarot-consult-empty button {
    flex: 0 0 auto;
    border: 1px solid rgba(255,255,255,0.16);
    border-radius: 999px;
    background: rgba(255,255,255,0.08);
    color: #fff;
    padding: 8px 12px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
  }

  .tarot-consult-kicker {
    margin: 0;
    color: #f4c2c2;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .tarot-consult-messages {
    min-height: 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0 4px 8px 0;
    scrollbar-width: none;
  }

  .tarot-consult-messages::-webkit-scrollbar {
    display: none;
  }

  .tarot-consult-message {
    max-width: 92%;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 16px;
    padding: 10px 12px;
    white-space: pre-line;
    font-size: 13px;
    line-height: 1.65;
  }

  .tarot-consult-message-assistant {
    align-self: flex-start;
    background: rgba(255,255,255,0.08);
    color: rgba(245,247,255,0.92);
  }

  .tarot-consult-message-user {
    align-self: flex-end;
    background: rgba(244,194,194,0.16);
    color: #fff;
  }

  .tarot-consult-error {
    margin: 0;
    border: 1px solid rgba(255,126,126,0.36);
    border-radius: 12px;
    background: rgba(255,126,126,0.12);
    color: #ffd6d6;
    padding: 10px 12px;
    font-size: 13px;
  }

  .tarot-consult-form {
    display: grid;
    grid-template-columns: minmax(0, 4fr) minmax(78px, 1fr);
    gap: 8px;
    align-items: stretch;
    margin-bottom: 26px;
  }

  .tarot-consult-form textarea {
    width: 100%;
    min-height: 66px;
    resize: vertical;
    border: 1px solid rgba(255,255,255,0.14);
    border-radius: 14px;
    background: rgba(255,255,255,0.08);
    color: #fff;
    padding: 10px 12px;
    outline: none;
  }

  .tarot-consult-form button {
    position: relative;
    overflow: hidden;
    min-height: 42px;
    width: 100%;
    border: 1px solid rgba(244,194,194,0.52);
    border-radius: 12px;
    background:
      radial-gradient(circle at 24% 22%, rgba(255,255,255,0.28), transparent 24%),
      linear-gradient(135deg, rgba(244,194,194,0.26), rgba(216,196,255,0.14));
    color: #ffe4ec;
    padding: 0 14px;
    font-weight: 800;
    letter-spacing: 0.08em;
    cursor: pointer;
    box-shadow:
      0 10px 24px rgba(244,194,194,0.14),
      inset 0 1px 0 rgba(255,255,255,0.16);
    transition:
      transform 0.18s ease,
      border-color 0.18s ease,
      background 0.18s ease,
      box-shadow 0.18s ease,
      filter 0.18s ease;
  }

  .tarot-consult-form button::after {
    content: "";
    position: absolute;
    inset: 8px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.12);
    pointer-events: none;
  }

  .tarot-consult-form button:hover:not(:disabled) {
    cursor: pointer;
    transform: translateY(-1px);
    border-color: rgba(255,232,246,0.72);
    background:
      radial-gradient(circle at 24% 22%, rgba(255,255,255,0.34), transparent 24%),
      linear-gradient(135deg, rgba(244,194,194,0.34), rgba(216,196,255,0.22));
    box-shadow:
      0 14px 30px rgba(244,194,194,0.22),
      0 0 18px rgba(255,255,255,0.12),
      inset 0 1px 0 rgba(255,255,255,0.2);
  }

  .tarot-consult-form button:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }

  .tarot-consult-empty {
    margin: auto;
    max-width: 420px;
    display: grid;
    gap: 16px;
    place-items: center;
    text-align: center;
    color: rgba(245,247,255,0.9);
  }

  .book-tarot-reading-content section,
  .book-tarot-result-content section {
    border-radius: 16px;
    padding: 12px;
  }

  .book-tarot-reading-content section:first-child:not(.tarot-reading-sheet) {
    padding: 0 8px 8px;
  }

  .book-tarot-reading-content .min-h-\\[420px\\],
  .book-tarot-result-content .min-h-\\[420px\\] {
    min-height: 280px;
  }

  .tarot-index-card {
    min-height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 8px;
    border: 1px solid rgba(255,255,255,0.16);
    border-radius: 16px;
    background:
      radial-gradient(circle at 50% 24%, rgba(255, 232, 176, 0.18), transparent 28%),
      linear-gradient(150deg, rgba(46, 38, 76, 0.82), rgba(244, 194, 194, 0.18));
    color: #fff;
    text-align: left;
    padding: 16px;
    cursor: pointer;
    box-shadow:
      0 16px 36px rgba(0,0,0,0.2),
      inset 0 1px 0 rgba(255,255,255,0.08);
    transition:
      transform 0.2s ease,
      border-color 0.2s ease,
      background 0.2s ease,
      box-shadow 0.2s ease;
  }

  .tarot-index-art {
    position: relative;
    width: 100%;
    aspect-ratio: 1.12;
    margin-bottom: auto;
    overflow: hidden;
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.16);
    background:
      radial-gradient(circle at 34% 24%, rgba(255, 248, 211, 0.3), transparent 24%),
      radial-gradient(circle at 72% 76%, rgba(126, 214, 255, 0.18), transparent 28%),
      linear-gradient(150deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03));
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.1),
      0 12px 26px rgba(0,0,0,0.16);
  }

  .tarot-index-art::before {
    content: "";
    position: absolute;
    left: 12%;
    right: 12%;
    bottom: 10%;
    height: 14%;
    border-radius: 999px;
    background: radial-gradient(ellipse, rgba(244, 194, 194, 0.22), transparent 72%);
    filter: blur(2px);
  }

  .tarot-index-art::after {
    content: "";
    position: absolute;
    inset: 10px;
    border-radius: 12px;
    border: 1px dashed rgba(255,255,255,0.16);
    pointer-events: none;
  }

  .tarot-index-art span {
    position: absolute;
    display: block;
  }

  .tarot-art-card,
  .tarot-art-stack {
    width: 32%;
    height: 56%;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.48);
    box-shadow:
      0 12px 18px rgba(0,0,0,0.18),
      inset 0 0 14px rgba(255,255,255,0.12);
  }

  .tarot-art-card-one {
    left: 25%;
    top: 27%;
    background: linear-gradient(150deg, rgba(164, 138, 255, 0.68), rgba(255, 218, 180, 0.28));
    transform: rotate(-13deg);
  }

  .tarot-art-card-two {
    right: 25%;
    top: 19%;
    background:
      radial-gradient(circle at 50% 34%, rgba(255, 239, 183, 0.6), transparent 22%),
      linear-gradient(150deg, rgba(47, 39, 78, 0.94), rgba(244, 194, 194, 0.36));
    transform: rotate(10deg);
  }

  .tarot-art-card-one::before,
  .tarot-art-card-two::before,
  .tarot-art-stack-one::before,
  .tarot-art-stack-two::before,
  .tarot-art-stack-three::before {
    content: "";
    position: absolute;
    inset: 8px;
    border-radius: 7px;
    border: 1px solid rgba(255,255,255,0.24);
  }

  .tarot-art-moon {
    right: 34%;
    top: 30%;
    width: 24px;
    height: 24px;
    border-radius: 999px;
    background: #ffedb5;
    box-shadow: 0 0 18px rgba(255, 232, 168, 0.58);
  }

  .tarot-art-moon::after {
    content: "";
    position: absolute;
    left: 8px;
    top: -2px;
    width: 24px;
    height: 24px;
    border-radius: 999px;
    background: rgba(52, 42, 80, 0.95);
  }

  .tarot-art-face {
    left: 52%;
    top: 42%;
    width: 38px;
    height: 22px;
    transform: translateX(-50%);
    z-index: 3;
  }

  .tarot-art-face::before,
  .tarot-art-face::after {
    content: "";
    position: absolute;
    top: 2px;
    width: 5px;
    height: 5px;
    border-radius: 999px;
    background: rgba(255,255,255,0.82);
    box-shadow: 0 0 8px rgba(255,255,255,0.45);
  }

  .tarot-art-face::before {
    left: 8px;
  }

  .tarot-art-face::after {
    right: 8px;
  }

  .tarot-art-face {
    border-bottom: 2px solid rgba(255,255,255,0.66);
    border-radius: 0 0 999px 999px;
  }

  .tarot-art-spark {
    width: 9px;
    height: 9px;
    background: #fff;
    clip-path: polygon(50% 0, 61% 36%, 100% 50%, 61% 64%, 50% 100%, 39% 64%, 0 50%, 39% 36%);
    box-shadow: 0 0 12px rgba(255,255,255,0.7);
  }

  .tarot-art-spark-one {
    left: 22%;
    top: 19%;
  }

  .tarot-art-spark-two {
    right: 20%;
    bottom: 22%;
    width: 7px;
    height: 7px;
    opacity: 0.78;
  }

  .tarot-art-spark-three {
    left: 17%;
    bottom: 22%;
    width: 8px;
    height: 8px;
  }

  .tarot-art-spark-four {
    right: 18%;
    top: 20%;
    width: 8px;
    height: 8px;
  }

  .tarot-art-bow {
    width: 34px;
    height: 18px;
    z-index: 4;
  }

  .tarot-art-bow::before,
  .tarot-art-bow::after {
    content: "";
    position: absolute;
    top: 3px;
    width: 15px;
    height: 12px;
    border-radius: 10px 10px 3px 10px;
    background: linear-gradient(135deg, #ffd6e8, #f4c2c2);
    box-shadow: 0 0 10px rgba(244, 194, 194, 0.32);
  }

  .tarot-art-bow::before {
    left: 1px;
    transform: rotate(-28deg);
  }

  .tarot-art-bow::after {
    right: 1px;
    transform: rotate(28deg) scaleX(-1);
  }

  .tarot-art-bow-reading {
    left: 50%;
    top: 14%;
    transform: translateX(-50%);
  }

  .tarot-art-bow-decks {
    left: 50%;
    bottom: 17%;
    transform: translateX(-50%);
  }

  .tarot-art-stack-one {
    left: 24%;
    top: 28%;
    background: linear-gradient(150deg, rgba(255, 210, 230, 0.46), rgba(117, 138, 255, 0.28));
    transform: rotate(-14deg);
  }

  .tarot-art-stack-two {
    left: 34%;
    top: 22%;
    background: linear-gradient(150deg, rgba(255, 239, 183, 0.42), rgba(216, 196, 255, 0.34));
    transform: rotate(-2deg);
  }

  .tarot-art-stack-three {
    right: 25%;
    top: 28%;
    background: linear-gradient(150deg, rgba(126, 214, 255, 0.36), rgba(244, 194, 194, 0.34));
    transform: rotate(12deg);
  }

  .tarot-art-gem {
    left: 50%;
    top: 45%;
    width: 24px;
    height: 24px;
    background: linear-gradient(135deg, #fff3b8, #f4c2c2);
    transform: translate(-50%, -50%) rotate(45deg);
    border-radius: 6px 2px 6px 2px;
    box-shadow: 0 0 18px rgba(255, 231, 166, 0.5);
  }

  .tarot-art-gem::before {
    content: "";
    position: absolute;
    inset: 6px;
    border-radius: 3px 1px 3px 1px;
    background: rgba(255,255,255,0.34);
  }

  .tarot-art-scroll {
    left: 22%;
    top: 20%;
    width: 56%;
    height: 62%;
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,0.38);
    background:
      linear-gradient(90deg, rgba(255,255,255,0.2) 0 14%, transparent 14%),
      linear-gradient(150deg, rgba(255, 248, 211, 0.34), rgba(244, 194, 194, 0.16));
    box-shadow:
      0 14px 24px rgba(0,0,0,0.18),
      inset 0 1px 0 rgba(255,255,255,0.14);
  }

  .tarot-art-seal {
    right: 25%;
    bottom: 22%;
    width: 26px;
    height: 26px;
    border-radius: 999px;
    background: radial-gradient(circle, #fff3b8 0 34%, #f4c2c2 36% 64%, rgba(244,194,194,0.2) 66%);
    box-shadow: 0 0 16px rgba(244, 194, 194, 0.42);
  }

  .tarot-art-heart {
    left: 27%;
    bottom: 24%;
    width: 17px;
    height: 17px;
    border-radius: 9px 9px 2px 9px;
    background: #ffd1df;
    transform: rotate(45deg);
    box-shadow: 0 0 14px rgba(255, 193, 214, 0.48);
  }

  .tarot-art-heart::before,
  .tarot-art-heart::after {
    content: "";
    position: absolute;
    width: 17px;
    height: 17px;
    border-radius: 999px;
    background: inherit;
  }

  .tarot-art-heart::before {
    left: -8px;
    top: 0;
  }

  .tarot-art-heart::after {
    left: 0;
    top: -8px;
  }

  .tarot-art-line {
    left: 38%;
    height: 2px;
    border-radius: 999px;
    background: rgba(255,255,255,0.46);
  }

  .tarot-art-line-one {
    top: 43%;
    width: 28%;
  }

  .tarot-art-line-two {
    top: 54%;
    width: 20%;
  }

  .tarot-index-card:hover {
    transform: translateY(-1px);
    border-color: rgba(255,255,255,0.3);
    background-color: rgba(255,255,255,0.12);
    box-shadow:
      0 18px 42px rgba(0,0,0,0.24),
      0 0 0 1px rgba(255,255,255,0.1) inset;
  }

  .tarot-index-card-subtle {
    opacity: 0.82;
  }

  .tarot-index-kicker {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(244, 194, 194, 0.92);
  }

  .tarot-index-card strong {
    font-size: 24px;
    line-height: 1.2;
  }

  .tarot-index-card span:last-child {
    font-size: 14px;
    line-height: 1.7;
    color: rgba(226, 231, 255, 0.78);
  }

  .diary-entry-page::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent),
      radial-gradient(circle at 50% 72%, rgba(255,255,255,0.12), transparent 34%);
    opacity: 0.58;
  }

  .diary-entry-cover {
    position: relative;
    width: min(260px, 64vw);
    aspect-ratio: 3 / 4;
    border-radius: 18px 12px 12px 18px;
    border: 1px solid rgba(255,255,255,0.14);
    background:
      linear-gradient(90deg, rgba(255,255,255,0.18) 0 12px, transparent 12px),
      radial-gradient(circle at 32% 24%, rgba(244, 194, 194, 0.2), transparent 22%),
      linear-gradient(135deg, #171d34, #252b4a 56%, #121827);
    box-shadow:
      0 26px 46px rgba(0,0,0,0.32),
      0 0 40px rgba(126, 214, 255, 0.1),
      inset 0 1px 0 rgba(255,255,255,0.08);
    transform: translateY(4px);
  }

  .diary-entry-moon {
    position: absolute;
    left: 50%;
    top: 22%;
    width: 58px;
    height: 58px;
    border-radius: 999px;
    transform: translateX(-50%);
    background: radial-gradient(circle, #fff8d9 0 32%, #f4c2c2 34% 48%, transparent 50%);
    box-shadow: 0 0 24px rgba(244, 194, 194, 0.26);
  }

  .diary-entry-line {
    position: absolute;
    left: 24%;
    right: 18%;
    height: 2px;
    border-radius: 999px;
    background: rgba(220, 228, 255, 0.42);
  }

  .diary-entry-line-one {
    top: 54%;
  }

  .diary-entry-line-two {
    top: 62%;
    right: 30%;
  }

  .diary-entry-ribbon {
    position: absolute;
    right: 24px;
    top: 0;
    width: 24px;
    height: 42%;
    background: linear-gradient(180deg, #f4c2c2, #d8c4ff);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%);
    box-shadow: 0 0 16px rgba(244, 194, 194, 0.22);
  }

  .page::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 42px;
    background: linear-gradient(to bottom, transparent, rgba(28, 31, 52, 0.9));
    pointer-events: none;
  }

  .reading-title {
    margin: 0 0 8px;
    padding-left: 10px;
    border-left: 3px solid #8fa8ff;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: #f7f8ff;
    text-shadow: 0 0 10px rgba(180, 190, 255, 0.24);
    flex-shrink: 0;
  }

  .reading-subtitle {
    margin: 0 0 12px;
    padding-left: 10px;
    font-size: 12px;
    letter-spacing: 0.14em;
    color: rgba(220, 228, 255, 0.72);
    text-transform: uppercase;
    flex-shrink: 0;
  }

  .index-book-page {
    height: 100%;
    min-height: 0;
    display: flex;
    flex-direction: column;
    padding: 6px 6px 0;
    border-radius: 18px;
    background: transparent;
    backdrop-filter: none;
  }

  .index-note {
    margin: 0 0 12px;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(220, 228, 255, 0.72);
  }

  .index-body,
  .reading-body {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .index-body::-webkit-scrollbar,
  .reading-body::-webkit-scrollbar {
    display: none;
  }

  .reading-muted {
    margin: 0;
    color: rgba(220, 228, 255, 0.72);
  }

  .index-group {
    margin-bottom: 22px;
  }

  .index-letter {
    margin: 0 0 10px;
    padding-bottom: 5px;
    font-size: 20px;
    font-weight: 600;
    color: #d9deff;
    border-bottom: 1px solid rgba(180, 190, 255, 0.22);
    text-shadow: 0 0 8px rgba(170, 180, 255, 0.18);
  }

  .index-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 8px 12px;
  }

  .index-name-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 8px 11px;
    border: 1px solid rgba(180, 190, 255, 0.16);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.04);
    color: #f5f7ff;
    cursor: pointer;
    transition:
      transform 0.2s ease,
      background 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      filter 0.2s ease;
    text-align: left;
    backdrop-filter: blur(3px);
  }

  .index-name-btn:hover {
    transform: translateY(-1px);
    background: rgba(255,255,255,0.1);
    border-color: rgba(220, 228, 255, 0.42);
    filter: brightness(1.08);
    box-shadow:
      0 8px 20px rgba(60, 80, 170, 0.18),
      0 0 0 1px rgba(255,255,255,0.12) inset,
      0 0 18px rgba(255,255,255,0.1);
  }

  .index-name-btn-static {
    cursor: default;
  }

  .index-name-btn-static:hover {
    transform: none;
    background: rgba(255,255,255,0.04);
    border-color: rgba(180, 190, 255, 0.16);
    box-shadow: none;
  }

  .index-name-btn:disabled {
    opacity: 0.65;
    cursor: default;
    transform: none;
    box-shadow: none;
  }

  .index-name {
    font-size: 13px;
    font-weight: 500;
    color: #ffffff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .index-meta {
    flex-shrink: 0;
    font-size: 11px;
    color: rgba(215, 222, 255, 0.65);
  }

  .guest-card {
    border-radius: 18px;
    background:ze: 12px;
    color: rgba(215, 222, 255, 0.65);
    border: none;
    padding: 6px 6px 0;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .guest-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    margin-bottom: 12px;
    color: rgba(220, 228, 255, 0.82);
    letter-spacing: 0.18em;
    font-size: 11px;
    text-transform: uppercase;
  }

  .guest-title {
    margin: 0;
    font-size: clamp(24px, 3.4vw, 36px);
    line-height: 1.15;
    color: #f7f8ff;
  }

  .guest-subtitle {
    margin: 7px 0 0;
    font-size: clamp(17px, 2.4vw, 18px);
    line-height: 1.15;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: #fff6fb;
    text-shadow: 0 0 10px rgba(189, 171, 255, 0.16);
  }

  .guest-text {
    margin: 14px 0 0;
    max-width: 56rem;
    line-height: 1.75;
    color: rgba(245,247,255,0.9);
    font-size: 13px;
  }

  .guest-actions {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .page-intro .guest-actions {
    position: absolute;
    top: 22px;
    right: 26px;
    margin: 0;
    z-index: 5;
  }

  .page-intro .guest-button {
    width: 44px;
    height: 40px;
    padding: 0;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.14);
    background: rgba(255,255,255,0.08);
    box-shadow: 0 10px 24px rgba(0,0,0,0.18);
    color: #f5f7ff;
    font-size: 20px;
    line-height: 1;
    letter-spacing: 0;
    transition:
      transform 0.2s ease,
      background 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      filter 0.2s ease;
  }

  .page-intro .guest-button:hover {
    transform: translateY(-1px);
    filter: brightness(1.08);
    background: rgba(255,255,255,0.18);
    border-color: rgba(255,255,255,0.34);
    box-shadow:
      0 14px 28px rgba(0,0,0,0.22),
      0 0 0 1px rgba(255,255,255,0.18) inset,
      0 0 18px rgba(255,255,255,0.14);
  }

  .guest-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 16px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.08);
    background: linear-gradient(135deg, #7f8cff, #97a8ff);
    color: white;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
  }

  .chooser-page {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 14px;
    padding: 0;
  }

  .chooser-header {
    max-width: 56rem;
  }

  .chooser-kicker {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    margin: 0 0 10px;
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(220, 228, 255, 0.78);
  }

  .chooser-title {
    margin: 0;
    font-size: clamp(22px, 3vw, 30px);
    line-height: 1.1;
    color: #f7f8ff;
  }

  .chooser-text {
    margin: 7px 0 0;
    max-width: 44rem;
    font-size: 13px;
    line-height: 1.6;
    color: rgba(220, 228, 255, 0.78);
  }

  .chooser-grid {
    display: grid;
    gap: 10px;
    grid-template-columns: minmax(0, 1fr);
    padding-left: 12px;
  }

  .chooser-card {
    display: grid;
    grid-template-columns: minmax(86px, 112px) minmax(0, 1fr);
    align-items: center;
    gap: 12px;
    width: 100%;
    text-align: left;
    border-radius: 18px;
    border: 1px solid rgba(255,255,255,0.18);
    background: rgba(255,255,255,0.08);
    padding: 11px 13px;
    color: #fff;
    box-shadow: 0 16px 40px rgba(0,0,0,0.18);
    cursor: pointer;
    transition:
      transform 0.2s ease,
      background 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      filter 0.2s ease;
  }

  .chooser-card:hover {
    transform: translateY(-2px);
    border-color: rgba(255,255,255,0.2);
    background: rgba(255,255,255,0.1);
    filter: brightness(1.03);
    box-shadow:
      0 10px 22px rgba(127, 140, 255, 0.12),
      0 18px 44px rgba(0,0,0,0.2),
      0 0 0 1px rgba(255,255,255,0.08) inset,
      0 0 26px rgba(255,255,255,0.08);
  }

  .chooser-media {
    min-width: 0;
  }

  .chooser-media-frame {
    position: relative;
    aspect-ratio: 4 / 3;
    width: 100%;
    overflow: hidden;
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.03);
    background: transparent;
    backdrop-filter: blur(14px);
    box-shadow:
      inset 0 0 0 1px rgba(255,255,255,0.04),
      0 0 18px rgba(255,255,255,0.03);
  }

  .chooser-media-frame::before {
    content: "";
    position: absolute;
    inset: 8px;
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.05);
    background: none;
    box-shadow: 0 0 18px rgba(255,255,255,0.04);
    filter: blur(1.5px);
    opacity: 0.75;
  }

  .chooser-media-glow {
    position: absolute;
    inset: -16px;
    border-radius: 28px;
    background: radial-gradient(circle at center, rgba(255,255,255,0.035), transparent 68%);
    filter: blur(22px);
    opacity: 0.28;
  }

  .chooser-media-chart::before {
    background:
      linear-gradient(180deg, rgba(127,140,255,0.16), rgba(255,255,255,0.04)),
      radial-gradient(circle at 35% 25%, rgba(175, 202, 255, 0.18), transparent 36%),
      radial-gradient(circle at 70% 78%, rgba(196, 91, 214, 0.12), transparent 38%);
  }

  .chooser-media-diary::before {
    background:
      linear-gradient(180deg, rgba(255, 210, 230, 0.16), rgba(255,255,255,0.04)),
      radial-gradient(circle at 30% 28%, rgba(255, 255, 255, 0.18), transparent 36%),
      radial-gradient(circle at 72% 76%, rgba(116, 140, 255, 0.12), transparent 38%);
  }

  .chooser-media-tarot::before {
    background:
      linear-gradient(180deg, rgba(244, 194, 194, 0.18), rgba(255,255,255,0.04)),
      radial-gradient(circle at 38% 26%, rgba(255, 232, 176, 0.18), transparent 36%),
      radial-gradient(circle at 70% 78%, rgba(174, 120, 255, 0.14), transparent 38%);
  }

  .chooser-illustration {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
  }

  .chooser-illustration span {
    position: absolute;
    display: block;
  }

  .chart-orbit {
    left: 50%;
    top: 50%;
    border-radius: 999px;
    border: 1px solid rgba(244, 247, 255, 0.56);
    transform: translate(-50%, -50%);
    box-shadow: 0 0 16px rgba(169, 190, 255, 0.18);
  }

  .chart-orbit-outer {
    width: 68%;
    aspect-ratio: 1;
  }

  .chart-orbit-inner {
    width: 38%;
    aspect-ratio: 1;
    border-color: rgba(244, 194, 194, 0.54);
  }

  .chart-illustration::before,
  .chart-illustration::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 62%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.54), transparent);
    transform: translate(-50%, -50%) rotate(28deg);
  }

  .chart-illustration::after {
    transform: translate(-50%, -50%) rotate(118deg);
  }

  .chart-dot {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: #fff6d6;
    box-shadow: 0 0 14px rgba(255, 239, 175, 0.62);
  }

  .chart-dot-one {
    left: 28%;
    top: 27%;
  }

  .chart-dot-two {
    right: 24%;
    top: 39%;
    width: 8px;
    height: 8px;
    background: #dce7ff;
  }

  .chart-dot-three {
    left: 46%;
    bottom: 22%;
    width: 7px;
    height: 7px;
    background: #ffd6e8;
  }

  .diary-book {
    left: 24%;
    top: 19%;
    width: 50%;
    height: 64%;
    border-radius: 12px 16px 16px 12px;
    border: 1px solid rgba(255,255,255,0.62);
    background:
      linear-gradient(90deg, rgba(255,255,255,0.16) 0 14%, transparent 14%),
      linear-gradient(145deg, rgba(255, 202, 224, 0.64), rgba(156, 179, 255, 0.26));
    box-shadow:
      0 16px 28px rgba(0,0,0,0.16),
      inset 0 0 18px rgba(255,255,255,0.18);
  }

  .diary-ribbon {
    left: 33%;
    top: 18%;
    width: 8px;
    height: 58%;
    border-radius: 999px;
    background: linear-gradient(180deg, #fff0a8, #f4a9c6);
    box-shadow: 0 0 14px rgba(255, 226, 150, 0.4);
  }

  .diary-line {
    left: 44%;
    width: 22%;
    height: 2px;
    border-radius: 999px;
    background: rgba(255,255,255,0.58);
  }

  .diary-line-one {
    top: 42%;
  }

  .diary-line-two {
    top: 53%;
    width: 16%;
  }

  .diary-heart {
    right: 21%;
    bottom: 23%;
    width: 14px;
    height: 14px;
    border-radius: 8px 8px 2px 8px;
    background: #ffd1df;
    transform: rotate(45deg);
    box-shadow: 0 0 14px rgba(255, 193, 214, 0.5);
  }

  .diary-heart::before,
  .diary-heart::after {
    content: "";
    position: absolute;
    width: 14px;
    height: 14px;
    border-radius: 999px;
    background: inherit;
  }

  .diary-heart::before {
    left: -7px;
    top: 0;
  }

  .diary-heart::after {
    left: 0;
    top: -7px;
  }

  .tarot-card {
    width: 38%;
    height: 66%;
    border-radius: 13px;
    border: 1px solid rgba(255,255,255,0.62);
    box-shadow:
      0 18px 30px rgba(0,0,0,0.18),
      inset 0 0 18px rgba(255,255,255,0.14);
  }

  .tarot-card-back {
    left: 24%;
    top: 20%;
    background: linear-gradient(150deg, rgba(166, 137, 255, 0.46), rgba(255, 212, 156, 0.2));
    transform: rotate(-10deg);
  }

  .tarot-card-front {
    right: 24%;
    top: 16%;
    background:
      radial-gradient(circle at 50% 36%, rgba(255, 239, 183, 0.44), transparent 22%),
      linear-gradient(150deg, rgba(46, 38, 76, 0.86), rgba(244, 194, 194, 0.3));
    transform: rotate(8deg);
  }

  .tarot-card-front::before {
    content: "";
    position: absolute;
    inset: 10px;
    border-radius: 9px;
    border: 1px solid rgba(255,255,255,0.28);
  }

  .tarot-moon {
    right: 33%;
    top: 28%;
    width: 22px;
    height: 22px;
    border-radius: 999px;
    background: #ffe9a8;
    box-shadow: 0 0 18px rgba(255, 232, 168, 0.52);
  }

  .tarot-moon::after {
    content: "";
    position: absolute;
    left: 8px;
    top: -2px;
    width: 22px;
    height: 22px;
    border-radius: 999px;
    background: rgba(55, 42, 82, 0.92);
  }

  .tarot-star {
    width: 8px;
    height: 8px;
    background: #ffffff;
    clip-path: polygon(50% 0, 61% 36%, 100% 50%, 61% 64%, 50% 100%, 39% 64%, 0 50%, 39% 36%);
    box-shadow: 0 0 12px rgba(255,255,255,0.65);
  }

  .tarot-star-one {
    right: 30%;
    bottom: 25%;
  }

  .tarot-star-two {
    right: 44%;
    bottom: 35%;
    width: 6px;
    height: 6px;
    opacity: 0.78;
  }

  .chooser-copy {
    min-width: 0;
  }

  .chooser-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 0 0 8px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(240, 243, 255, 0.72);
  }

  .chooser-card h3 {
    margin: 0;
    font-size: 17px;
    line-height: 1.2;
    color: #ffffff;
  }

  .chooser-card p {
    margin: 6px 0 0;
    font-size: 12px;
    line-height: 1.55;
    color: rgba(226, 231, 255, 0.78);
  }

  @media (max-width: 840px) {
    .chooser-grid {
      grid-template-columns: 1fr;
      padding-left: 0;
      gap: 12px;
    }

    .chooser-card {
      grid-template-columns: 1fr;
      gap: 12px;
      padding: 14px;
    }

    .tarot-index-page {
      grid-template-columns: 1fr;
      align-content: start;
      overflow-y: auto;
      padding: 28px 6px 10px 18px;
    }

    .tarot-index-card {
      min-height: 132px;
    }

  }

  .form-card {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-top: 4px;
  }

  .form-row {
    display: grid;
    grid-template-columns: 130px 1fr;
    align-items: center;
    gap: 16px;
  }

  .form-row label {
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
  }

  .form-row input {
    width: 100%;
    padding: 10px 14px;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    background: rgba(255,255,255,0.14);
    color: #ffffff;
    font-size: 15px;
  }

  .form-row input:focus {
    outline: none;
    border-color: #8fa8ff;
    box-shadow: 0 0 0 3px rgba(143, 168, 255, 0.18);
  }

  .form-actions {
    margin-top: auto;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding-top: 12px;
  }

  .form-actions button,
  .book-nav button {
    border: none;
    border-radius: 14px;
    cursor: pointer;
    color: white;
    font-size: 16px;
    font-weight: 600;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      opacity 0.2s ease,
      background 0.2s ease,
      border-color 0.2s ease,
      filter 0.2s ease;
  }

  .form-actions button:hover,
  .book-nav button:hover {
    transform: translateY(-1px);
    filter: brightness(1.08);
  }

  .primary-btn {
    padding: 12px 20px;
    background: linear-gradient(135deg, #7f8cff, #97a8ff);
    box-shadow: 0 6px 18px rgba(127, 140, 255, 0.28);
  }

  .primary-btn:hover {
    background: linear-gradient(135deg, #99a5ff, #c2cbff);
    box-shadow:
      0 10px 22px rgba(127, 140, 255, 0.24),
      0 0 0 1px rgba(255,255,255,0.18) inset,
      0 0 18px rgba(255,255,255,0.12);
  }

  .secondary-btn {
    padding: 12px 20px;
    background: rgba(255,255,255,0.12);
    color: #f5f7ff;
    border: 1px solid rgba(255,255,255,0.08);
  }

  .secondary-btn:hover {
    background: rgba(255,255,255,0.2);
    border-color: rgba(255,255,255,0.22);
    box-shadow:
      0 10px 22px rgba(0,0,0,0.18),
      0 0 0 1px rgba(255,255,255,0.12) inset,
      0 0 18px rgba(255,255,255,0.12);
  }

  .reading-body {
    white-space: pre-wrap;
    line-height: 1.78;
    font-size: 13px;
    padding: 2px 6px 12px 18px;
    color: rgba(245,247,255,0.93);
    text-align: justify;
  }

  .chart-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    min-height: 0;
    padding: 0;
  }

  .chart-box img {
    display: block;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 18px;
    box-shadow:
      0 18px 44px rgba(0,0,0,0.28),
      0 0 0 1px rgba(255,255,255,0.06);
  }

  .book-nav {
    position: absolute;
    left: 32px;
    right: 10px;
    bottom: 16px;
    display: flex;
    justify-content: space-between;
    gap: 12px;
    pointer-events: none;
    z-index: 10;
  }

  .book-nav button {
    pointer-events: auto;
    width: 44px;
    height: 40px;
    padding: 0 14px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.14);
    background: rgba(255,255,255,0.08);
    box-shadow: 0 10px 24px rgba(0,0,0,0.18);
    color: #f5f7ff;
    font-size: 18px;
  }

  .book-nav button:hover {
    background: rgba(255,255,255,0.18);
    border-color: rgba(255,255,255,0.34);
    box-shadow:
      0 14px 28px rgba(0,0,0,0.22),
      0 0 0 1px rgba(255,255,255,0.18) inset,
      0 0 18px rgba(255,255,255,0.14);
  }

  .book-nav button:disabled {
    opacity: 0.25;
    cursor: default;
    transform: none;
  }

  .book-nav-hidden {
    opacity: 0;
    pointer-events: none;
    transition: opacity 180ms ease;
  }

  .book-nav-hidden button {
    pointer-events: none;
  }

  .footer {
    text-align: center;
    padding: 0 16px 8px;
    color: #c3c7ff;
    opacity: 0.72;
    font-size: 11px;
  }

  .page-chart {
    padding-top: 18px;
    padding-bottom: 54px;
  }

  .page-chart .reading-title {
    margin-bottom: 8px;
    font-size: 18px;
  }

  .page-chart .reading-body {
    padding: 0 0 8px 12px;
  }

  .page-chooser {
    padding-top: 20px;
  }

  .page-public-index,
  .page-private-index,
  .page-form,
  .page-geo,
  .page-helio {
    padding-top: 20px;
  }

  .page-public-index .reading-subtitle,
  .page-private-index .reading-subtitle,
  .page-geo .reading-subtitle,
  .page-helio .reading-subtitle {
    margin-bottom: 10px;
  }

  .page-geo .reading-body,
  .page-helio .reading-body {
    padding-left: 12px;
  }

  @media (max-width: 760px) {
    .book-shell {
      width: min(calc(100vw - 24px), calc((100dvh - 42px) * 0.78));
      height: calc(100vh - 42px);
      height: calc(100dvh - 42px);
      min-height: min(620px, calc(100dvh - 42px));
      margin: 10px auto 12px;
    }

    .page {
      padding: 20px 14px 68px 24px;
      margin-left: 0;
    }

    .chooser-page {
      justify-content: center;
      gap: 10px;
      padding: 0;
    }

    .chooser-card {
      grid-template-columns: minmax(64px, 76px) minmax(0, 1fr);
      gap: 10px;
      min-height: 104px;
      padding: 10px;
      border-radius: 16px;
    }

    .chooser-media-frame {
      border-radius: 14px;
    }

    .chooser-card h3 {
      font-size: 14px;
      line-height: 1.22;
    }

    .chooser-card p {
      display: none;
    }

    .chooser-eyebrow {
      margin-bottom: 5px;
      font-size: 10px;
      letter-spacing: 0.16em;
    }

    .tarot-index-page {
      gap: 10px;
      padding: 6px 2px 4px 14px;
    }

    .tarot-index-card {
      min-height: 150px;
      padding: 12px;
    }

    .tarot-index-art {
      width: min(170px, 54vw);
    }

    .book-tarot-reading-content,
    .book-tarot-result-content {
      margin: -6px -8px -34px -16px;
      padding: 4px 7px 64px 22px;
    }

    .book-tarot-reading-content section,
    .book-tarot-result-content section {
      padding: 12px;
    }

    .tarot-consult-panel {
      gap: 10px;
      min-height: 100%;
    }

    .tarot-consult-summary {
      padding: 12px;
    }

    .tarot-consult-summary h3 {
      font-size: 15px;
    }

    .tarot-consult-message {
      max-width: 96%;
      font-size: 13px;
      line-height: 1.65;
    }

    .tarot-consult-form {
      grid-template-columns: minmax(0, 4fr) minmax(74px, 1fr);
      gap: 8px;
    }

    .tarot-consult-form textarea {
      min-height: 68px;
      resize: none;
    }

    .diary-entry-cover {
      width: min(220px, 62vw);
    }

    .form-row {
      grid-template-columns: 1fr;
      gap: 8px;
    }

    .reading-title {
      margin-bottom: 8px;
      font-size: 16px;
    }

    .reading-subtitle {
      margin-bottom: 12px;
      font-size: 11px;
      letter-spacing: 0.14em;
    }

    .index-list {
      grid-template-columns: 1fr;
    }

    .book-nav {
      left: 20px;
      right: 8px;
      bottom: 9px;
    }

    .book-nav button {
      width: 40px;
      height: 36px;
      font-size: 17px;
    }

    .chart-box img {
      max-height: calc(100vh - 310px);
    }
  }
`;
