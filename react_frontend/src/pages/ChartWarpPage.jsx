import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DURATION_MS = 3000;

export default function ChartWarpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const target = location.state?.target ?? "/chart";
  const source = location.state?.source ?? "chart";
  const variant = source === "diary" ? "diary" : "chart";
  const rippleCount = variant === "diary" ? 3 : 5;
  const rippleClasses = Array.from({ length: rippleCount }, (_, index) => `ripple ripple-${index + 1}`);

  useEffect(() => {
    const redirectTimer = window.setTimeout(() => {
      navigate(target, {
        replace: true,
        state: location.state?.targetState,
      });
    }, DURATION_MS);

    return () => {
      window.clearTimeout(redirectTimer);
    };
  }, [location.state?.targetState, navigate, target]);

  return (
    <>
      <div
        className="relative min-h-screen overflow-hidden text-white"
        style={{ ["--duration-ms"]: `${DURATION_MS}ms` }}
      >
        <div className={`warp-base absolute inset-0 warp-base-${variant}`} />
        <div className={`warp-space absolute inset-0 warp-space-${variant}`} aria-hidden="true" />
        <div className="warp-ripples absolute inset-0" aria-hidden="true">
          {rippleClasses.map((className) => (
            <span key={className} className={className} />
          ))}
        </div>
        <div className="warp-flash absolute inset-0" aria-hidden="true" />
        <div className="warp-glow absolute inset-0" aria-hidden="true" />
      </div>

      <style>{`
        .warp-base {
          animation: warp-base-fade var(--duration-ms) ease-in-out forwards;
        }

        .warp-base-chart {
          background:
            radial-gradient(circle at 18% 20%, rgba(196, 91, 214, 0.18), transparent 26%),
            radial-gradient(circle at 78% 18%, rgba(126, 214, 255, 0.16), transparent 24%),
            radial-gradient(circle at 52% 50%, rgba(255, 255, 255, 0.08), transparent 28%),
            linear-gradient(180deg, #161b2d 0%, #252b46 45%, #32385a 100%);
        }

        .warp-base-diary {
          background:
            radial-gradient(circle at 15% 20%, rgba(196,136,255,0.16), transparent 26%),
            radial-gradient(circle at 82% 16%, rgba(126,214,255,0.14), transparent 24%),
            radial-gradient(circle at 50% 80%, rgba(117,138,255,0.12), transparent 28%),
            linear-gradient(180deg, #070b17 0%, #090d1d 55%, #0d1429 100%);
        }

        .warp-space {
          opacity: 1;
          animation: warp-space-fade var(--duration-ms) ease-in-out forwards;
        }

        .warp-space-chart {
          background:
            radial-gradient(circle at 18% 20%, rgba(196, 91, 214, 0.14), transparent 24%),
            radial-gradient(circle at 82% 14%, rgba(88, 214, 255, 0.14), transparent 22%),
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1), transparent 18%),
            radial-gradient(circle at 30% 78%, rgba(59, 75, 146, 0.2), transparent 32%),
            linear-gradient(180deg, rgba(5, 8, 18, 0.08), rgba(5, 8, 18, 0.92));
        }

        .warp-space-diary {
          background:
            radial-gradient(circle at 15% 20%, rgba(196,136,255,0.12), transparent 24%),
            radial-gradient(circle at 82% 16%, rgba(126,214,255,0.12), transparent 22%),
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1), transparent 18%),
            radial-gradient(circle at 30% 78%, rgba(117,138,255,0.18), transparent 32%),
            linear-gradient(180deg, rgba(7, 11, 23, 0.08), rgba(7, 11, 23, 0.92));
        }

        .warp-glow {
          background:
            radial-gradient(circle at 50% 48%, rgba(255, 255, 255, 0.22), transparent 10%),
            radial-gradient(circle at 50% 50%, rgba(123, 165, 255, 0.16), transparent 24%),
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.04), transparent 42%);
          filter: blur(14px);
          opacity: 1;
          animation: warp-glow-fade var(--duration-ms) ease-in-out forwards;
        }

        .warp-flash {
          background:
            radial-gradient(circle at 50% 48%, rgba(255,255,255,0.85), rgba(255,255,255,0.38) 14%, transparent 34%),
            linear-gradient(180deg, rgba(255,255,255,0.26), rgba(255,255,255,0));
          mix-blend-mode: screen;
          opacity: 0;
          animation: warp-flash-fade var(--duration-ms) ease-in-out forwards;
        }

        .warp-ripples {
          display: grid;
          place-items: center;
          pointer-events: none;
        }

        .ripple {
          position: absolute;
          width: min(92vmin, 900px);
          height: min(92vmin, 900px);
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.22);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.06) inset,
            0 0 24px rgba(186, 220, 255, 0.08);
          filter: blur(3px);
          opacity: 0;
          transform: scale(0.12);
          animation: ripple-expand var(--duration-ms) ease-out forwards;
        }

        .ripple-1 {
          width: min(40vmin, 360px);
          height: min(40vmin, 360px);
          animation-delay: 10ms;
        }

        .ripple-2 {
          width: min(58vmin, 520px);
          height: min(58vmin, 520px);
          animation-delay: 120ms;
          border-color: rgba(255, 255, 255, 0.2);
        }

        .ripple-3 {
          width: min(76vmin, 700px);
          height: min(76vmin, 700px);
          animation-delay: 240ms;
          border-color: rgba(255, 255, 255, 0.16);
        }

        .ripple-4 {
          width: min(88vmin, 820px);
          height: min(88vmin, 820px);
          animation-delay: 340ms;
          border-color: rgba(255, 255, 255, 0.12);
        }

        .ripple-5 {
          width: min(100vmin, 960px);
          height: min(100vmin, 960px);
          animation-delay: 460ms;
          border-color: rgba(255, 255, 255, 0.08);
        }

        @keyframes warp-base-fade {
          0% {
            filter: saturate(0.92) brightness(0.96);
          }
          100% {
            filter: saturate(1) brightness(1);
          }
        }

        @keyframes warp-space-fade {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes warp-glow-fade {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.02);
          }
        }

        @keyframes warp-flash-fade {
          0% {
            opacity: 0;
          }
          18% {
            opacity: 0.18;
          }
          34% {
            opacity: 0.55;
          }
          48% {
            opacity: 0.28;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes ripple-expand {
          0% {
            opacity: 0;
            transform: scale(0.12);
          }
          12% {
            opacity: 0.72;
          }
          58% {
            opacity: 0.16;
          }
          100% {
            opacity: 0;
            transform: scale(1.34);
          }
        }
      `}</style>
    </>
  );
}
