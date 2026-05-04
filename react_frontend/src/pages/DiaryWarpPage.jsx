import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DURATION_MS = 1500;

export default function DiaryWarpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const target = location.state?.target ?? "/diary";

  useEffect(() => {
    const redirectTimer = window.setTimeout(() => {
      navigate(target, { replace: true });
    }, DURATION_MS);

    return () => {
      window.clearTimeout(redirectTimer);
    };
  }, [navigate, target]);

  return (
    <>
      <div
        className="relative min-h-screen overflow-hidden text-white"
        style={{ ["--duration-ms"]: `${DURATION_MS}ms` }}
      >
        <div className="diary-warp-source absolute inset-0" />
        <div className="diary-warp-target absolute inset-0" />
        <div className="diary-warp-ripples absolute inset-0" aria-hidden="true">
          <span className="ripple ripple-1" />
          <span className="ripple ripple-2" />
          <span className="ripple ripple-3" />
        </div>
        <div className="diary-warp-glow absolute inset-0" aria-hidden="true" />
      </div>

      <style>{`
        .diary-warp-source {
          background:
            radial-gradient(circle at 18% 20%, rgba(196, 91, 214, 0.16), transparent 26%),
            radial-gradient(circle at 78% 18%, rgba(126, 214, 255, 0.15), transparent 24%),
            radial-gradient(circle at 52% 50%, rgba(255, 255, 255, 0.08), transparent 28%),
            linear-gradient(180deg, #161b2d 0%, #252b46 45%, #32385a 100%);
          animation: diary-warp-source-fade var(--duration-ms) ease-in-out forwards;
        }

        .diary-warp-target {
          background:
            radial-gradient(circle at 15% 20%, rgba(196,136,255,0.16), transparent 26%),
            radial-gradient(circle at 82% 16%, rgba(126,214,255,0.14), transparent 24%),
            radial-gradient(circle at 50% 80%, rgba(117,138,255,0.12), transparent 28%),
            linear-gradient(180deg, #070b17 0%, #090d1d 55%, #0d1429 100%);
          opacity: 0;
          animation: diary-warp-target-fade var(--duration-ms) ease-in-out forwards;
        }

        .diary-warp-glow {
          background:
            radial-gradient(circle at 50% 48%, rgba(255, 255, 255, 0.22), transparent 10%),
            radial-gradient(circle at 50% 50%, rgba(123, 165, 255, 0.16), transparent 24%),
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.04), transparent 42%);
          filter: blur(16px);
          animation: diary-warp-glow-fade var(--duration-ms) ease-in-out forwards;
        }

        .diary-warp-ripples {
          display: grid;
          place-items: center;
          pointer-events: none;
        }

        .ripple {
          position: absolute;
          width: min(72vmin, 640px);
          height: min(72vmin, 640px);
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.42);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.12) inset,
            0 0 26px rgba(186, 220, 255, 0.12);
          filter: blur(1.6px);
          opacity: 0;
          transform: scale(0.12);
          animation: ripple-expand var(--duration-ms) ease-out forwards;
        }

        .ripple-1 {
          width: min(34vmin, 300px);
          height: min(34vmin, 300px);
          animation-delay: 20ms;
        }

        .ripple-2 {
          width: min(54vmin, 480px);
          height: min(54vmin, 480px);
          animation-delay: 120ms;
          border-color: rgba(255, 255, 255, 0.34);
        }

        .ripple-3 {
          width: min(72vmin, 640px);
          height: min(72vmin, 640px);
          animation-delay: 220ms;
          border-color: rgba(255, 255, 255, 0.24);
        }

        @keyframes diary-warp-source-fade {
          0% {
            opacity: 1;
            filter: saturate(1.02) brightness(0.98);
          }
          100% {
            opacity: 0;
            filter: saturate(0.96) brightness(0.92);
          }
        }

        @keyframes diary-warp-target-fade {
          0% {
            opacity: 0;
            filter: saturate(0.9) brightness(0.96);
          }
          100% {
            opacity: 1;
            filter: saturate(1) brightness(1);
          }
        }

        @keyframes diary-warp-glow-fade {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.03);
          }
        }

        @keyframes ripple-expand {
          0% {
            opacity: 0;
            transform: scale(0.12);
          }
          12% {
            opacity: 0.9;
          }
          66% {
            opacity: 0.28;
          }
          100% {
            opacity: 0;
            transform: scale(1.24);
          }
        }

      `}</style>
    </>
  );
}
