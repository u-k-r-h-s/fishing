import { forwardRef } from "react";

/**
 * A small wooden fishing-boat silhouette in warm, high-contrast tones so it
 * reads clearly against the dark navy water (a same-hue boat would all but
 * disappear against the scene background). Hidden by default; fishingEvent.ts
 * drives its position, bobbing, and visibility. Bottom edge of the hull sits
 * at the bottom of the SVG canvas so fishingEvent.ts can anchor it to the
 * water line using just this component's display height.
 */
export const FishingBoat = forwardRef<HTMLDivElement>(function FishingBoat(_props, ref) {
  return (
    <div ref={ref} className="absolute left-0 top-0 opacity-0" style={{ willChange: "transform" }}>
      <svg viewBox="0 0 112 58" width={112} height={58} aria-hidden="true">
        <defs>
          <linearGradient id="boat-hull" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9c6a3f" />
            <stop offset="100%" stopColor="#5c3a1f" />
          </linearGradient>
        </defs>
        {/* reflection hint */}
        <ellipse cx="56" cy="56" rx="36" ry="2.5" fill="#eef8fa" opacity="0.18" />
        {/* hull */}
        <path d="M8,40 L104,40 L90,58 L22,58 Z" fill="url(#boat-hull)" />
        {/* gunwale / deck rail */}
        <path d="M6,40 L106,40 L100,33 L12,33 Z" fill="#e2c49a" />
        {/* cabin */}
        <rect x="42" y="17" width="26" height="17" rx="2" fill="#3c2415" />
        <rect x="46" y="21" width="8" height="6" rx="1" fill="#7fd4e0" opacity="0.85" />
        <rect x="58" y="21" width="8" height="6" rx="1" fill="#7fd4e0" opacity="0.85" />
        {/* mast + flag */}
        <line x1="55" y1="17" x2="55" y2="2" stroke="#3c2415" strokeWidth="2" />
        <path d="M55,3 L73,9 L55,10 Z" fill="#e8724c" />
      </svg>
    </div>
  );
});
