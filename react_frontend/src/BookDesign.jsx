import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LucideHeading3, Sparkles } from "lucide-react";
import { apiFetch } from "./api";

const emptyForm = {
  personName: "",
  place: "",
  birthDate: "",
  birthTime: "",
};

const seededRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
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

export default function BookDesign({ user }) {
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

  const isAuthenticated = Boolean(user);

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
    if (typeof location.state?.page === "number") {
      setCurrentPage(location.state.page);
    }
  }, [location.state?.page]);

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

  const pages = useMemo(() => {
    const items = [
      {
        key: "intro",
        title: "Welcome to your Star Book",
        content: (
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
              <Link
                className="guest-button"
                to="/chart/warp"
                state={{ source: "close-book", target: "/" }}
              >
                CLOSE
              </Link>
            </div>
          </div>
        ),
      },
      {
        key: "chooser",
        title: "INDEX",
        subtitle: "select page",
        content: (
          <div className="chooser-page">
            <div className="chooser-grid">
              <button
                type="button"
                className="chooser-card"
                onClick={() => setCurrentPage(2)}
              >
                <div className="chooser-media" aria-hidden="true">
                  <div className="chooser-media-frame chooser-media-chart">
                    <div className="chooser-media-glow" />
                  </div>
                </div>
                <div className="chooser-copy">
                  <div className="chooser-eyebrow">Chart</div>
                  <h3>Open Akashic Index</h3>
                  <p>
                    Continue with the current chart app pages and open the shared free index.
                  </p>
                </div>
              </button>

              <button
                type="button"
                className="chooser-card"
                onClick={() => navigate("/diary/warp", { state: { target: "/diary" } })}
              >
                <div className="chooser-media" aria-hidden="true">
                  <div className="chooser-media-frame chooser-media-diary">
                    <div className="chooser-media-glow" />
                  </div>
                </div>
                <div className="chooser-copy">
                  <div className="chooser-eyebrow">Diary</div>
                  <h3>Open Diary Book</h3>
                  <p>
                    Move into the diary book with the calendar, list, and edit pages.
                  </p>
                </div>
              </button>
            </div>
          </div>
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

    if (result?.resultGeo) {
      items.push({
        key: "geo",
        title: "GEOCENTRIC",
        content: <ResultTable rows={result.resultGeo} type="geo" />,
      });
    }

    if (result?.resultHelio) {
      items.push({
        key: "helio",
        title: "HELIOCENTRIC",
        content: <ResultTable rows={result.resultHelio} type="helio" />,
      });
    }

    return items;
  }, [
    calculate,
    form.birthDate,
    form.birthTime,
    form.personName,
    form.place,
    isAuthenticated,
    loading,
    privateGroupedEntries,
    publicGroupedEntries,
    openProfileForEdit,
    navigate,
    result,
    saveProfile,
    selectedProfile,
  ]);

  const pageCount = pages.length;

  useEffect(() => {
    setCurrentPage((current) => Math.min(current, pageCount - 1));
  }, [pageCount]);

  return (
    <>
      <style>{sharedStyles}</style>

      <div className="app-shell">
        {error ? <div className="chart-error">{error}</div> : null}

        <div className="star-layer">
          {starStyles.map((style, i) => (
            <span key={i} className="star" style={style} />
          ))}

          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={`shooting-${i}`}
              className="shooting-star"
              style={{
                top: `${12 + i * 18}%`,
                left: `${12 + i * 22}%`,
                animationDelay: `${i * 3.5}s`,
                animationDuration: `${10 + i * 1.2}s`,
              }}
            />
          ))}
        </div>

        <div className="page-wrap">
          <div className="book-shell">
            <div className="book">
              {pages.map((page, index) => (
                <section
                  key={page.key}
                  className={`page ${index === currentPage ? "active" : "hidden"}`}
                >
                  <h2 className="reading-title">{page.title}</h2>
                  {page.subtitle ? <p className="reading-subtitle">{page.subtitle}</p> : null}
                  {page.content}
                </section>
              ))}

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
            </div>
          </div>

          <footer className="footer">@2025 Horoscope App</footer>
        </div>
      </div>
    </>
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

function ResultTable({ rows, type }) {
  return (
    <div className="reading-body">
      <table className="result-table">
        <thead>
          <tr>
            <th>Planet</th>
            <th>Meaning</th>
            <th>Sign</th>
            <th>Degree</th>
            <th>Sabian</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row[0]}-${index}`}>
              {type === "geo" ? (
                <>
                  <td>{row[0]}</td>
                  <td>{row[6]}</td>
                  <td>
                    {row[1]} {row[2]}
                  </td>
                  <td>{row[5]}</td>
                  <td>{row[4]}</td>
                </>
              ) : (
                <>
                  <td>{row[0]}</td>
                  <td>{row[4]}</td>
                  <td>{row[1]}</td>
                  <td>{row[2]}</td>
                  <td>{row[3]}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
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
    min-height: calc(100vh - 81px);
    overflow: hidden;
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
      transform: rotate(-18deg) translate3d(0, 0, 0);
    }
    10% {
      opacity: 1;
    }
    35% {
      opacity: 1;
      transform: rotate(-18deg) translate3d(260px, 110px, 0);
    }
    70% {
      opacity: 1;
      transform: rotate(-18deg) translate3d(560px, 192px, 0);
    }
    100% {
      opacity: 0;
      transform: rotate(-18deg) translate3d(840px, 168px, 0);
    }
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
    width: min(760px, calc(100vw - 28px));
    height: calc(100vh - 80px);
    margin: 18px auto 24px;
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
  }

  .book::after {
    content: "";
    position: absolute;
    left: 27px;
    top: 0;
    bottom: 0;
    width: 10px;
    background: linear-gradient(to right, rgba(0,0,0,0.22), rgba(255,255,255,0.10));
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
    padding: 36px 44px 88px 48px;
    margin-left: 0;
    border-radius: 22px;
    background:
      radial-gradient(circle at top left, rgba(143, 168, 255, 0.10), transparent 26%),
      linear-gradient(135deg, #1f2238, #2a2f4d);
    color: #f5f7ff;
    box-shadow:
      0 14px 34px rgba(0,0,0,0.28),
      inset 0 1px 0 rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.06);
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
    margin: 0 0 18px;
    padding-left: 12px;
    font-size: 13px;
    letter-spacing: 0.16em;
    color: rgba(220, 228, 255, 0.72);
    text-transform: uppercase;
    flex-shrink: 0;
  }

  .index-book-page {
    height: 100%;
    min-height: 0;
    display: flex;
    flex-direction: column;
    padding: 8px 10px 0;
    border-radius: 18px;
    background:    rgba(31, 34, 56, 0.78);
    backdrop-filter: blur(4px);
  }

  .index-note {
    margin: 0 0 14px;
    font-size: 12px;
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
    margin-bottom: 28px;
  }

  .index-letter {
    margin: 0 0 12px;
    padding-bottom: 6px;
    font-size: 22px;
    font-weight: 600;
    color: #d9deff;
    border-bottom: 1px solid rgba(180, 190, 255, 0.22);
    text-shadow: 0 0 8px rgba(170, 180, 255, 0.18);
  }

  .index-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 10px 18px;
  }

  .index-name-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 14px;
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
    font-size: 15px;
    font-weight: 500;
    color: #ffffff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .index-meta {
    flex-shrink: 0;
    font-size: 12px;
    color: rgba(215, 222, 255, 0.65);
  }

  .guest-card {
    border-radius: 22px;
    background:ze: 12px;
    color: rgba(215, 222, 255, 0.65);
    border: none;
    padding: 8px 10px 0;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .guest-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 14px;
    color: rgba(220, 228, 255, 0.82);
    letter-spacing: 0.18em;
    font-size: 12px;
    text-transform: uppercase;
  }

  .guest-title {
    margin: 0;
    font-size: clamp(28px, 4vw, 46px);
    line-height: 1.15;
    color: #f7f8ff;
  }

  .guest-subtitle {
    margin: 8px 0 0;
    font-size: clamp(20px, 2.8vw, 20px);
    line-height: 1.15;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: #fff6fb;
    text-shadow: 0 0 10px rgba(189, 171, 255, 0.16);
  }

  .guest-text {
    margin: 18px 0 0;
    max-width: 56rem;
    line-height: 2;
    color: rgba(245,247,255,0.9);
    font-size: 15px;
  }

  .guest-actions {
    margin-top: 28px;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .guest-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 12px 20px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.08);
    background: linear-gradient(135deg, #7f8cff, #97a8ff);
    color: white;
    font-weight: 600;
    text-decoration: none;
  }

  .chooser-page {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 28px;
    padding: 10px 4px 0;
  }

  .chooser-header {
    max-width: 56rem;
  }

  .chooser-kicker {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin: 0 0 12px;
    font-size: 12px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(220, 228, 255, 0.78);
  }

  .chooser-title {
    margin: 0;
    font-size: clamp(28px, 4vw, 44px);
    line-height: 1.1;
    color: #f7f8ff;
  }

  .chooser-text {
    margin: 12px 0 0;
    max-width: 44rem;
    font-size: 15px;
    line-height: 1.9;
    color: rgba(220, 228, 255, 0.78);
  }

  .chooser-grid {
    display: grid;
    gap: 18px;
    grid-template-columns: minmax(0, 1fr);
  }

  .chooser-card {
    display: grid;
    grid-template-columns: minmax(120px, 168px) minmax(0, 1fr);
    align-items: center;
    gap: 18px;
    width: 100%;
    text-align: left;
    border-radius: 26px;
    border: 1px solid rgba(255,255,255,0.18);
    background: rgba(255,255,255,0.08);
    padding: 18px;
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

  .chooser-copy {
    min-width: 0;
  }

  .chooser-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 0 0 12px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: rgba(240, 243, 255, 0.72);
  }

  .chooser-card h3 {
    margin: 0;
    font-size: 24px;
    line-height: 1.2;
    color: #ffffff;
  }

  .chooser-card p {
    margin: 12px 0 0;
    font-size: 14px;
    line-height: 1.85;
    color: rgba(226, 231, 255, 0.78);
  }

  @media (max-width: 840px) {
    .chooser-grid {
      grid-template-columns: 1fr;
    }

    .chooser-card {
      grid-template-columns: 1fr;
      gap: 16px;
      padding: 18px;
    }
  }

  .form-card {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-top: 10px;
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
    padding: 12px 14px;
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
    gap: 12px;
    padding-top: 20px;
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
    line-height: 1.9;
    font-size: 16px;
    padding: 4px 6px 14px 18px;
    color: rgba(245,247,255,0.93);
    text-align: justify;
  }

  .chart-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100%;
    padding: 4px 0 14px;
  }

  .chart-box img {
    display: block;
    max-width: 100%;
    max-height: calc(100vh - 260px);
    object-fit: contain;
    border-radius: 18px;
    box-shadow:
      0 18px 44px rgba(0,0,0,0.28),
      0 0 0 1px rgba(255,255,255,0.06);
  }

  .result-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 4px;
  }

  .result-table th,
  .result-table td {
    border-bottom: 1px solid rgba(255,255,255,0.16);
    padding: 10px;
    text-align: center;
    word-break: break-word;
  }

  .result-table th {
    background: rgba(255,255,255,0.08);
    font-weight: 500;
  }

  .book-nav {
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

  .book-nav button {
    pointer-events: auto;
    width: 52px;
    height: 46px;
    padding: 0 18px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.14);
    background: rgba(255,255,255,0.08);
    box-shadow: 0 10px 24px rgba(0,0,0,0.18);
    color: #f5f7ff;
    font-size: 22px;
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

  .footer {
    text-align: center;
    padding: 0 16px 18px;
    color: #c3c7ff;
    opacity: 0.72;
    font-size: 14px;
  }

  @media (max-width: 760px) {
    .book-shell {
      width: calc(100vw - 18px);
      height: calc(100vh - 100px);
    }

    .page {
      padding: 26px 20px 88px 28px;
      margin-left: 0;
    }

    .form-row {
      grid-template-columns: 1fr;
      gap: 8px;
    }

    .reading-title {
      font-size: 21px;
    }

    .index-list {
      grid-template-columns: 1fr;
    }

    .book-nav {
      left: 20px;
      right: 10px;
      bottom: 14px;
    }

    .chart-box img {
      max-height: calc(100vh - 310px);
    }
  }
`;
