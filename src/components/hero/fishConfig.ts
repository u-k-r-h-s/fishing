/**
 * ============================================================
 *  HERO FISH CONFIG
 * ============================================================
 * Species + depth-layer tuning for the underwater hero. Species
 * are drawn from the real catalogue (src/data/fish.ts) so the
 * hero shows the actual fish this business sells — no invented
 * tropical/decorative species.
 *
 * `body` selects an illustrated silhouette archetype (see
 * FishIllustration.tsx): carp-like (rohu/katla), round/deep-bodied
 * (tilapia), disc-shaped (pomfret), or torpedo-shaped (surmai).
 * These are DEMO illustrations — see the README note in
 * FishIllustration.tsx for what to replace them with.
 * ============================================================
 */

export type FishBody = "carp" | "round" | "disc" | "torpedo";
export type FishLayer = "background" | "midground" | "foreground";

export interface HeroFishSpecies {
  id: string;
  /** Catalogue slug this matches, for reference/documentation only. */
  catalogueId: string;
  body: FishBody;
  /** Body gradient — light (top/belly highlight) to dark (top/back shadow). */
  colors: { light: string; mid: string; dark: string };
  /** Subtle marking accent (e.g. Surmai's faint spots) — omit for a plain body. */
  spots?: boolean;
}

export const HERO_SPECIES: HeroFishSpecies[] = [
  { id: "rohu", catalogueId: "rohu", body: "carp", colors: { light: "#cfe9f2", mid: "#7fb3c9", dark: "#2f5a6e" } },
  { id: "katla", catalogueId: "katla", body: "carp", colors: { light: "#d7e6e2", mid: "#8aa9a2", dark: "#3a5450" } },
  { id: "tilapia", catalogueId: "tilapia", body: "round", colors: { light: "#dce6d2", mid: "#93a67e", dark: "#42523a" } },
  { id: "pomfret", catalogueId: "pomfret", body: "disc", colors: { light: "#eef2f5", mid: "#b9c6cd", dark: "#5c6c74" } },
  { id: "surmai", catalogueId: "surmai", body: "torpedo", colors: { light: "#cfe0ea", mid: "#5f86a0", dark: "#243c4c" }, spots: true },
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

/** Per-layer visual depth treatment. */
export const LAYER_STYLE: Record<
  FishLayer,
  { scale: number; opacity: number; blurPx: number; parallax: number; z: number }
> = {
  background: { scale: 0.55, opacity: 0.38, blurPx: 1.5, parallax: 0.12, z: 1 },
  midground: { scale: 0.8, opacity: 0.7, blurPx: 0.4, parallax: 0.35, z: 2 },
  foreground: { scale: 1.15, opacity: 0.98, blurPx: 0, parallax: 0.85, z: 3 },
};

/**
 * The full fish cast. Always rendered (so SSR/first paint doesn't depend on
 * viewport width, avoiding a hydration mismatch); swimFish.ts thins out the
 * background layer on narrow screens by simply not animating/showing a few
 * of them, rather than this list changing shape per-render.
 */
export function buildFishInstances(): FishInstanceConfig[] {
  const [rohu, katla, tilapia, pomfret, surmai] = HERO_SPECIES;

  return [
    { species: rohu, layer: "background", top: 16, size: 46, duration: 36, delay: 0, direction: 1, curveAmplitude: 14 },
    { species: tilapia, layer: "background", top: 64, size: 40, duration: 42, delay: 7, direction: -1, curveAmplitude: 10 },
    { species: katla, layer: "background", top: 38, size: 44, duration: 48, delay: 15, direction: 1, curveAmplitude: 12 },

    { species: pomfret, layer: "midground", top: 28, size: 66, duration: 27, delay: 2, direction: 1, curveAmplitude: 22 },
    { species: surmai, layer: "midground", top: 72, size: 70, duration: 31, delay: 11, direction: -1, curveAmplitude: 18 },
    { species: rohu, layer: "midground", top: 53, size: 58, duration: 23, delay: 18, direction: 1, curveAmplitude: 20 },

    { species: surmai, layer: "foreground", top: 46, size: 96, duration: 20, delay: 1, direction: 1, curveAmplitude: 30 },
    { species: katla, layer: "foreground", top: 67, size: 80, duration: 25, delay: 10, direction: -1, curveAmplitude: 26 },
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

