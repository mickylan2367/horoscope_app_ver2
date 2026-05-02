const SURFACE_TONES = {
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

export default function CosmicPanel({
  as,
  tone = "panel",
  className = "",
  children,
  ...props
}) {
  const surface = SURFACE_TONES[tone] ?? SURFACE_TONES.panel;
  const Component = as ?? "div";

  return (
    <Component
      className={`rounded-[2rem] border ${surface.ring} ${surface.fill} ${surface.shadow} ${surface.blur} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}
