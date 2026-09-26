import { WATER_SURFACE_TOP_PERCENT } from "./fishConfig";

/**
 * The line between "above water" (the boat, a hint of sky/light) and
 * "below water" (fish, bubbles, the net). Purely decorative/CSS+SVG —
 * no animation logic lives here.
 */
export function WaterSurface() {
  return (
    <div
      className="absolute inset-x-0"
      style={{ top: 0, height: `${WATER_SURFACE_TOP_PERCENT + 6}%` }}
    >
      {/* A soft hint of light from above, fading into the deep gradient below it. */}
      <div className="absolute inset-0 bg-gradient-to-b from-mint/10 via-transparent to-transparent" />

      <svg
        className="absolute inset-x-0 top-0 h-full w-full opacity-30"
        viewBox="0 0 800 160"
        preserveAspectRatio="none"
      >
        <path
          className="animate-wave-drift"
          d="M-100 30 Q 50 10, 200 30 T 500 30 T 800 30 T 1100 30"
          stroke="rgba(238,248,250,0.5)"
          strokeWidth="2"
          fill="none"
        />
        <path
          className="animate-wave-drift-slow"
          d="M-100 70 Q 50 50, 200 70 T 500 70 T 800 70 T 1100 70"
          stroke="rgba(14,165,198,0.4)"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      {/* Faint reflection band right at the surface line. */}
      <div
        className="absolute inset-x-0 h-px bg-offwhite/20"
        style={{ top: `${(WATER_SURFACE_TOP_PERCENT / (WATER_SURFACE_TOP_PERCENT + 6)) * 100}%` }}
      />
    </div>
  );
}
