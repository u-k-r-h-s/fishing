/**
 * ============================================================
 *  HERO FISH CONFIG
 * ============================================================
 * Species + depth-layer tuning for the underwater hero. Species
 * are drawn from the real catalogue (src/data/fish.ts) so the
 * hero shows the actual fish this business sells — no invented
 * tropical/decorative species.
 *
 * `id` is also the asset filename FishIllustration.tsx looks for
 * (public/images/fish/hero/{id}.webp) — see that file for the
 * exact photo requirements and orientation convention.
 * ============================================================
 */

export type FishLayer = "background" | "midground" | "foreground";

export interface HeroFishSpecies {
  id: string;
  /** Catalogue slug this matches, for reference/documentation only. */
  catalogueId: string;
}

export const HERO_SPECIES: HeroFishSpecies[] = [
  { id: "rohu", catalogueId: "rohu" },
  { id: "katla", catalogueId: "katla" },
  { id: "tilapia", catalogueId: "tilapia" },
  { id: "pomfret", catalogueId: "pomfret" },
  { id: "surmai", catalogueId: "surmai" },
];

export interface FishInstanceConfig {
  species: HeroFishSpecies;
  layer: FishLayer;
  /** vertical position, percent of container height, at the start of its path */
  top: number;
  /** width in px at 1x scale (before layer scaling) */
  size: number;
  /** seconds to cross the full container width once */
  duration: number;
  delay: number;
  direction: 1 | -1;
  /** amplitude in px of the curved vertical path */
  curveAmplitude: number;
}

/**
 * Per-layer visual depth treatment. `brightness`/`saturate` give distant
 * fish a subtle underwater-haze look (dimmer, slightly less saturated —
 * not blue-tinted) instead of just blurring them; foreground fish get
 * full, undimmed color since they're "closer to the camera".
 */
export const LAYER_STYLE: Record<
  FishLayer,
  { scale: number; opacity: number; blurPx: number; brightness: number; saturate: number; parallax: number; z: number }
> = {
  background: { scale: 0.45, opacity: 0.55, blurPx: 1.5, brightness: 0.82, saturate: 0.82, parallax: 0.12, z: 1 },
  midground: { scale: 0.75, opacity: 0.8, blurPx: 0.5, brightness: 0.92, saturate: 0.92, parallax: 0.35, z: 2 },
  foreground: { scale: 1, opacity: 1, blurPx: 0, brightness: 1, saturate: 1, parallax: 0.85, z: 3 },
};

/**
 * The full fish cast. Always rendered (so SSR/first paint doesn't depend on
 * viewport width, avoiding a hydration mismatch); swimFish.ts thins this
 * down on narrow screens by simply not animating/showing some of them,
 * rather than this list changing shape per-render. Sizes are the base (1x)
 * width in px, before LAYER_STYLE's per-layer scale — background ~35-45px,
 * midground ~65-80px, foreground ~95-110px once scaled, so distance reads
 * clearly without any fish feeling oversized.
 */
export function buildFishInstances(): FishInstanceConfig[] {
  const [rohu, katla, tilapia, pomfret, surmai] = HERO_SPECIES;

  return [
    { species: rohu, layer: "background", top: 16, size: 78, duration: 36, delay: 0, direction: 1, curveAmplitude: 14 },
    { species: tilapia, layer: "background", top: 64, size: 68, duration: 42, delay: 7, direction: -1, curveAmplitude: 10 },
    { species: katla, layer: "background", top: 38, size: 74, duration: 48, delay: 15, direction: 1, curveAmplitude: 12 },

    { species: pomfret, layer: "midground", top: 28, size: 92, duration: 27, delay: 2, direction: 1, curveAmplitude: 22 },
    { species: surmai, layer: "midground", top: 72, size: 100, duration: 31, delay: 11, direction: -1, curveAmplitude: 18 },
    { species: rohu, layer: "midground", top: 53, size: 84, duration: 23, delay: 18, direction: 1, curveAmplitude: 20 },

    { species: surmai, layer: "foreground", top: 46, size: 108, duration: 20, delay: 1, direction: 1, curveAmplitude: 30 },
    { species: katla, layer: "foreground", top: 67, size: 92, duration: 25, delay: 10, direction: -1, curveAmplitude: 26 },
  ];
}

/**
 * Fishing-boat cinematic event — an occasional, non-repetitive story beat
 * rather than a loop. Both the initial wait and the gap between events are
 * randomized within these ranges (ms) so it never feels mechanical.
 */
export const fishingEventConfig = {
  initialDelay: [15000, 25000] as [number, number],
  interval: [30000, 60000] as [number, number],
  /** How many of the nearest fish react/get caught per event. */
  fishAffected: 2,
};

export function randomBetween([min, max]: [number, number]): number {
  return min + Math.random() * (max - min);
}

/** Vertical position (percent of hero height) of the water line — the boat sits just above it, the net drops just below it. */
export const WATER_SURFACE_TOP_PERCENT = 14;
