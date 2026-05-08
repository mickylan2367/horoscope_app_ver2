import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DURATION_MS = 2200;

export default function DiaryWarpPage({ defaultTarget = "/diary" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const target = location.state?.target ?? defaultTarget;
  const targetState = location.state?.targetState;
  const reloadAfter = Boolean(location.state?.reloadAfter);
  const warpMode = location.state?.warpMode === "collapse" ? "collapse" : "expand";

  useEffect(() => {
    const redirectTimer = window.setTimeout(() => {
      navigate(target, { replace: true, state: targetState });
      if (reloadAfter) {
        window.setTimeout(() => window.location.reload(), 0);
      }
    }, DURATION_MS);

    return () => {
      window.clearTimeout(redirectTimer);
    };
  }, [navigate, reloadAfter, target, targetState]);

  return (
    <>
      <div
        className={`relative min-h-screen overflow-hidden text-white diary-warp-${warpMode}`}
        style={{ ["--duration-ms"]: `${DURATION_MS}ms` }}
      >
        <div className="diary-warp-source absolute inset-0" />
        <div className="diary-warp-target absolute inset-0" />
        <div className="diary-warp-ripples absolute inset-0" aria-hidden="true">
          <span className="ripple ripple-1" />
          <span className="ripple ripple-2" />
          <span className="ripple ripple-3" />
          <span className="ripple ripple-4" />
          <span className="ripple ripple-5" />
        </div>
        <div className="diary-warp-rays absolute inset-0" aria-hidden="true">
          <span className="warp-ray warp-ray-1" />
          <span className="warp-ray warp-ray-2" />
          <span className="warp-ray warp-ray-3" />
          <span className="warp-ray warp-ray-4" />
        </div>
        <div className="diary-warp-veil absolute inset-0" aria-hidden="true" />
        <div className="diary-warp-core absolute inset-0" aria-hidden="true" />
        <div className="diary-warp-glow absolute inset-0" aria-hidden="true" />
      </div>

      <style>{`
        .diary-warp-source {
          background:
            radial-gradient(circle at 18% 20%, rgba(196, 91, 214, 0.14), transparent 28%),
            radial-gradient(circle at 78% 18%, rgba(126, 214, 255, 0.12), transparent 26%),
            radial-gradient(circle at 52% 50%, rgba(255, 255, 255, 0.06), transparent 30%),
            linear-gradient(180deg, #161b2d 0%, #252b46 45%, #32385a 100%);
          animation: diary-warp-source-fade var(--duration-ms) cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          transform-origin: center;
        }

        .diary-warp-collapse .diary-warp-source {
          animation-name: diary-warp-source-close;
        }

        .diary-warp-target {
          background:
            radial-gradient(circle at 15% 20%, rgba(196,136,255,0.18), transparent 28%),
            radial-gradient(circle at 82% 16%, rgba(126,214,255,0.12), transparent 26%),
            radial-gradient(circle at 50% 80%, rgba(117,138,255,0.14), transparent 30%),
            linear-gradient(180deg, #070b17 0%, #090d1d 55%, #0d1429 100%);
          opacity: 0;
          animation: diary-warp-target-fade var(--duration-ms) cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          transform-origin: center;
        }

        .diary-warp-collapse .diary-warp-target {
          animation-name: diary-warp-target-close;
        }

        .diary-warp-glow {
          background:
            radial-gradient(circle at 50% 48%, rgba(255, 255, 255, 0.32), transparent 10%),
            radial-gradient(circle at 50% 50%, rgba(216, 196, 255, 0.3), transparent 28%),
            radial-gradient(circle at 50% 50%, rgba(126, 214, 255, 0.14), transparent 44%),
            radial-gradient(circle at 50% 50%, rgba(244, 194, 194, 0.12), transparent 62%);
          filter: blur(22px);
          mix-blend-mode: screen;
          animation: diary-warp-glow-fade var(--duration-ms) cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        .diary-warp-collapse .diary-warp-glow {
          animation-name: diary-warp-glow-close;
        }

        .diary-warp-ripples {
          display: grid;
          place-items: center;
          pointer-events: none;
        }

        .diary-warp-rays {
          display: grid;
          place-items: center;
          pointer-events: none;
          mix-blend-mode: screen;
        }

        .diary-warp-veil {
          background:
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.28), rgba(216,196,255,0.16) 14%, transparent 38%),
            linear-gradient(90deg, transparent, rgba(216,196,255,0.12), transparent),
            linear-gradient(180deg, transparent, rgba(126,214,255,0.08), transparent);
          opacity: 0;
          mix-blend-mode: screen;
          animation: diary-warp-veil-fade var(--duration-ms) ease-in-out forwards;
        }

        .diary-warp-collapse .diary-warp-veil {
          animation-name: diary-warp-veil-close;
        }

        .diary-warp-core {
          background:
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.72) 0 2%, rgba(255,246,214,0.48) 5%, rgba(216,196,255,0.28) 15%, transparent 32%);
          opacity: 0;
          filter: blur(5px);
          mix-blend-mode: screen;
          animation: diary-warp-core-burst var(--duration-ms) cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        .diary-warp-collapse .diary-warp-core {
          animation-name: diary-warp-core-close;
        }

        .warp-ray {
          position: absolute;
          width: min(150vmin, 1400px);
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.38), rgba(216,196,255,0.28), transparent);
          filter: blur(2px) drop-shadow(0 0 14px rgba(216,196,255,0.24));
          opacity: 0;
          transform-origin: center;
          animation: diary-warp-ray-streak var(--duration-ms) cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        .diary-warp-collapse .warp-ray {
          animation-name: diary-warp-ray-close;
        }

        .warp-ray-1 {
          transform: rotate(18deg) scaleX(0.08);
        }

        .warp-ray-2 {
          animation-delay: 70ms;
          transform: rotate(-18deg) scaleX(0.08);
        }

        .warp-ray-3 {
          animation-delay: 140ms;
          transform: rotate(62deg) scaleX(0.08);
        }

        .warp-ray-4 {
          animation-delay: 210ms;
          transform: rotate(-62deg) scaleX(0.08);
        }

        .ripple {
          position: absolute;
          width: min(92vmin, 860px);
          height: min(92vmin, 860px);
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.34);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.1) inset,
            0 0 34px var(--ripple-glow-soft, rgba(186, 220, 255, 0.14)),
            0 0 80px var(--ripple-glow-wide, rgba(216, 196, 255, 0.1));
          filter: blur(2.4px);
          opacity: 0;
          transform: scale(0.08);
          animation: ripple-expand var(--duration-ms) cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .diary-warp-collapse .ripple {
          transform: scale(1.18);
          animation-name: ripple-collapse;
          animation-timing-function: cubic-bezier(0.7, 0, 0.84, 0);
        }

        .ripple-1 {
          width: min(26vmin, 260px);
          height: min(26vmin, 260px);
          animation-delay: 20ms;
          border-color: rgba(244, 194, 194, 0.34);
          --ripple-glow-soft: rgba(244, 194, 194, 0.18);
          --ripple-glow-wide: rgba(244, 194, 194, 0.1);
        }

        .ripple-2 {
          width: min(44vmin, 430px);
          height: min(44vmin, 430px);
          animation-delay: 110ms;
          border-color: rgba(216, 196, 255, 0.32);
          --ripple-glow-soft: rgba(216, 196, 255, 0.18);
          --ripple-glow-wide: rgba(216, 196, 255, 0.11);
        }

        .ripple-3 {
          width: min(62vmin, 610px);
          height: min(62vmin, 610px);
          animation-delay: 200ms;
          border-color: rgba(126, 214, 255, 0.28);
          --ripple-glow-soft: rgba(126, 214, 255, 0.15);
          --ripple-glow-wide: rgba(126, 214, 255, 0.09);
        }

        .ripple-4 {
          width: min(80vmin, 780px);
          height: min(80vmin, 780px);
          animation-delay: 300ms;
          border-color: rgba(246, 211, 124, 0.24);
          --ripple-glow-soft: rgba(246, 211, 124, 0.13);
          --ripple-glow-wide: rgba(246, 211, 124, 0.08);
        }

        .ripple-5 {
          width: min(98vmin, 960px);
          height: min(98vmin, 960px);
          animation-delay: 400ms;
          border-color: rgba(196, 91, 214, 0.2);
          --ripple-glow-soft: rgba(196, 91, 214, 0.12);
          --ripple-glow-wide: rgba(196, 91, 214, 0.08);
        }

        @keyframes diary-warp-source-fade {
          0% {
            opacity: 1;
            filter: saturate(1.02) brightness(0.98);
            transform: scale(1);
          }
          48% {
            opacity: 1;
            filter: saturate(1.2) brightness(1.08);
            transform: scale(1.035);
          }
          100% {
            opacity: 0;
            filter: saturate(0.96) brightness(0.82);
            transform: scale(1.1);
          }
        }

        @keyframes diary-warp-source-close {
          0% {
            opacity: 1;
            filter: saturate(1.02) brightness(0.98);
            transform: scale(1);
          }
          54% {
            opacity: 0.94;
            filter: saturate(0.95) brightness(0.92);
            transform: scale(0.98);
          }
          100% {
            opacity: 0;
            filter: saturate(0.82) brightness(0.64);
            transform: scale(0.9);
          }
        }

        @keyframes diary-warp-target-fade {
          0% {
            opacity: 0;
            filter: saturate(0.9) brightness(0.82);
            transform: scale(0.96);
          }
          44% {
            opacity: 0.25;
          }
          72% {
            opacity: 0.86;
            filter: saturate(1.08) brightness(1.04);
          }
          100% {
            opacity: 1;
            filter: saturate(1) brightness(1);
            transform: scale(1);
          }
        }

        @keyframes diary-warp-target-close {
          0% {
            opacity: 0;
            filter: saturate(0.9) brightness(0.82);
            transform: scale(1.04);
          }
          54% {
            opacity: 0.18;
          }
          82% {
            opacity: 0.72;
            filter: saturate(0.92) brightness(0.88);
            transform: scale(0.98);
          }
          100% {
            opacity: 1;
            filter: saturate(0.96) brightness(0.92);
            transform: scale(1);
          }
        }

        @keyframes diary-warp-glow-fade {
          0% {
            opacity: 0.24;
            transform: scale(0.7);
          }
          36% {
            opacity: 0.72;
            transform: scale(1.04);
          }
          62% {
            opacity: 0.42;
            transform: scale(1.18);
          }
          100% {
            opacity: 0;
            transform: scale(1.46);
          }
        }

        @keyframes diary-warp-glow-close {
          0% {
            opacity: 0.52;
            transform: scale(1.42);
          }
          46% {
            opacity: 0.68;
            transform: scale(0.96);
          }
          72% {
            opacity: 0.34;
            transform: scale(0.42);
          }
          100% {
            opacity: 0;
            transform: scale(0.16);
          }
        }

        @keyframes diary-warp-veil-fade {
          0%, 20% {
            opacity: 0;
          }
          42% {
            opacity: 0.2;
          }
          66% {
            opacity: 0.14;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes diary-warp-veil-close {
          0%, 18% {
            opacity: 0.16;
          }
          48% {
            opacity: 0.2;
          }
          78% {
            opacity: 0.08;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes diary-warp-core-burst {
          0% {
            opacity: 0;
            transform: scale(0.14);
          }
          26% {
            opacity: 0.2;
            transform: scale(0.52);
          }
          46% {
            opacity: 0.58;
            transform: scale(1.08);
          }
          68% {
            opacity: 0.2;
            transform: scale(1.5);
          }
          100% {
            opacity: 0;
            transform: scale(2);
          }
        }

        @keyframes diary-warp-core-close {
          0% {
            opacity: 0.18;
            transform: scale(1.8);
          }
          42% {
            opacity: 0.5;
            transform: scale(0.84);
          }
          70% {
            opacity: 0.36;
            transform: scale(0.28);
          }
          100% {
            opacity: 0;
            transform: scale(0.08);
          }
        }

        @keyframes diary-warp-ray-streak {
          0% {
            opacity: 0;
          }
          24% {
            opacity: 0;
          }
          42% {
            opacity: 0.36;
          }
          64% {
            opacity: 0.14;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes diary-warp-ray-close {
          0% {
            opacity: 0.14;
          }
          32% {
            opacity: 0.3;
          }
          68% {
            opacity: 0.16;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes ripple-expand {
          0% {
            opacity: 0;
            transform: scale(0.08);
          }
          10% {
            opacity: 0.58;
          }
          42% {
            opacity: 0.28;
          }
          72% {
            opacity: 0.1;
          }
          100% {
            opacity: 0;
            transform: scale(1.52);
          }
        }

        @keyframes ripple-collapse {
          0% {
            opacity: 0;
            transform: scale(1.18);
          }
          18% {
            opacity: 0;
            transform: scale(1.02);
          }
          34% {
            opacity: 0.28;
            transform: scale(0.78);
          }
          58% {
            opacity: 0.34;
            transform: scale(0.42);
          }
          78% {
            opacity: 0.12;
            transform: scale(0.18);
          }
          100% {
            opacity: 0;
            transform: scale(0.08);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .diary-warp-source,
          .diary-warp-target,
          .diary-warp-glow,
          .diary-warp-veil,
          .diary-warp-core,
          .warp-ray,
          .ripple {
            animation-duration: 1ms;
            animation-delay: 0ms;
          }

          .diary-warp-rays,
          .diary-warp-ripples,
          .diary-warp-veil,
          .diary-warp-core {
            display: none;
          }
        }

      `}</style>
    </>
  );
}
