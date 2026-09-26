# Hero fish photos — required assets

`src/components/hero/FishIllustration.tsx` looks for one file per species here. None exist yet, so the hero currently shows a small dashed placeholder box per fish instead of a photo.

Required files (exact names):

```
rohu.webp
katla.webp
tilapia.webp
pomfret.webp
surmai.webp
```

Each file must be:

- a real fish photograph, cut out with a **transparent background** (WebP preferred; PNG also works)
- **side profile**, isolated — no plate, no ice, no hand, no hook, no water/ocean background, no text, no border
- **facing right** — head on the image's right edge, tail on the left (`swimFish.ts` assumes this convention when deciding which way to flip a fish for its swim direction; if a photo faces left instead, that convention needs updating alongside the asset)

Drop the file in and reload — no code change needed, the `<img>` picks it up automatically and sizes to its natural aspect ratio.
