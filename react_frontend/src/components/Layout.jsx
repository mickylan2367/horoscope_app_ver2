import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, LogIn, LogOut, Menu, User, UserPlus, X } from "lucide-react";
import { apiFetch } from "../api";

export default function Layout({ children, user, wide = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await apiFetch("/api/auth/logout/", { method: "POST", body: "{}" });
    setProfileOpen(false);
    setMenuOpen(false);
    navigate("/thank-you");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#fbeff2] text-[#5c3a3a]">
      <header className="sticky top-0 z-50 border-b border-[#e7b8c3] bg-gradient-to-r from-[#f8e1e7] to-[#f4c2c2] shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
          <Link
            to="/home"
            className="text-xl font-bold tracking-wide text-[#5c3a3a] transition hover:text-[#9d5d6c]"
          >
            LovelyWitch Life
          </Link>

          <div className="hidden items-center gap-4 md:flex">
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="flex items-center gap-3 rounded-full border border-[#e8b0b0] bg-white/60 px-3 py-2 transition hover:bg-white"
                >
                  {user.iconUrl ? (
                    <img
                      src={user.iconUrl}
                      alt={user.username ?? "user icon"}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4c2c2] text-[#5c3a3a]">
                      <User className="h-5 w-5" />
                    </div>
                  )}
                  <span className="max-w-[140px] truncate text-sm text-[#5c3a3a]">
                    {user.username}
                  </span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-[#e8b0b0] bg-white shadow-2xl">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-[#5c3a3a] transition hover:bg-[#fff4f7]"
                      onClick={() => setProfileOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      PROFILE
                    </Link>
                    <Link
                      to="/diary"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-[#5c3a3a] transition hover:bg-[#fff4f7]"
                      onClick={() => setProfileOpen(false)}
                    >
                      <BookOpen className="h-4 w-4" />
                      RECORDS
                    </Link>
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-[#a8465d] transition hover:bg-[#fff4f7]"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                      LOGOUT
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-full border border-[#e8b0b0] bg-white/55 px-4 py-2 text-sm text-[#5c3a3a] transition hover:bg-white"
                >
                  <LogIn className="h-4 w-4" />
                  LOGIN
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-full bg-[#f4c2c2] px-4 py-2 text-sm font-medium text-[#5c3a3a] transition hover:bg-[#e8b0b0]"
                >
                  <UserPlus className="h-4 w-4" />
                  NEW
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e8b0b0] bg-white/60 md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Open menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-[#e8b0b0] bg-[#f8e1e7] px-6 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="rounded-xl border border-[#e8b0b0] bg-white/60 px-4 py-3 text-sm text-[#5c3a3a]"
                    onClick={() => setMenuOpen(false)}
                  >
                    PROFILE
                  </Link>
                  <Link
                    to="/diary"
                    className="rounded-xl border border-[#e8b0b0] bg-white/60 px-4 py-3 text-sm text-[#5c3a3a]"
                    onClick={() => setMenuOpen(false)}
                  >
                    RECORDS
                  </Link>
                  <button
                    type="button"
                    className="rounded-xl border border-[#e8b0b0] bg-white/60 px-4 py-3 text-left text-sm text-[#a8465d]"
                    onClick={handleLogout}
                  >
                    LOGOUT
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="rounded-xl border border-[#e8b0b0] bg-white/60 px-4 py-3 text-sm text-[#5c3a3a]"
                    onClick={() => setMenuOpen(false)}
                  >
                    LOGIN
                  </Link>
                  <Link
                    to="/register"
                    className="rounded-xl bg-[#f4c2c2] px-4 py-3 text-sm font-medium text-[#5c3a3a]"
                    onClick={() => setMenuOpen(false)}
                  >
                    NEW
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <main className={`mx-auto px-6 py-8 md:px-10 ${
        wide ? "max-w-[1600px] lg:px-8 2xl:px-10" : "max-w-6xl"
      }`}>
        {children}
      </main>
    </div>
  );
}
