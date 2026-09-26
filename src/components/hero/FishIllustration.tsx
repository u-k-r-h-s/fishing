import type { FishBody, HeroFishSpecies } from "./fishConfig";

/**
 * DEMO ILLUSTRATION — not a photograph. Each species gets a distinct
 * illustrated body archetype (proportions + fins) and its own colour
 * grading, drawn as layered SVG so the tail can flick independently of the
 * body (see the `data-tail` group, animated from SwimmingFish).
 *
 * To upgrade to real photography: export a transparent-background
 * PNG/WebP per species into public/images/fish/hero/{species}.webp (same
 * side-profile, facing right, roughly the same crop as these silhouettes),
 * then swap FishIllustration's <svg> body for an <img>/<Image> using that
 * file — SwimmingFish's tail-flick animation on `data-tail` would need to
 * be dropped or reworked as a subtle scale pulse instead, since a raster
 * photo can't have an independently-animatable tail segment.
 */

interface BodyGeometry {
  body: string;
  dorsalFin: string;
  pectoralFin: string;
  tail: string;
  /** Rotation pivot for the tail group, in the SVG's own 0..130 x 0..60 user units. */
  tailOrigin: string;
  eye: { cx: number; cy: number };
  /** x positions along the body for the faint spot markings (surmai). */
  spotPositions: Array<{ cx: number; cy: number; r: number }>;
}

const GEOMETRY: Record<FishBody, BodyGeometry> = {
  carp: {
    body: "M4,30 C6,18 18,10 34,9 C55,8 78,10 92,18 C98,22 100,26 100,30 C100,34 98,38 92,42 C78,50 55,52 34,51 C18,50 6,42 4,30 Z",
    dorsalFin: "M44,10 L54,-5 L67,9 Z",
    pectoralFin: "M32,33 Q21,44 15,52 Q29,47 37,37 Z",
    tail: "M94,30 L120,12 L106,30 L120,48 Z",
    tailOrigin: "96px 30px",
    eye: { cx: 16, cy: 23 },
    spotPositions: [],
  },
  round: {
    body: "M6,30 C8,14 22,6 40,6 C60,6 76,10 86,18 C92,23 94,27 94,30 C94,33 92,37 86,42 C76,50 60,54 40,54 C22,54 8,46 6,30 Z",
    dorsalFin: "M40,6 L50,-6 L62,5 Z",
    pectoralFin: "M34,33 Q23,43 18,50 Q31,46 39,37 Z",
    tail: "M88,30 Q108,17 114,30 Q108,43 88,30 Z",
    tailOrigin: "92px 30px",
    eye: { cx: 18, cy: 22 },
    spotPositions: [],
  },
  disc: {
    body: "M10,30 C12,10 28,2 45,2 C64,2 78,8 84,18 C88,24 88,27 88,30 C88,33 88,36 84,42 C78,52 64,58 45,58 C28,58 12,50 10,30 Z",
    dorsalFin: "M43,2 L51,-8 L61,1 Z",
    pectoralFin: "M36,32 Q26,41 22,47 Q34,44 41,36 Z",
    tail: "M84,30 Q100,20 104,30 Q100,40 84,30 Z",
    tailOrigin: "86px 30px",
    eye: { cx: 21, cy: 21 },
    spotPositions: [],
  },
  torpedo: {
    body: "M2,30 C4,22 12,16 24,14 C45,11 75,11 96,16 C104,19 108,24 110,30 C108,36 104,41 96,44 C75,49 45,49 24,46 C12,44 4,38 2,30 Z",
    dorsalFin: "M56,12 L64,0 L74,11 Z",
    pectoralFin: "M28,32 Q18,42 13,49 Q26,45 34,36 Z",
    tail: "M104,30 L126,14 L112,30 L126,46 Z",
    tailOrigin: "106px 30px",
    eye: { cx: 12, cy: 25 },
    spotPositions: [
      { cx: 50, cy: 20, r: 1.6 },
      { cx: 62, cy: 40, r: 1.4 },
      { cx: 74, cy: 19, r: 1.5 },
      { cx: 86, cy: 39, r: 1.3 },
    ],
  },
};

export function FishIllustration({
  species,
  className,
}: {
  species: HeroFishSpecies;
  className?: string;
}) {
  const geo = GEOMETRY[species.body];
  const gradId = `fish-grad-${species.id}`;

  return (
    <svg viewBox="0 0 130 60" className={className} aria-hidden="true" overflow="visible">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={species.colors.light} />
          <stop offset="55%" stopColor={species.colors.mid} />
          <stop offset="100%" stopColor={species.colors.dark} />
        </linearGradient>
      </defs>

      {/* Tail — a separate group so it can flick independently of the body. */}
      <g data-tail-target style={{ transformOrigin: geo.tailOrigin }}>
        <path d={geo.tail} fill={species.colors.mid} opacity={0.92} />
      </g>

      <g data-body>
        <path d={geo.body} fill={`url(#${gradId})`} />
        <path d={geo.dorsalFin} fill={species.colors.mid} opacity={0.85} />
        <path d={geo.pectoralFin} fill={species.colors.mid} opacity={0.75} />

        {/* Faint scale-texture lines */}
        <g opacity={0.16} stroke={species.colors.dark} strokeWidth={0.6} fill="none">
          <path d="M30,20 Q50,16 70,20" />
          <path d="M30,30 Q55,27 80,30" />
          <path d="M30,40 Q50,44 70,40" />
        </g>

        {species.spots && (
          <g opacity={0.4} fill={species.colors.dark}>
            {geo.spotPositions.map((spot, i) => (
              <circle key={i} cx={spot.cx} cy={spot.cy} r={spot.r} />
            ))}
          </g>
        )}

        <circle cx={geo.eye.cx} cy={geo.eye.cy} r={2.6} fill="#0f172a" />
        <circle cx={geo.eye.cx + 0.8} cy={geo.eye.cy - 0.8} r={0.7} fill="#f8fafc" opacity={0.85} />
      </g>
    </svg>
  );
}
