"use client";

import { useEffect, useRef, useState } from "react";
import type { HeroFishSpecies } from "./fishConfig";

/**
 * ============================================================
 *  REQUIRED ASSETS — NOT YET IN THE REPOSITORY
 * ============================================================
 * This renders a photographic, transparent-background fish cutout. It
 * deliberately replaced the earlier hand-drawn SVG illustrations (gradient-
 * filled vector shapes), which read as cartoon/vector art rather than real
 * fish — see git history for that version if it's ever needed for
 * reference.
 *
 * Drop one photo per species at:
 *
 *   public/images/fish/hero/rohu.webp
 *   public/images/fish/hero/katla.webp
 *   public/images/fish/hero/tilapia.webp
 *   public/images/fish/hero/pomfret.webp
 *   public/images/fish/hero/surmai.webp
 *
 * Each file must be:
 * - a real fish photograph, cut out with a transparent background
 *   (WebP preferred; PNG also works — this component doesn't care which,
 *   as long as the filename matches the species id above)
 * - side profile, isolated (no plate/ice/hand/hook/water/background/text)
 * - facing RIGHT — head on the image's right edge, tail on the left.
 *   swimFish.ts's facingFlip assumes this convention when deciding which
 *   way to mirror a fish for its swim direction; if your source photos
 *   face left instead, flip that convention in swimFish.ts to match.
 *
 * Until a real photo exists at a given path, this renders a clearly
 * labelled placeholder box instead of silently reusing the old SVG art —
 * so a missing asset is obvious in development, not invisible.
 */
export function FishIllustration({
  species,
  className,
}: {
  species: HeroFishSpecies;
  className?: string;
}) {
  const [missing, setMissing] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // A same-origin 404 on localhost can fail before the browser gets around
  // to it — the `error` event has sometimes already fired by the time
  // React's onError handler is wired up during commit. Catching it here too
  // (checking the element's own load state right after mount) makes the
  // placeholder reliable instead of racy.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setMissing(true);
    }
  }, [species.id]);

  if (missing) {
    return (
      <div
        className={className}
        style={{
          aspectRatio: "2.1 / 1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 999,
          border: "1px dashed rgba(238,248,250,0.55)",
          background: "rgba(238,248,250,0.08)",
          color: "rgba(238,248,250,0.8)",
          fontSize: 8,
          lineHeight: 1.15,
          textAlign: "center",
          padding: 2,
        }}
      >
        {species.id}.webp missing
      </div>
    );
  }

  return (
    // Plain <img>, not next/image: this is a decorative, GSAP-transformed
    // background element with no fixed layout dimensions (its wrapper sets
    // width; height follows the photo's natural aspect ratio), so next/image's
    // layout/lazy-loading machinery would fight the animation for no benefit.
    <img
      ref={imgRef}
      src={`/images/fish/hero/${species.id}.webp`}
      alt=""
      draggable={false}
      className={className}
      style={{ display: "block", width: "100%", height: "auto" }}
      onError={() => setMissing(true)}
    />
  );
}
