export const COSMIC_VARIANTS = {
  base: {
    stars: 10,
    mistScale: 0.72,
    mistOpacity: 0.12,
    gridOpacity: 0.04,
    vignetteOpacity: 0.72,
  },
  soft: {
    stars: 16,
    mistScale: 0.88,
    mistOpacity: 0.16,
    gridOpacity: 0.07,
    vignetteOpacity: 0.62,
  },
  hero: {
    stars: 30,
    mistScale: 1,
    mistOpacity: 0.22,
    gridOpacity: 0.12,
    vignetteOpacity: 0.48,
  },
};

export const COSMIC_COLORS = {
  navy: "#070b17",
  indigo: "#3b4b92",
  fuchsia: "#c45bd6",
  cyan: "#58d6ff",
  star: "rgba(255, 255, 255, 0.7)",
};

export const COSMIC_SURFACES = {
  panel: {
    ring: "border-white/12",
    fill: "bg-white/6",
    shadow: "shadow-[0_20px_80px_rgba(0,0,0,0.18)]",
    blur: "backdrop-blur-xl",
  },
  card: {
    ring: "border-white/14",
    fill: "bg-white/8",
    shadow: "shadow-[0_16px_52px_rgba(0,0,0,0.14)]",
    blur: "backdrop-blur-lg",
  },
  button: {
    ring: "border-white/16",
    fill: "bg-white/10",
    shadow: "shadow-[0_12px_32px_rgba(0,0,0,0.14)]",
    blur: "backdrop-blur-md",
  },
};
