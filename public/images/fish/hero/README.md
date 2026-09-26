# Hero fish photos

`src/components/hero/FishIllustration.tsx` renders one file per species from this folder. All 5 are now present, background-removed and cropped to a transparent-background cutout, head facing right per the site's convention.

```
rohu.webp
katla.webp
tilapia.webp
pomfret.webp
surmai.webp
```

## Sources and licenses — attribution required

These are **temporary sourced assets**, not commissioned/owned photography. Each is a real fish photo pulled from Wikimedia Commons under a license that permits commercial use but **requires attribution** (and, for the two CC BY-SA ones, that the image itself stay under the same license if redistributed on its own — this doesn't affect the rest of the site's code/content, only the image file). Processing applied to all of them here: background removed (rembg/u2net), cropped to the fish's bounding box, and horizontally flipped where the source faced left, so every asset faces right.

| File | Original source | Author | License |
|---|---|---|---|
| `rohu.webp` | [Labeo_rohita.JPG](https://commons.wikimedia.org/wiki/File:Labeo_rohita.JPG) | Khalid Mahmood | CC BY-SA 4.0 |
| `katla.webp` | [Catla_catla.JPG](https://commons.wikimedia.org/wiki/File:Catla_catla.JPG) | Khalid Mahmood | CC BY-SA 4.0 |
| `tilapia.webp` | [Oreochromis_niloticus_Egypt.jpg](https://commons.wikimedia.org/wiki/File:Oreochromis_niloticus_Egypt.jpg) | Magdy A. Saleh | CC BY 3.0 |
| `pomfret.webp` | [Pampus_argenteus_1.jpg](https://commons.wikimedia.org/wiki/File:Pampus_argenteus_1.jpg) | Hamid Badar Osmany | CC BY 3.0 |
| `surmai.webp` | [Scomberomorus_commerson_(USNM-403390).jpg](https://commons.wikimedia.org/wiki/File:Scomberomorus_commerson_(USNM-403390).jpg) | Jeffrey Williams / Smithsonian NMNH, via US FDA | Public domain |

**Action needed from the business owner:** either add a small credits/attribution note somewhere on the site (e.g. site footer or an `/attributions` page) crediting the four licensed photos above, or replace these placeholder-sourced cutouts with commissioned/owned photography before treating the hero as finished. Using them as-is without any attribution does not satisfy the CC BY / CC BY-SA license terms.

## Replacing an asset

Overwrite the file with a same-named WebP (or PNG) — no code change needed, the `<img>` sizes to whatever aspect ratio you drop in. Keep the same orientation convention: side profile, isolated fish, transparent background, **head facing right / tail facing left**.
