import { useMemo, useState } from "react";

const seededRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export default function BookDesign() {
  const [currentPage, setCurrentPage] = useState(0);
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

  const groupedProfiles = {
    A: [
      { id: 1, person_name: "Alice", birth_date: "1998-04-12" },
      { id: 2, person_name: "Aria", birth_date: "2001-08-22" },
    ],
    H: [
      { id: 3, person_name: "Hikari", birth_date: "1999-11-03" },
      { id: 4, person_name: "Hoshino", birth_date: "2000-02-14" },
    ],
    M: [
      { id: 5, person_name: "Mina", birth_date: "1997-07-09" },
    ],
  };

  const pages = useMemo(
    () => [
      {
        key: "index",
        title: "Akashic Index",
        subtitle: "Registered Profiles",
        type: "index",
      },
      {
        key: "form",
        title: "✨ STAR TITLE ✨",
        type: "form",
      },
      {
        key: "record",
        title: "RECORD",
        type: "text",
        body: `あなたの星は、静かに深い場所で光っています。
表には見えにくくても、内側には確かな意志と感受性があります。

感情を派手に見せるよりも、物事をじっくり観察し、
必要な瞬間にだけ力を使うような人です。

その静かな集中力が、人生の大きな転機で
重要な導きになります。`,
      },
      {
        key: "gift",
        title: "GIFT",
        type: "text",
        body: `あなたの本質的な才能は、
世界の流れを敏感に読み取ること。

曖昧な空気や、人の中にあるまだ言葉にならないものを
直感的に感じ取る力があります。

この力は、落ち着いた環境でこそ
いちばん美しく発揮されます。`,
      },
      {
        key: "geo-table",
        title: "GEOCENTRIC",
        type: "table",
      },
    ],
    []
  );

  const goPrev = () => setCurrentPage((p) => Math.max(0, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(pages.length - 1, p + 1));

  return (
    <>
      <style>{`
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

        body{
        
        }

        .app-shell {
          position: relative;
          min-height: 100vh;
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

        .page-wrap {
          position: relative;
          z-index: 1;
          min-height: 100%;
          width: 100%;
          margin: 0;
          display: flex;
          flex-direction: column;
        }

        .book-shell {
          width: min(760px, calc(100vw - 28px));
          height: calc(100vh - 80px);
          margin: 18px auto 24px;
          padding-top: 4px;
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
          margin-left: 18px;
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
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(4px);
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
          transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
          text-align: left;
          backdrop-filter: blur(3px);
        }

        .index-name-btn:hover {
          transform: translateY(-1px);
          background: rgba(255,255,255,0.08);
          border-color: rgba(190, 200, 255, 0.34);
          box-shadow: 0 6px 18px rgba(60, 80, 170, 0.18);
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
          transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
        }

        .form-actions button:hover,
        .book-nav button:hover {
          transform: translateY(-1px);
        }

        .primary-btn {
          padding: 12px 20px;
          background: linear-gradient(135deg, #7f8cff, #97a8ff);
          box-shadow: 0 6px 18px rgba(127, 140, 255, 0.28);
        }

        .secondary-btn {
          padding: 12px 20px;
          background: rgba(255,255,255,0.12);
          color: #f5f7ff;
          border: 1px solid rgba(255,255,255,0.08);
        }

        .reading-body {
          white-space: pre-wrap;
          line-height: 1.9;
          font-size: 16px;
          padding: 4px 6px 14px 18px;
          color: rgba(245,247,255,0.93);
          text-align: justify;
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
          left: 46px;
          right: 10px;
          bottom: 24px;
          display: flex;
          justify-content: space-between;
          pointer-events: none;
          z-index: 10;
        }

        .book-nav button {
          pointer-events: auto;
          width: 52px;
          height: 52px;
          border-radius: 999px;
          background: linear-gradient(135deg, #7f8cff, #97a8ff);
          box-shadow: 0 8px 20px rgba(0,0,0,0.25);
          font-size: 22px;
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
            margin-left: 12px;
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
            left: 26px;
          }
        }
      `}</style>

      <div className="app-shell">
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
                left: `${-20 + i * 4}%`,
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
                  {page.subtitle && (
                    <p className="reading-subtitle">{page.subtitle}</p>
                  )}

                  {page.type === "index" && (
                    <div className="index-book-page">
                      <div className="index-body">
                        {Object.entries(groupedProfiles).map(([initial, items]) => (
                          <section className="index-group" key={initial}>
                            <h3 className="index-letter">{initial}</h3>
                            <div className="index-list">
                              {items.map((p) => (
                                <button className="index-name-btn" key={p.id} type="button">
                                  <span className="index-name">{p.person_name}</span>
                                  <span className="index-meta">{p.birth_date}</span>
                                </button>
                              ))}
                            </div>
                          </section>
                        ))}
                      </div>
                    </div>
                  )}

                  {page.type === "form" && (
                    <div className="form-card">
                      <div className="form-row">
                        <label>Person Name</label>
                        <input type="text" placeholder="Name" />
                      </div>

                      <div className="form-row">
                        <label>Place</label>
                        <input type="text" placeholder="Birth place" />
                      </div>

                      <div className="form-row">
                        <label>Birth Date</label>
                        <input type="date" />
                      </div>

                      <div className="form-row">
                        <label>Birth Time</label>
                        <input type="time" />
                      </div>

                      <div className="form-actions">
                        <button className="secondary-btn" type="button">Save</button>
                        <button className="primary-btn" type="button">Open</button>
                      </div>
                    </div>
                  )}

                  {page.type === "text" && (
                    <div className="reading-body">{page.body}</div>
                  )}

                  {page.type === "table" && (
                    <div className="reading-body">
                      <table className="result-table">
                        <thead>
                          <tr>
                            <th>天体</th>
                            <th>Meaning</th>
                            <th>サイン</th>
                            <th>年齢</th>
                            <th>サビアンシンボル</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Sun</td>
                            <td>Self</td>
                            <td>Aries 12°</td>
                            <td>24</td>
                            <td>A triangularly shaped flight of wild geese</td>
                          </tr>
                          <tr>
                            <td>Moon</td>
                            <td>Emotion</td>
                            <td>Libra 4°</td>
                            <td>18</td>
                            <td>A group around a campfire</td>
                          </tr>
                          <tr>
                            <td>Mercury</td>
                            <td>Mind</td>
                            <td>Scorpio 21°</td>
                            <td>13</td>
                            <td>Obeying the call of duty</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              ))}

              <div className="book-nav">
                <button onClick={goPrev} disabled={currentPage === 0} type="button">
                  ←
                </button>
                <button
                  onClick={goNext}
                  disabled={currentPage === pages.length - 1}
                  type="button"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          <footer className="footer">© 2025 Horoscope App</footer>
        </div>
      </div>
    </>
  );
}
