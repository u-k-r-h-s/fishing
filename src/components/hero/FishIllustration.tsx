"use client";

import { useEffect, useRef, useState } from "react";
import type { HeroFishSpecies } from "./fishConfig";

/**
 * Renders a photographic, transparent-background fish cutout from
 * public/images/fish/hero/{species.id}.webp — see the README in that folder
 * for what each asset is, where it came from, and the license/attribution
 * that comes with it (they're sourced Wikimedia Commons photos for now, not
 * commissioned photography).
 *
 * Convention: every asset faces RIGHT (head on the image's right edge, tail
 * on the left) — swimFish.ts's facingFlip assumes this when deciding which
 * way to mirror a fish for its swim direction. Replacing an asset with one
 * that faces left needs a matching change there.
 *
 * If a species' file is ever missing (e.g. deleted, or a new species added
 * to fishConfig.ts without art yet), this renders nothing rather than a
 * visible placeholder or the old SVG art — check the console for a 404 on
 * that species' path.
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
    return null;
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
