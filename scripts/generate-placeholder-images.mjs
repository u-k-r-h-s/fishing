// One-off script to generate premium-looking placeholder SVG artwork
// for demo fish, hero, and about images. Run with:
//   node scripts/generate-placeholder-images.mjs
// These are DEMO images only — replace the files under public/images
// with real photography whenever you're ready; filenames can stay the same.

import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public", "images");

const PALETTES = [
  ["#082f49", "#0369a1"],
  ["#0369a1", "#0891b2"],
  ["#0891b2", "#0e7490"],
  ["#075985", "#0891b2"],
  ["#0c4a6e", "#0369a1"],
  ["#155e75", "#0891b2"],
];

function waveRows(seed) {
  let rows = "";
  for (let i = 0; i < 5; i++) {
    const y = 120 + i * 90 + (seed % 20);
    rows += `<path d="M0 ${y} Q 150 ${y - 30}, 300 ${y} T 600 ${y} T 900 ${y}" stroke="rgba(248,250,252,0.08)" stroke-width="2" fill="none"/>`;
  }
  return rows;
}

function fishSilhouette(cx, cy, scale, flip = false) {
  const t = flip ? `translate(${cx * 2}, 0) scale(-1,1) translate(${cx}, ${cy}) scale(${scale})` : `translate(${cx}, ${cy}) scale(${scale})`;
  return `
  <g transform="${t}" fill="rgba(248,250,252,0.92)">
    <path d="M-90 0c20-38 64-64 110-64 36 0 66 14 92 36 10-16 26-30 44-38-4 20-4 40 0 60-4 20-4 40 0 60-18-8-34-22-44-38-26 22-56 36-92 36-46 0-90-26-110-64Z"/>
    <circle cx="-38" cy="-8" r="6" fill="#0f172a"/>
    <path d="M-92 2c-14 4-26 12-34 22 6 2 14 2 22 0-2 10-8 18-16 24 16 2 30-4 40-14" fill="none" stroke="rgba(248,250,252,0.92)" stroke-width="6" stroke-linecap="round"/>
  </g>`;
}

function shrimpSilhouette(cx, cy, scale) {
  return `
  <g transform="translate(${cx}, ${cy}) scale(${scale})" fill="none" stroke="rgba(248,250,252,0.92)" stroke-width="10" stroke-linecap="round">
    <path d="M-120 40c10-70 60-120 130-120 50 0 70 30 70 60 0 20-10 34-26 44 30 4 54 22 54 50 0 34-34 56-78 56-70 0-120-40-150-90Z"/>
    <path d="M-40-60c14-18 34-30 56-34" />
    <path d="M-20-40c10-14 26-24 42-28" />
    <circle cx="-96" cy="-4" r="7" fill="rgba(248,250,252,0.92)" stroke="none"/>
  </g>`;
}

function personSilhouette(cx, cy, scale) {
  return `
  <g transform="translate(${cx}, ${cy}) scale(${scale})" fill="rgba(248,250,252,0.92)">
    <circle cx="0" cy="-70" r="52" />
    <path d="M-120 130c8-70 60-120 120-120s112 50 120 120c-30 20-78 34-120 34s-90-14-120-34Z" />
  </g>`;
}

function playIconOverlay(cx, cy, r) {
  return `
  <g>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="rgba(6,42,58,0.55)" />
    <path d="M${cx - r * 0.28} ${cy - r * 0.42} L${cx - r * 0.28} ${cy + r * 0.42} L${cx + r * 0.48} ${cy} Z" fill="rgba(248,250,252,0.95)" />
  </g>`;
}

function card({ width, height, colors, label, caption, silhouette }) {
  const [from, to] = colors;
  const gradientId = `g-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label} placeholder image">
  <defs>
    <linearGradient id="${gradientId}" x1="0" y1="0" x2="${width}" y2="${height}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${from}"/>
      <stop offset="1" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#${gradientId})"/>
  ${waveRows(width + height)}
  ${silhouette}
  <text x="${width / 2}" y="${height - 36}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" fill="rgba(248,250,252,0.9)" letter-spacing="2">${label.toUpperCase()}</text>
  <text x="${width / 2}" y="${height - 14}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="13" fill="rgba(248,250,252,0.55)">${caption}</text>
</svg>`;
}

const fishList = [
  "rohu",
  "katla",
  "hilsa",
  "prawns",
  "pomfret",
  "surmai",
  "tilapia",
  "basa",
];

mkdirSync(join(publicDir, "fish"), { recursive: true });
mkdirSync(join(publicDir, "hero"), { recursive: true });
mkdirSync(join(publicDir, "about"), { recursive: true });
mkdirSync(join(publicDir, "offers"), { recursive: true });
mkdirSync(join(publicDir, "owner"), { recursive: true });
mkdirSync(join(publicDir, "videos"), { recursive: true });
mkdirSync(join(publicDir, "social"), { recursive: true });

fishList.forEach((name, index) => {
  const colors = PALETTES[index % PALETTES.length];
  const isShrimp = name === "prawns";
  const silhouette = isShrimp
    ? shrimpSilhouette(400, 300, 1)
    : fishSilhouette(400, 300, 1, index % 2 === 1);

  const svg = card({
    width: 800,
    height: 600,
    colors,
    label: name.charAt(0).toUpperCase() + name.slice(1),
    caption: "Demo image — replace in /public/images/fish",
    silhouette,
  });

  writeFileSync(join(publicDir, "fish", `${name}.svg`), svg, "utf8");
});

// Hero — portrait orientation, larger composition with two silhouettes
const heroSvg = card({
  width: 960,
  height: 1200,
  colors: ["#082f49", "#0891b2"],
  label: "OceanFresh Fish",
  caption: "Demo hero image — replace in /public/images/hero",
  silhouette: `
    ${fishSilhouette(480, 460, 1.6)}
    ${shrimpSilhouette(620, 760, 1.1)}
  `,
});
writeFileSync(join(publicDir, "hero", "hero-fish.svg"), heroSvg, "utf8");

// About — landscape composition
const aboutSvg = card({
  width: 960,
  height: 720,
  colors: ["#0c4a6e", "#0369a1"],
  label: "Fresh Selection",
  caption: "Demo about image — replace in /public/images/about",
  silhouette: `
    ${fishSilhouette(340, 380, 1.3)}
    ${fishSilhouette(650, 300, 1, true)}
  `,
});
writeFileSync(join(publicDir, "about", "about-fresh-selection.svg"), aboutSvg, "utf8");

// Process story — "From Water to Your Table"
const processSvg = card({
  width: 960,
  height: 1200,
  colors: ["#062a3a", "#075985"],
  label: "From Water To Table",
  caption: "Demo image — replace in /public/images/about",
  silhouette: `
    ${fishSilhouette(480, 420, 1.5)}
    ${shrimpSilhouette(480, 760, 1)}
  `,
});
writeFileSync(join(publicDir, "about", "process-story.svg"), processSvg, "utf8");

// Owner portrait — square, face-cropped-friendly
const ownerSvg = card({
  width: 800,
  height: 800,
  colors: ["#075985", "#0ea5c6"],
  label: "Owner",
  caption: "Demo portrait — replace in /public/images/owner",
  silhouette: personSilhouette(400, 420, 1.4),
});
writeFileSync(join(publicDir, "owner", "owner.svg"), ownerSvg, "utf8");

// Video posters — landscape 16:9, with a subtle play-icon overlay
const videoPosters = [
  { name: "selection", label: "Selection", silhouette: fishSilhouette(660, 340, 1.4) },
  { name: "cleaning", label: "Cleaning", silhouette: fishSilhouette(660, 340, 1.2, true) },
  { name: "packaging", label: "Packaging", silhouette: shrimpSilhouette(660, 340, 1.1) },
];
videoPosters.forEach(({ name, label, silhouette }, index) => {
  const colors = PALETTES[(index + 2) % PALETTES.length];
  const svg = card({
    width: 960,
    height: 540,
    colors,
    label,
    caption: "Demo video poster — replace in /public/images/videos",
    silhouette: `${silhouette}${playIconOverlay(480, 270, 56)}`,
  });
  writeFileSync(join(publicDir, "videos", `${name}.svg`), svg, "utf8");
});

// Social reel thumbnails — vertical 9:16
const reels = [
  { name: "reel-1", label: "Reel 1" },
  { name: "reel-2", label: "Reel 2" },
  { name: "reel-3", label: "Reel 3" },
];
reels.forEach(({ name, label }, index) => {
  const colors = PALETTES[(index + 4) % PALETTES.length];
  const svg = card({
    width: 540,
    height: 960,
    colors,
    label,
    caption: "Demo reel — replace in /public/images/social",
    silhouette: `${fishSilhouette(270, 420, 1.1, index % 2 === 0)}${playIconOverlay(270, 480, 52)}`,
  });
  writeFileSync(join(publicDir, "social", `${name}.svg`), svg, "utf8");
});

// Offer banners — landscape
const offerBanners = [
  { name: "weekend-catch", label: "Weekend Catch" },
  { name: "bulk-order", label: "Bulk Orders" },
];
offerBanners.forEach(({ name, label }, index) => {
  const colors = PALETTES[(index + 1) % PALETTES.length];
  const svg = card({
    width: 800,
    height: 600,
    colors,
    label,
    caption: "Demo image — replace in /public/images/offers",
    silhouette: fishSilhouette(400, 300, 1.2, index % 2 === 1),
  });
  writeFileSync(join(publicDir, "offers", `${name}.svg`), svg, "utf8");
});

console.log("Placeholder images generated in public/images/");
