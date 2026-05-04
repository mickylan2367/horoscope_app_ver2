import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, LogIn, LogOut, Menu, User, UserPlus, X } from "lucide-react";
import { apiFetch } from "../api";
import CosmicBackground from "./CosmicBackground";

const AMBIENT_GLYPHS = ["✦", "✧", "ᚠ", "ᛟ", "ᛉ", "⟡", "⋆", "☾"];
const BURST_GLYPHS = ["✦", "✧", "ᚠ", "ᛟ", "ᛉ", "⟡", "✺"];
const COLORS = ["#fff8fb", "#f1b8cf", "#d8c4ff", "#f6d37c", "#ffcadf", "#f4e6ff"];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export default function Layout({
  children,
  user,
  wide = false,
  spellEffects = false,
  compactHeader = true,
  backgroundVariant = "base",
  headerVariant = "pink",
  hideAuthActions = false,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [bursts, setBursts] = useState([]);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await apiFetch("/api/auth/logout/", { method: "POST", body: "{}" });
    setProfileOpen(false);
    setMenuOpen(false);
    navigate("/thank-you");
    window.location.reload();
  };

  useEffect(() => {
    if (!spellEffects) {
      return undefined;
    }

    let timeoutId;
    let secondaryTimeoutId;
    let mounted = true;

    const spawnBurst = (offset = 0) => {
      secondaryTimeoutId = window.setTimeout(() => {
        if (!mounted) return;

        const burst = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          glyph: BURST_GLYPHS[Math.floor(Math.random() * BURST_GLYPHS.length)],
          x: randomBetween(8, 90),
          y: randomBetween(10, 84),
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: randomBetween(1.2, 2.9),
          duration: randomBetween(1200, 2000),
          angle: randomBetween(-32, 32),
        };

        setBursts((current) => [...current.slice(-12), burst]);

        window.setTimeout(() => {
          if (!mounted) return;
          setBursts((current) => current.filter((item) => item.id !== burst.id));
        }, burst.duration);
      }, offset);
    };

    const scheduleBurstPair = () => {
      const delay = randomBetween(1400, 3400);
      timeoutId = window.setTimeout(() => {
        if (!mounted) return;

        spawnBurst(0);
        spawnBurst(360);
        scheduleBurstPair();
      }, delay);
    };

    spawnBurst(0);
    spawnBurst(320);
    scheduleBurstPair();

    return () => {
      mounted = false;
      window.clearTimeout(timeoutId);
      window.clearTimeout(secondaryTimeoutId);
    };
  }, [spellEffects]);

  const isCosmicHeader = headerVariant === "cosmic";
  const headerClassName = isCosmicHeader
    ? "sticky top-0 z-50 border-b border-white/10 bg-gradient-to-r from-[#1a1026]/18 via-[#2a1530]/14 to-[#1a1026]/18 shadow-sm backdrop-blur-2xl"
    : "sticky top-0 z-50 border-b border-[#cfabc0] bg-gradient-to-r from-[#c98ca8] via-[#ddb0c0] to-[#dca5b6] shadow-sm";
  const titleClassName = isCosmicHeader
    ? `font-bold tracking-wide text-[#efe8ff] transition hover:text-white ${compactHeader ? "text-lg md:text-xl" : "text-xl"}`
    : `font-bold tracking-wide text-[#4b3850] transition hover:text-[#7b5b70] ${compactHeader ? "text-lg md:text-xl" : "text-xl"}`;
  const primaryButtonClassName = isCosmicHeader
    ? `inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/8 text-base text-[#f4eeff] transition hover:bg-white/14 ${
        compactHeader ? "px-4 py-2" : "px-5 py-2.5"
      }`
    : `inline-flex items-center gap-2 rounded-full border border-[#d7a4bb] bg-white/72 text-base text-[#4b3850] transition hover:bg-white ${
        compactHeader ? "px-4 py-2" : "px-5 py-2.5"
      }`;
  const accentButtonClassName = isCosmicHeader
    ? `inline-flex items-center gap-2 rounded-full bg-white/88 text-base font-medium text-[#312040] transition hover:bg-white ${
        compactHeader ? "px-4 py-2" : "px-5 py-2.5"
      }`
    : `inline-flex items-center gap-2 rounded-full bg-[#e7b2c5] text-base font-medium text-[#4b3850] transition hover:bg-[#d999b2] ${
        compactHeader ? "px-4 py-2" : "px-5 py-2.5"
      }`;
  const menuClassName = isCosmicHeader
    ? `border-t border-white/10 bg-[#171024] px-6 ${compactHeader ? "py-3" : "py-4"} md:hidden`
    : `border-t border-[#d7a4bb] bg-[#f3e2eb] px-6 ${compactHeader ? "py-3" : "py-4"} md:hidden`;

  return (
    <div className="relative min-h-screen bg-[#070b17] text-[#eae5f6]">
      <CosmicBackground variant={backgroundVariant} />
      <header className={headerClassName}>
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between px-6 ${
            compactHeader ? "py-3 md:px-8 md:py-3" : "py-4 md:px-10"
          }`}
        >
          <Link
            to="/"
            className={titleClassName}
          >
            Daily Witchcrafts
          </Link>

          {!hideAuthActions && (
            <div className="hidden items-center gap-4 md:flex">
              {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className={primaryButtonClassName}
                >
                  {user.iconUrl ? (
                    <img
                      src={user.iconUrl}
                      alt={user.username ?? "user icon"}
                      className={compactHeader ? "h-9 w-9 rounded-full object-cover" : "h-10 w-10 rounded-full object-cover"}
                    />
                  ) : (
                    <div className={`flex items-center justify-center rounded-full bg-[#e7b2c5] text-[#4b3850] ${
                      compactHeader ? "h-9 w-9" : "h-10 w-10"
                    }`}>
                      <User className="h-5 w-5" />
                    </div>
                  )}
                  <span className="max-w-[140px] truncate text-sm text-[#4b3850]">
                    {user.username}
                  </span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-[#d7a4bb] bg-[#fff8fb] shadow-2xl">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-[#4b3850] transition hover:bg-[#f8edf2]"
                      onClick={() => setProfileOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      PROFILE
                    </Link>
                    <Link
                      to="/diary/list"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-[#4b3850] transition hover:bg-[#f8edf2]"
                      onClick={() => setProfileOpen(false)}
                    >
                      <BookOpen className="h-4 w-4" />
                      RECORDS
                    </Link>
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-[#9d5f7e] transition hover:bg-[#f8edf2]"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                      LOGOUT
                    </button>
                  </div>
                )}
              </div>
            ) : hideAuthActions ? null : (
              <>
              <Link
                to="/login"
                className={primaryButtonClassName}
              >
                <LogIn className="h-4 w-4" />
                LOGIN
              </Link>
              <Link
                to="/register"
                className={accentButtonClassName}
              >
                <UserPlus className="h-4 w-4" />
                NEW
                </Link>
              </>
            )}
            </div>
          )}

          {!hideAuthActions && (
            <button
              type="button"
              className={compactHeader
                ? "inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d7a4bb] bg-white/72 md:hidden"
                : "inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d7a4bb] bg-white/72 md:hidden"}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Open menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          )}
        </div>

        {!hideAuthActions && menuOpen && (
          <div className={menuClassName}>
            <div className="flex flex-col gap-3">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="rounded-xl border border-[#d7a4bb] bg-white/72 px-4 py-3 text-sm text-[#4b3850]"
                    onClick={() => setMenuOpen(false)}
                  >
                    PROFILE
                  </Link>
                  <Link
                    to="/diary/list"
                    className="rounded-xl border border-[#d7a4bb] bg-white/72 px-4 py-3 text-sm text-[#4b3850]"
                    onClick={() => setMenuOpen(false)}
                  >
                    RECORDS
                  </Link>
                  <button
                    type="button"
                    className="rounded-xl border border-[#d7a4bb] bg-white/72 px-4 py-3 text-left text-sm text-[#9d5f7e]"
                    onClick={handleLogout}
                  >
                    LOGOUT
                  </button>
                </>
              ) : hideAuthActions ? null : (
                <>
                  <Link
                    to="/login"
                    className="rounded-xl border border-[#d7a4bb] bg-white/72 px-4 py-3 text-sm text-[#4b3850]"
                    onClick={() => setMenuOpen(false)}
                  >
                    LOGIN
                  </Link>
                  <Link
                    to="/register"
                    className="rounded-xl bg-[#e7b2c5] px-4 py-3 text-sm font-medium text-[#4b3850]"
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

      <main
        className={`relative z-10 mx-auto px-6 py-8 md:px-10 ${
          wide ? "max-w-[1600px] lg:px-8 2xl:px-10" : "max-w-6xl"
        }`}
      >
        {spellEffects && (
          <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
            <div className="spell-rim spell-rim-left" />
            <div className="spell-rim spell-rim-right" />
            <div className="spell-rim spell-rim-bottom" />

            {AMBIENT_GLYPHS.map((glyph, index) => (
              <span
                key={`${glyph}-${index}`}
                className={`spell-ambient spell-ambient-${index + 1}`}
                style={{
                  left: `${5 + index * 9}%`,
                  top: `${5 + (index % 4) * 15}%`,
                  color: COLORS[index % COLORS.length],
                  animationDelay: `${index * 0.7}s`,
                }}
              >
                {glyph}
              </span>
            ))}

            {bursts.map((burst) => (
              <span
                key={burst.id}
                className="spell-burst"
                style={{
                  left: `${burst.x}%`,
                  top: `${burst.y}%`,
                  color: burst.color,
                  fontSize: `${burst.size}rem`,
                  transform: `translate(-50%, -50%) rotate(${burst.angle}deg)`,
                  animationDuration: `${burst.duration}ms`,
                }}
              >
                {burst.glyph}
              </span>
            ))}

            <style>{`
              .spell-rim {
                position: absolute;
                border-radius: 9999px;
                filter: blur(24px);
                display: none;
                animation: spellGlow 8.5s ease-in-out infinite;
              }

              .spell-rim-left {
                left: -6rem;
                top: 18%;
                width: 14rem;
                height: 14rem;
                background: radial-gradient(circle, rgba(255, 248, 251, 0.95), rgba(217, 127, 168, 0.22) 55%, transparent 72%);
              }

              .spell-rim-right {
                right: -5rem;
                top: 26%;
                width: 12rem;
                height: 12rem;
                background: radial-gradient(circle, rgba(228, 198, 255, 0.84), rgba(255, 202, 223, 0.2) 50%, transparent 72%);
                animation-delay: -1.5s;
              }

              .spell-rim-bottom {
                left: 30%;
                bottom: -4rem;
                width: 18rem;
                height: 18rem;
                background: radial-gradient(circle, rgba(255, 222, 163, 0.6), rgba(255, 202, 223, 0.18) 50%, transparent 72%);
                animation-delay: -3s;
              }

              .spell-ambient {
                position: absolute;
                z-index: 0;
                display: inline-block;
                opacity: 0.56;
                font-size: 1.15rem;
                text-shadow: 0 0 14px rgba(255, 255, 255, 0.75);
                animation: spellFloat 7.8s ease-in-out infinite;
              }

              .spell-ambient-1 { animation-delay: 0s; }
              .spell-ambient-2 { animation-delay: 0.5s; }
              .spell-ambient-3 { animation-delay: 1s; }
              .spell-ambient-4 { animation-delay: 1.5s; }
              .spell-ambient-5 { animation-delay: 2s; }
              .spell-ambient-6 { animation-delay: 2.5s; }
              .spell-ambient-7 { animation-delay: 3s; }
              .spell-ambient-8 { animation-delay: 3.5s; }

              .spell-burst {
                position: absolute;
                z-index: 0;
                pointer-events: none;
                font-weight: 700;
                opacity: 0;
                text-shadow:
                  0 0 10px rgba(255, 255, 255, 0.98),
                  0 0 20px rgba(255, 224, 238, 0.92),
                  0 0 30px rgba(226, 169, 190, 0.8),
                  0 0 42px rgba(233, 216, 255, 0.7);
                animation-name: spellBurst;
                animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
                animation-fill-mode: forwards;
              }

              @keyframes spellGlow {
                0%, 100% { transform: scale(1); opacity: 0.24; }
                50% { transform: scale(1.08); opacity: 0.44; }
              }

              @keyframes spellFloat {
                0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); opacity: 0.22; }
                35% { transform: translate3d(0.45rem, -0.75rem, 0) rotate(10deg); opacity: 0.54; }
                60% { transform: translate3d(-0.3rem, 0.4rem, 0) rotate(-8deg); opacity: 0.3; }
              }

              @keyframes spellBurst {
                0% {
                  transform: translate(-50%, -50%) scale(0.3);
                  opacity: 0;
                }
                18% {
                  opacity: 1;
                }
                45% {
                  transform: translate(-50%, -72%) scale(1.7);
                  opacity: 1;
                }
                100% {
                  transform: translate(-50%, -110%) scale(0.8);
                  opacity: 0;
                }
              }
            `}</style>
          </div>
        )}

        <div className="relative z-10">{children}</div>
      </main>
    </div>
  );
}
