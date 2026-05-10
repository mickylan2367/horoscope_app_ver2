import { useMemo } from "react";

const seededRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const starGlow = (tone, index) => {
  if (tone !== "warm") {
    return {
      background: "#ffffff",
      boxShadow: "0 0 8px rgba(255,255,255,0.95), 0 0 18px rgba(180,210,255,0.55), 0 0 28px rgba(181,120,255,0.25)",
    };
  }

  if (index % 17 === 0) {
    return {
      background: "#ff9a62",
      boxShadow: "0 0 8px rgba(255,154,98,0.95), 0 0 18px rgba(255,106,92,0.55), 0 0 30px rgba(255,189,112,0.25)",
    };
  }

  if (index % 9 === 0) {
    return {
      background: "#ffd08a",
      boxShadow: "0 0 8px rgba(255,208,138,0.95), 0 0 18px rgba(255,155,98,0.44), 0 0 28px rgba(255,120,120,0.22)",
    };
  }

  return {
    background: "#ffffff",
    boxShadow: "0 0 8px rgba(255,255,255,0.95), 0 0 18px rgba(180,210,255,0.55), 0 0 28px rgba(181,120,255,0.25)",
  };
};

export default function StarrySky({ className = "", fixed = false, tone = "cool", shootingAngle = -26 }) {
  const stars = useMemo(
    () =>
      Array.from({ length: 110 }, (_, index) => {
        const size = seededRandom(index + 1) * 3.5 + 1.2;
        const glow = starGlow(tone, index);
        return {
          width: `${size}px`,
          height: `${size}px`,
          top: `${seededRandom(index + 201) * 100}%`,
          left: `${seededRandom(index + 401) * 100}%`,
          opacity: seededRandom(index + 601) * 0.7 + 0.2,
          animationDuration: `${seededRandom(index + 801) * 4 + 3}s`,
          animationDelay: `${seededRandom(index + 1001) * 4}s`,
          ...glow,
        };
      }),
    [tone],
  );

  return (
    <div className={`starry-sky ${fixed ? "starry-sky-fixed" : ""} ${className}`} aria-hidden="true">
      <style>{starrySkyStyles}</style>
      {stars.map((style, index) => (
        <span key={index} className="starry-sky-star" style={style} />
      ))}
      {Array.from({ length: 4 }).map((_, index) => (
        <span
          key={`shooting-${index}`}
          className="starry-sky-shooting-star"
          style={{
            top: `${12 + index * 18}%`,
            left: `${12 + index * 22}%`,
            animationDelay: `${index * 3.5}s`,
            animationDuration: `${10 + index * 1.2}s`,
            "--starry-sky-angle": `${shootingAngle}deg`,
          }}
        />
      ))}
    </div>
  );
}

const starrySkyStyles = `
  .starry-sky {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .starry-sky-fixed {
    position: fixed;
    z-index: -1;
  }

  .starry-sky-star {
    position: absolute;
    border-radius: 999px;
    animation: starrySkyTwinkle ease-in-out infinite;
    will-change: opacity, transform;
  }

  .starry-sky-shooting-star {
    position: absolute;
    width: 128px;
    height: 2px;
    border-radius: 999px;
    background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.95), rgba(255,255,255,0));
    opacity: 0;
    transform: rotate(var(--starry-sky-angle, -26deg));
    box-shadow:
      0 0 8px rgba(255,255,255,0.72),
      0 0 18px rgba(197, 225, 255, 0.34);
    animation: starrySkyShooting ease-in-out infinite;
    will-change: opacity, transform;
  }

  .starry-sky-shooting-star::after {
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
      0 0 10px rgba(255,255,255,0.92),
      0 0 20px rgba(115, 206, 255, 0.36);
  }

  @keyframes starrySkyTwinkle {
    0%, 100% {
      opacity: 0.25;
      transform: scale(0.85);
    }
    50% {
      opacity: 1;
      transform: scale(1.55);
    }
  }

  @keyframes starrySkyShooting {
    0% {
      opacity: 0;
      transform: rotate(var(--starry-sky-angle, -26deg)) translate3d(0, 0, 0);
    }
    10% {
      opacity: 1;
    }
    35% {
      opacity: 1;
      transform: rotate(var(--starry-sky-angle, -26deg)) translate3d(260px, 110px, 0);
    }
    70% {
      opacity: 1;
      transform: rotate(var(--starry-sky-angle, -26deg)) translate3d(560px, 192px, 0);
    }
    100% {
      opacity: 0;
      transform: rotate(var(--starry-sky-angle, -26deg)) translate3d(840px, 168px, 0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .starry-sky-star,
    .starry-sky-shooting-star {
      animation: none;
    }

    .starry-sky-shooting-star {
      display: none;
    }
  }
`;
