import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./Home";
import AboutPage from "./pages/AboutPage.jsx";
import BookDesign from "./BookDesign";
import DiaryListPage from "./pages/DiaryListPage";
import DailyWitchcraftsHome from "./pages/DailyWitchcraftsHome";
import DiaryEditPage from "./pages/DiaryEditPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ChartPage from "./pages/ChartPage";
import ThankYouPage from "./pages/ThankYouPage";
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
        <Route path="/chart" element={<ChartPage user={user} />} />
        <Route path="/list" element={<DiaryListPage user={user} authReady={authReady} />} />
        <Route path="/diary" element={<DiaryListPage user={user} authReady={authReady} />} />
        <Route path="/home" element={<DailyWitchcraftsHome user={user} />} />
        <Route path="/diary/new" element={<DiaryEditPage user={user} />} />
        <Route path="/diary/:id/edit" element={<DiaryEditPage user={user} isEdit />} />
        <Route path="/edit" element={<DiaryEditPage user={user} />} />
        <Route path="/login" element={<LoginPage onAuth={setUser} />} />
        <Route path="/register" element={<RegisterPage onAuth={setUser} />} />
        <Route path="/profile" element={<ProfilePage user={user} onAuth={setUser} />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
