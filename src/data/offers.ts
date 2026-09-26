/**
 * ============================================================
 *  OFFERS — EDIT PROMOTIONS HERE
 * ============================================================
 * Displayed on the homepage and the /offers page.
 * Set `active: false` to hide an offer without deleting it.
 * Text fields are `{ en, hi }`. `image` is optional — omit it
 * (or leave "") to fall back to the decorative gradient card.
 * This is DEMO / PLACEHOLDER content.
 * ============================================================
 */
import type { Localized } from "@/i18n/types";

export interface Offer {
  id: string;
  title: Localized<string>;
  description: Localized<string>;
  /** Optional short badge text, e.g. "This Week" */
  badge?: Localized<string>;
  /** Optional path under /public, e.g. "/images/offers/weekend-catch.svg" */
  image?: string;
  active: boolean;
}

export const offers: Offer[] = [
  {
    id: "weekend-fresh-catch",
    title: { en: "Weekend Fresh Catch", hi: "सप्ताहांत की ताज़ी पकड़" },
    description: {
      en: "Special prices on select fresh fish, available Saturday and Sunday. Message us on WhatsApp for today's list.",
      hi: "शनिवार और रविवार को चुनिंदा ताज़ी मछली पर विशेष कीमतें। आज की सूची के लिए हमें व्हाट्सएप करें।",
    },
    badge: { en: "This Weekend", hi: "इस सप्ताहांत" },
    image: "/images/offers/weekend-catch.svg",
    active: true,
  },
  {
    id: "bulk-order-discount",
    title: { en: "Bulk Order Discount", hi: "थोक ऑर्डर पर छूट" },
    description: {
      en: "Ordering for a family gathering or event? Ask about discounted rates on bulk orders of 5kg and above.",
      hi: "पारिवारिक आयोजन या समारोह के लिए ऑर्डर कर रहे हैं? 5 किलो और उससे अधिक के थोक ऑर्डर पर छूट के बारे में पूछें।",
    },
    badge: { en: "Bulk Orders", hi: "थोक ऑर्डर" },
    image: "/images/offers/bulk-order.svg",
    active: true,
  },
  {
    id: "festive-special",
    title: { en: "Festive Special", hi: "त्योहारी विशेष" },
    description: {
      en: "Seasonal fish like Hilsa are stocked in limited quantities during festive weeks — reserve yours in advance.",
      hi: "हिल्सा जैसी मौसमी मछली त्योहारी हफ़्तों में सीमित मात्रा में उपलब्ध होती है — पहले से अपनी बुकिंग करवाएं।",
    },
    badge: { en: "Limited", hi: "सीमित" },
    active: false,
  },
];

export const getActiveOffers = (): Offer[] => offers.filter((offer) => offer.active);
