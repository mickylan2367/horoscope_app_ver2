import { useMemo } from "react";
import { motion as Motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { COSMIC_COLORS, COSMIC_VARIANTS } from "../theme/cosmic";

function getVariantConfig(variant) {
  return COSMIC_VARIANTS[variant] ?? COSMIC_VARIANTS.base;
}

export default function CosmicBackground({ variant = "base", animated = true }) {
  const config = getVariantConfig(variant);

  const stars = useMemo(
    () =>
      Array.from({ length: config.stars }).map((_, index) => ({
        id: index,
        left: `${(index * 13) % 100}%`,
        top: `${(index * 19) % 100}%`,
        delay: (index % 6) * 0.5,
        duration: 2.8 + (index % 5),
      })),
    [config.stars]
  );

  const mistScale = config.mistScale;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(196,91,214,0.14),transparent_18%),radial-gradient(circle_at_78%_18%,rgba(168,85,247,0.24),transparent_20%),radial-gradient(circle_at_70%_82%,rgba(34,197,94,0.18),transparent_20%),radial-gradient(circle_at_52%_52%,rgba(196,91,214,0.18),transparent_34%),radial-gradient(circle_at_62%_68%,rgba(88,214,255,0.14),transparent_28%),radial-gradient(circle_at_30%_78%,rgba(59,75,146,0.22),transparent_30%),linear-gradient(180deg,rgba(7,11,23,0.1),rgba(7,11,23,0.88))]" />

      {animated ? (
        <>
          <Motion.div
            className="absolute left-1/2 top-1/2 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.2)_0%,rgba(59,75,146,0.18)_14%,rgba(196,91,214,0.16)_28%,rgba(88,214,255,0.1)_42%,transparent_72%)] blur-3xl"
            style={{
              height: `${72 * mistScale}rem`,
              width: `${72 * mistScale}rem`,
            }}
            animate={{ rotate: 360, scale: [1, 1.03, 1] }}
            transition={{ repeat: Infinity, duration: 180, ease: "linear" }}
          />

          <Motion.div
            className="absolute rounded-full bg-[radial-gradient(circle,rgba(196,91,214,0.18)_0%,rgba(59,75,146,0.12)_20%,transparent_72%)] blur-3xl"
            style={{
              left: "8%",
              top: "14%",
              height: `${42 * mistScale}rem`,
              width: `${42 * mistScale}rem`,
              opacity: config.mistOpacity,
            }}
            animate={{ x: [0, 18, 0], y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 42, ease: "easeInOut" }}
          />

          <Motion.div
            className="absolute rounded-full bg-[radial-gradient(circle,rgba(88,214,255,0.11)_0%,rgba(34,197,94,0.16)_18%,rgba(59,75,146,0.08)_32%,transparent_70%)] blur-3xl"
            style={{
              right: "4%",
              bottom: "8%",
              height: `${38 * mistScale}rem`,
              width: `${38 * mistScale}rem`,
              opacity: config.mistOpacity * 0.9,
            }}
            animate={{ x: [0, -16, 0], y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 48, ease: "easeInOut" }}
          />
        </>
      ) : (
        <>
          <div
            className="absolute left-1/2 top-1/2 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.2)_0%,rgba(59,75,146,0.18)_14%,rgba(196,91,214,0.16)_28%,rgba(88,214,255,0.1)_42%,transparent_72%)] blur-3xl"
            style={{
              height: `${72 * mistScale}rem`,
              width: `${72 * mistScale}rem`,
            }}
          />

          <div
            className="absolute rounded-full bg-[radial-gradient(circle,rgba(196,91,214,0.18)_0%,rgba(59,75,146,0.12)_20%,transparent_72%)] blur-3xl"
            style={{
              left: "8%",
              top: "14%",
              height: `${42 * mistScale}rem`,
              width: `${42 * mistScale}rem`,
              opacity: config.mistOpacity,
            }}
          />

          <div
            className="absolute rounded-full bg-[radial-gradient(circle,rgba(88,214,255,0.11)_0%,rgba(34,197,94,0.16)_18%,rgba(59,75,146,0.08)_32%,transparent_70%)] blur-3xl"
            style={{
              right: "4%",
              bottom: "8%",
              height: `${38 * mistScale}rem`,
              width: `${38 * mistScale}rem`,
              opacity: config.mistOpacity * 0.9,
            }}
          />
        </>
      )}

      <div
        className="absolute inset-0"
        style={{
          opacity: config.vignetteOpacity,
          background:
            "linear-gradient(180deg, rgba(7,11,23,0.1) 0%, rgba(7,11,23,0.48) 45%, rgba(7,11,23,0.8) 100%)",
        }}
      />

      {stars.map((star) => (
        <Motion.div
          key={star.id}
          className="absolute"
          style={{ left: star.left, top: star.top }}
          animate={{
            opacity: [0.25, 0.95, 0.25],
            scale: [0.8, 1.15, 0.8],
            y: [0, -8, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: star.duration,
            delay: star.delay,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="h-4 w-4" style={{ color: COSMIC_COLORS.star }} />
        </Motion.div>
      ))}
    </div>
  );
}
