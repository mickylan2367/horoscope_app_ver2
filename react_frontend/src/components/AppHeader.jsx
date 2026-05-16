import { Link } from "react-router-dom";
import packageInfo from "../../package.json";

const APP_VERSION = packageInfo.version;

export default function AppHeader({ variant = "pink", compact = true, menu = null, children = null }) {
  const isCosmic = variant === "cosmic";
  const headerClassName = isCosmic
    ? "fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-gradient-to-r from-[#1a1026]/18 via-[#2a1530]/14 to-[#1a1026]/18 backdrop-blur-2xl"
    : "sticky top-0 z-50 border-b border-[#cfabc0] bg-gradient-to-r from-[#c98ca8] via-[#ddb0c0] to-[#dca5b6] shadow-sm";
  const innerClassName = `${isCosmic ? "home-content-scale " : ""}mx-auto flex max-w-6xl items-center justify-between px-6 ${
    isCosmic ? "py-3.5 md:px-10" : compact ? "py-3 md:px-8 md:py-3" : "py-4 md:px-10"
  }`;
  const titleClassName = isCosmic
    ? `font-semibold tracking-[0.22em] text-white transition hover:text-white ${compact ? "text-base md:text-lg" : "text-lg"}`
    : `font-bold tracking-wide text-[#4b3850] transition hover:text-[#7b5b70] ${compact ? "text-lg md:text-xl" : "text-xl"}`;
  const versionClassName = isCosmic ? "text-xs text-[#d9c9ef]/70" : "text-xs text-[#5a455e]/70";

  return (
    <header className={headerClassName}>
      <div className={innerClassName}>
        <div className="flex min-w-0 items-baseline gap-2">
          <Link to="/" className={titleClassName}>
            Daily Witchcrafts
          </Link>
          <span className={versionClassName}>v{APP_VERSION}</span>
        </div>
        {children}
      </div>
      {menu}
    </header>
  );
}
