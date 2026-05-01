import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import { apiFetch } from "../api";

const emptyForm = {
  personName: "",
  place: "",
  birthDate: "",
  birthTime: "",
  lat: "",
  lon: "",
};

export default function ChartPage({ user }) {
  const [profiles, setProfiles] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [result, setResult] = useState(null);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch("/api/chart/profiles/")
      .then(setProfiles)
      .catch((err) => setError(err.message || "Failed to load profiles."));
  }, []);

  const groupedProfiles = useMemo(() => {
    return profiles.reduce((groups, profile) => {
      const first = (profile.personName || "#").charAt(0).toUpperCase();
      const key = /[A-Z]/.test(first) ? first : "#";
      return { ...groups, [key]: [...(groups[key] ?? []), profile] };
    }, {});
  }, [profiles]);

  const update = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
  };

  const calculate = async ({ includeAi = false, saveProfile = false, profileId = null } = {}) => {
    setLoading(true);
    setError("");
    try {
      const payload = profileId ? { profileId, includeAi, saveProfile } : { ...form, includeAi, saveProfile };
      const data = await apiFetch("/api/chart/calculate/", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setResult(data);
      setPage(1);
      if (saveProfile) {
        const nextProfiles = await apiFetch("/api/chart/profiles/");
        setProfiles(nextProfiles);
      }
    } catch (err) {
      setError(err.message || "Chart calculation failed.");
    } finally {
      setLoading(false);
    }
  };

  const pages = [
    {
      title: "Akashic Index",
      subtitle: "Registered Profiles",
      content: (
        <div className="index-book-page">
          <div className="index-body">
            {Object.keys(groupedProfiles).length === 0 ? (
              <p className="reading-muted">No saved profiles yet.</p>
            ) : (
              Object.entries(groupedProfiles).map(([initial, items]) => (
                <section className="index-group" key={initial}>
                  <h3 className="index-letter">{initial}</h3>
                  <div className="index-list">
                    {items.map((profile) => (
                      <button
                        className="index-name-btn"
                        key={profile.id}
                        type="button"
                        onClick={() => calculate({ includeAi: true, profileId: profile.id })}
                      >
                        <span className="index-name">{profile.personName}</span>
                        <span className="index-meta">{profile.birthDate}</span>
                      </button>
                    ))}
                  </div>
                </section>
              ))
            )}
          </div>
        </div>
      ),
    },
    {
      title: "STAR TITLE",
      content: (
        <form className="record-form" onSubmit={(event) => { event.preventDefault(); calculate({ includeAi: true }); }}>
          <label>
            Name
            <input value={form.personName} onChange={update("personName")} placeholder="Name" />
          </label>
          <label>
            Place
            <input value={form.place} onChange={update("place")} placeholder="Tokyo / Paris" />
          </label>
          <label>
            Birth date
            <input type="date" value={form.birthDate} onChange={update("birthDate")} required />
          </label>
          <label>
            Birth time
            <input type="time" value={form.birthTime} onChange={update("birthTime")} />
          </label>
          <div className="form-actions">
            <button type="submit" disabled={loading}>{loading ? "Opening..." : "Open"}</button>
            <button type="button" className="secondary" onClick={() => calculate({ saveProfile: true })}>Save</button>
          </div>
        </form>
      ),
    },
  ];

  if (result?.aiTextGeo) pages.push({ title: "RECORD", content: <div className="reading-body">{result.aiTextGeo}</div> });
  if (result?.aiTextHelio) pages.push({ title: "GIFT", content: <div className="reading-body">{result.aiTextHelio}</div> });
  if (result?.chartGeoUrl) {
    pages.push({
      title: "GEOCENTRIC",
      content: (
        <div className="chart-box">
          <img src={result.chartGeoUrl} alt="Horoscope chart" />
        </div>
      ),
    });
  }
  if (result?.resultGeo) {
    pages.push({
      title: "GEOCENTRIC",
      content: <ResultTable rows={result.resultGeo} type="geo" />,
    });
  }
  if (result?.resultHelio) {
    pages.push({
      title: "HELIOCENTRIC",
      content: <ResultTable rows={result.resultHelio} type="helio" />,
    });
  }

  return (
    <Layout user={user}>
      <div className="chart-app-shell">
        {error ? <div className="chart-error">{error}</div> : null}
        <div className="book-shell">
          <div className="book">
            {pages.map((bookPage, index) => (
              <section className={`page ${index === page ? "active" : "hidden"}`} key={`${bookPage.title}-${index}`}>
                <h2 className="reading-title">{bookPage.title}</h2>
                {bookPage.subtitle ? <p className="reading-subtitle">{bookPage.subtitle}</p> : null}
                {bookPage.content}
              </section>
            ))}
            <div className="book-nav">
              <button type="button" onClick={() => setPage((current) => Math.max(0, current - 1))} style={{ visibility: page === 0 ? "hidden" : "visible" }}>Prev</button>
              <button type="button" onClick={() => setPage((current) => Math.min(pages.length - 1, current + 1))} style={{ visibility: page === pages.length - 1 ? "hidden" : "visible" }}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
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
                  <td>{row[1]} {row[2]}</td>
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
