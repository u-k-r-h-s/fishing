/**
 * ============================================================
 *  SOCIAL / REELS — EDIT THE SOCIAL SHOWCASE HERE
 * ============================================================
 * Powers the "Follow the Freshness" smartphone reel section.
 * Vertical (9:16) videos live under `public/videos/social/`,
 * thumbnails under `public/images/social/`.
 *
 * `url` should point at the real Instagram/Facebook post once
 * available — leave it "" to hide the external "View on..."
 * link for that post.
 * ============================================================
 */
import type { Localized } from "@/i18n/types";

export interface SocialPost {
  id: string;
  platform: "instagram" | "facebook" | "youtube";
  title: Localized<string>;
  caption: Localized<string>;
  /** Vertical 9:16 clip, path under /public */
  video: string;
  thumbnail: string;
  /** Link to the real post — leave "" if not published yet */
  url: string;
}

export const socialPosts: SocialPost[] = [
  {
    id: "reel-1",
    platform: "instagram",
    title: { en: "This Morning's Catch", hi: "आज सुबह की पकड़" },
    caption: {
      en: "Fresh off the boat and onto the counter within the hour.",
      hi: "नाव से उतरकर एक घंटे के भीतर काउंटर तक।",
    },
    video: "/videos/social/reel-1.mp4",
    thumbnail: "/images/social/reel-1.svg",
    url: "",
  },
  {
    id: "reel-2",
    platform: "instagram",
    title: { en: "Cleaning Made Easy", hi: "आसान सफ़ाई" },
    caption: {
      en: "Watch how quickly we clean and prep your order.",
      hi: "देखें हम आपका ऑर्डर कितनी जल्दी साफ़ और तैयार करते हैं।",
    },
    video: "/videos/social/reel-2.mp4",
    thumbnail: "/images/social/reel-2.svg",
    url: "",
  },
  {
    id: "reel-3",
    platform: "instagram",
    title: { en: "Weekend Market Vibes", hi: "सप्ताहांत बाज़ार का माहौल" },
    caption: {
      en: "Saturday mornings at the counter are always busy.",
      hi: "शनिवार की सुबहें काउंटर पर हमेशा व्यस्त रहती हैं।",
    },
    video: "/videos/social/reel-3.mp4",
    thumbnail: "/images/social/reel-3.svg",
    url: "",
  },
];
