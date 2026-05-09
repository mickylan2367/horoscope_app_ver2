import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./Home";
import AboutPage from "./pages/AboutPage.jsx";
import BookDesign from "./BookDesign";
import DiaryListPage from "./pages/DiaryListPage";
import DiaryEditPage from "./pages/DiaryEditPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ChartWarpPage from "./pages/ChartWarpPage";
import ChartPage from "./pages/ChartPage";
import DiaryWarpPage from "./pages/DiaryWarpPage";
import ThankYouPage from "./pages/ThankYouPage";
import {
  TarotCardEditorPage,
  TarotDeckDetailPage,
  TarotDeckListPage,
  TarotHomePage,
  TarotReadingDetailPage,
  TarotReadingPage,
} from "./pages/TarotPages";
import { apiFetch } from "./api";

function App() {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const basename = window.location.pathname.startsWith("/app") ? "/app" : "/";

  useEffect(() => {
    apiFetch("/api/auth/me/")
      .then((data) => {
        setUser(data.authenticated ? data : null);
      })
      .catch(() => setUser(null))
      .finally(() => setAuthReady(true));
  }, []);

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage user={user} />} />
        <Route path="/bookdesign" element={<BookDesign user={user} />} />
        <Route path="/chart/warp" element={<ChartWarpPage />} />
        <Route path="/chart" element={<ChartPage user={user} />} />
        <Route path="/tarot" element={<TarotHomePage user={user} />} />
        <Route path="/tarot/decks" element={<TarotDeckListPage user={user} />} />
        <Route path="/tarot/decks/:deckId" element={<TarotDeckDetailPage user={user} />} />
        <Route path="/tarot/decks/:deckId/cards/new" element={<TarotCardEditorPage user={user} />} />
        <Route path="/tarot/cards/:cardId/edit" element={<TarotCardEditorPage user={user} />} />
        <Route path="/tarot/read" element={<TarotReadingPage user={user} />} />
        <Route path="/tarot/readings/:readingId" element={<TarotReadingDetailPage user={user} />} />
        <Route path="/diary/warp" element={<DiaryWarpPage />} />
        <Route
          path="/diary"
          element={<DiaryListPage key="diary-calendar" user={user} authReady={authReady} initialPageIndex={0} />}
        />
        <Route
          path="/diary/list"
          element={<DiaryListPage key="diary-list" user={user} authReady={authReady} initialPageIndex={1} />}
        />
        <Route path="/diary/new" element={<DiaryEditPage user={user} />} />
        <Route path="/diary/:id/edit" element={<DiaryEditPage user={user} isEdit />} />
        <Route path="/login" element={<LoginPage onAuth={setUser} />} />
        <Route path="/register" element={<RegisterPage onAuth={setUser} />} />
        <Route path="/profile" element={<ProfilePage user={user} onAuth={setUser} />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
