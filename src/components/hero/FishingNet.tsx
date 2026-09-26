import { forwardRef } from "react";

/**
 * A semi-transparent diamond-mesh net that fishingEvent.ts scales
 * vertically (from a wrapper with `transform-origin: top`) to simulate it
 * descending from the boat and rising back out. Hidden/zero-height by
 * default.
 *
 * Positioned from `left: 0` (like FishingBoat) rather than a `left: 50%` +
 * `translateX(-50%)` centering trick — GSAP's `x` fully replaces any
 * pre-existing translateX once it takes over the transform, so combining
 * that trick with `gsap.set(el, { x })` silently added the container's
 * half-width on top of the intended position. fishingEvent.ts now accounts
 * for this component's width directly to center it under the boat's hull.
 */
export const FishingNet = forwardRef<HTMLDivElement>(function FishingNet(_props, ref) {
  return (
    <div
      ref={ref}
      className="absolute left-0 top-0 origin-top opacity-0"
      style={{ width: 70, height: 0, transform: "scaleY(0)", willChange: "transform, opacity" }}
    >
      <svg viewBox="0 0 70 140" width="70" height="140" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <pattern id="net-mesh" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <path d="M7,0 L7,14 M0,7 L14,7" stroke="#eef8fa" strokeWidth="1.2" opacity="0.65" />
          </pattern>
        </defs>
        {/* rim connecting the net to the boat's stern */}
        <rect x="4" y="0" width="62" height="4" rx="2" fill="#eef8fa" opacity="0.55" />
        <path
          d="M6,4 L64,4 L52,140 L18,140 Z"
          fill="url(#net-mesh)"
          stroke="#eef8fa"
          strokeOpacity="0.5"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
});
