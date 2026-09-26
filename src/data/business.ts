/**
 * ============================================================
 *  BUSINESS CONFIGURATION — SINGLE SOURCE OF TRUTH
 * ============================================================
 * Every piece of business info shown on the site (name, phone,
 * address, socials, hours) is read from this file. To rebrand
 * the site or update contact details, edit the values below —
 * you do not need to touch any component or page.
 *
 * Fields written as `{ en, hi }` are bilingual business CONTENT
 * (the owner's own words) — edit both languages. Plain string
 * fields (name, phone, address, URLs) are never translated.
 *
 * NOTE: All values below are DEMO / PLACEHOLDER data for the
 * temporary business "OceanFresh Fish". Replace them with the
 * real business details before going live.
 * ============================================================
 */
import type { Localized } from "@/i18n/types";

export interface OpeningHoursEntry {
  /** e.g. "Monday – Saturday" */
  days: string;
  /** e.g. "6:00 AM – 8:00 PM" */
  hours: string;
}

export interface Owner {
  name: string;
  role: string;
  /** Path under /public, e.g. "/images/owner/owner.jpg" */
  image: string;
  bio: Localized<string>;
  /** Optional — leave "" to hide */
  instagram?: string;
}

export interface BusinessConfig {
  name: string;
  legalName?: string;
  tagline: Localized<string>;
  description: Localized<string>;

  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email: string;

  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  googleMaps: string;

  instagram: string;
  facebook: string;
  youtube: string;

  openingHours: OpeningHoursEntry[];

  currency: string;
  founded: string;

  owner: Owner;
}

export const business: BusinessConfig = {
  name: "OceanFresh Fish",
  legalName: "OceanFresh Fish (Demo Business)",
  tagline: {
    en: "Freshness You Can Trust",
    hi: "ऐसी ताज़गी जिस पर आप भरोसा कर सकें",
  },
  description: {
    en: "OceanFresh Fish brings you honest, hand-selected fresh fish and seafood — cleaned to order and delivered with care. This is demo placeholder content for a temporary business name; replace it with your real story.",
    hi: "OceanFresh Fish आपके लिए लाता है ईमानदारी से चुनी गई ताज़ी मछली और सीफ़ूड — ऑर्डर के अनुसार साफ़ की गई और सावधानी से पहुँचाई गई। यह एक अस्थायी व्यवसाय नाम के लिए डेमो सामग्री है; इसे अपनी असली कहानी से बदलें।",
  },

  // Placeholder contact details — replace with real numbers.
  phone: "+911234567890",
  phoneDisplay: "+91 12345 67890",
  whatsapp: "+911234567890",
  email: "hello@oceanfreshfish.example",

  // Placeholder address — replace with the real shop location.
  address: "12 Harbour Market Road",
  city: "Your City",
  state: "Your State",
  postalCode: "000000",
  country: "India",
  googleMaps: "",

  // Leave a handle empty ("") to hide that social icon site-wide.
  instagram: "",
  facebook: "",
  youtube: "",

  openingHours: [
    { days: "Monday – Saturday", hours: "6:00 AM – 8:00 PM" },
    { days: "Sunday", hours: "7:00 AM – 2:00 PM" },
  ],

  currency: "₹",
  founded: "2024",

  owner: {
    name: "Demo Owner Name",
    role: "Founder",
    image: "/images/owner/owner.svg",
    bio: {
      en: "I grew up around the harbour and started this counter to bring the same fish my own family trusts to yours — hand-picked every morning, no shortcuts. Placeholder bio — replace with the real owner's story.",
      hi: "मैं बंदरगाह के आस-पास बड़ा हुआ और यही भरोसेमंद मछली अब आपके परिवार तक पहुँचाने के लिए यह काउंटर शुरू किया — हर सुबह हाथ से चुनी गई, बिना किसी शॉर्टकट के। यह एक नमूना परिचय है — असली मालिक की कहानी से बदलें।",
    },
    instagram: "",
  },
};
