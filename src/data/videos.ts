/**
 * ============================================================
 *  VIDEO STORYTELLING — EDIT VIDEOS HERE
 * ============================================================
 * Powers the "See the Freshness" section: one featured video
 * plus supporting videos. Videos live under `public/videos/`,
 * posters under `public/images/videos/`.
 *
 * The current files are short, silent, generated placeholder
 * clips (see scripts/generate-placeholder-videos.sh) so the
 * component works out of the box. Replace them with real
 * behind-the-scenes footage any time — same filenames, or
 * update the `video`/`poster` paths below.
 * ============================================================
 */
import type { Localized } from "@/i18n/types";

export interface VideoItem {
  id: string;
  title: Localized<string>;
  description: Localized<string>;
  /** Path under /public, e.g. "/videos/selection.mp4" */
  video: string;
  /** Poster image shown before playback / while loading */
  poster: string;
  featured?: boolean;
}

export const videos: VideoItem[] = [
  {
    id: "selection",
    title: { en: "How We Select Our Fish", hi: "हम मछली कैसे चुनते हैं" },
    description: {
      en: "A look at how each fish is hand-picked at the harbour every morning.",
      hi: "हर सुबह बंदरगाह पर हर मछली को हाथ से कैसे चुना जाता है, इसकी एक झलक।",
    },
    video: "/videos/selection.mp4",
    poster: "/images/videos/selection.svg",
    featured: true,
  },
  {
    id: "cleaning",
    title: { en: "Cleaning & Preparation", hi: "सफ़ाई और तैयारी" },
    description: {
      en: "Careful cleaning and cutting, exactly to order.",
      hi: "अनुरोध के अनुसार सावधानीपूर्वक सफ़ाई और कटाई।",
    },
    video: "/videos/cleaning.mp4",
    poster: "/images/videos/cleaning.svg",
  },
  {
    id: "packaging",
    title: { en: "Packaging & Handover", hi: "पैकेजिंग और सुपुर्दगी" },
    description: {
      en: "Packed with care so freshness travels with you.",
      hi: "सावधानी से पैक किया गया ताकि ताज़गी आपके साथ जाए।",
    },
    video: "/videos/packaging.mp4",
    poster: "/images/videos/packaging.svg",
  },
];

export const getFeaturedVideo = (): VideoItem => videos.find((v) => v.featured) ?? videos[0];
export const getSupportingVideos = (): VideoItem[] => videos.filter((v) => !v.featured);
