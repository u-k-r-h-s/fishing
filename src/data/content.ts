/**
 * ============================================================
 *  SITE CONTENT — EDIT ABOUT / STORY / WHY-CHOOSE-US WORDING
 * ============================================================
 * Editable copy blocks that don't fit neatly into business.ts,
 * fish.ts, offers.ts, etc. Generic interface labels (section
 * eyebrows/headings that never change per business) live in the
 * dictionary instead — see src/i18n/dictionaries/en.ts.
 *
 * Icons referenced by key are rendered via components/shared/Icon.tsx.
 * ============================================================
 */
import type { Localized } from "@/i18n/types";

export interface AboutContent {
  heading: Localized<string>;
  paragraphs: Localized<string[]>;
  image: string;
  imageAlt: string;
  /** Extra photos (e.g. the land/premises) shown as a slider on the /about page — 0 to 10 images, admin-managed. */
  galleryImages: string[];
  /** Optional — falls back to a generic dictionary heading/description when empty. */
  galleryHeading: Localized<string>;
  galleryDescription: Localized<string>;
}

export const aboutContent: AboutContent = {
  heading: {
    en: "Freshness is a promise, not a slogan.",
    hi: "ताज़गी एक वादा है, नारा नहीं।",
  },
  paragraphs: {
    en: [
      "OceanFresh Fish started with a simple idea: fish should taste like it was caught this morning, because it usually was. We work directly with trusted local suppliers and harbours to bring in fish and seafood daily, not weekly.",
      "Every fish that reaches our counter is checked for firmness, clarity of the eyes, and smell before it's offered for sale. If it doesn't meet our standard, it doesn't go out.",
      "Hygiene and careful handling matter as much as freshness. From ice-packed transport to clean cutting boards, every step is designed to protect quality until it reaches your kitchen.",
    ],
    hi: [
      "OceanFresh Fish की शुरुआत एक सरल विचार से हुई: मछली का स्वाद ऐसा होना चाहिए जैसे वह आज सुबह ही पकड़ी गई हो — क्योंकि अक्सर वह होती भी वैसी ही है। हम रोज़ (साप्ताहिक नहीं) मछली और सीफ़ूड लाने के लिए भरोसेमंद स्थानीय आपूर्तिकर्ताओं और बंदरगाहों के साथ सीधे काम करते हैं।",
      "हमारे काउंटर तक पहुँचने वाली हर मछली को बिक्री से पहले मज़बूती, आँखों की स्पष्टता और गंध के आधार पर जाँचा जाता है। अगर यह हमारे मानक पर खरी नहीं उतरती, तो बाहर नहीं जाती।",
      "स्वच्छता और सावधानीपूर्ण संभाल भी ताज़गी जितनी ही मायने रखती है। बर्फ़ में पैक परिवहन से लेकर साफ़ कटिंग बोर्ड तक, हर कदम आपकी रसोई तक गुणवत्ता की रक्षा के लिए बनाया गया है।",
    ],
  },
  image: "/images/about/about-fresh-selection.svg",
  imageAlt: "Hand-selected fresh fish being prepared for sale",
  galleryImages: [],
  galleryHeading: { en: "", hi: "" },
  galleryDescription: { en: "", hi: "" },
};

export interface WhyChooseUsItem {
  id: string;
  icon: "fresh" | "quality" | "selected" | "contact";
  title: Localized<string>;
  description: Localized<string>;
}

export const whyChooseUs: WhyChooseUsItem[] = [
  {
    id: "fresh-every-day",
    icon: "fresh",
    title: { en: "Fresh Every Day", hi: "रोज़ ताज़ी" },
    description: {
      en: "New stock arrives daily — nothing lingers in storage.",
      hi: "रोज़ नया स्टॉक आता है — कुछ भी भंडारण में नहीं रुकता।",
    },
  },
  {
    id: "quality-trust",
    icon: "quality",
    title: { en: "Quality You Can Trust", hi: "भरोसेमंद गुणवत्ता" },
    description: {
      en: "Every fish is checked for firmness, clarity, and smell.",
      hi: "हर मछली को मज़बूती, स्पष्टता और गंध के लिए जाँचा जाता है।",
    },
  },
  {
    id: "carefully-selected",
    icon: "selected",
    title: { en: "Carefully Selected", hi: "सावधानी से चुनी गई" },
    description: {
      en: "Sourced from trusted local suppliers and harbours.",
      hi: "भरोसेमंद स्थानीय आपूर्तिकर्ताओं और बंदरगाहों से लाई गई।",
    },
  },
  {
    id: "easy-to-contact",
    icon: "contact",
    title: { en: "Easy to Contact", hi: "आसान संपर्क" },
    description: {
      en: "Reach us instantly on WhatsApp, call, or social media.",
      hi: "व्हाट्सएप, कॉल या सोशल मीडिया पर तुरंत हमसे जुड़ें।",
    },
  },
];

export interface FreshnessPromiseContent {
  statement: Localized<string>;
}

export const freshnessPromiseContent: FreshnessPromiseContent = {
  statement: {
    en: "We don't sell what we wouldn't serve at our own table — checked, cleaned, and handed to you the same day it arrives.",
    hi: "हम वह नहीं बेचते जो अपनी ही मेज़ पर न परोसें — जाँची, साफ़ की गई, और आने के उसी दिन आपको सौंपी गई।",
  },
};

export interface ProcessStep {
  id: string;
  icon: "selected" | "quality" | "fresh" | "contact";
  title: Localized<string>;
  description: Localized<string>;
}

export const processSteps: ProcessStep[] = [
  {
    id: "selection",
    icon: "selected",
    title: { en: "Selection", hi: "चयन" },
    description: {
      en: "Every morning, fish is hand-picked at the harbour for firmness and clarity of the eyes.",
      hi: "हर सुबह, बंदरगाह पर मज़बूती और आँखों की स्पष्टता देखकर मछली हाथ से चुनी जाती है।",
    },
  },
  {
    id: "quality-check",
    icon: "quality",
    title: { en: "Quality Check", hi: "गुणवत्ता जाँच" },
    description: {
      en: "Each batch is checked for smell, texture, and freshness before it reaches the counter.",
      hi: "काउंटर तक पहुँचने से पहले हर खेप की गंध, बनावट और ताज़गी जाँची जाती है।",
    },
  },
  {
    id: "preparation",
    icon: "fresh",
    title: { en: "Cleaning & Preparation", hi: "सफ़ाई और तैयारी" },
    description: {
      en: "Cleaned, scaled, and cut to order — exactly the way you need it for your recipe.",
      hi: "आपके अनुरोध पर साफ़, स्केल और कटी हुई — बिल्कुल आपकी रेसिपी के अनुसार।",
    },
  },
  {
    id: "handover",
    icon: "contact",
    title: { en: "Handover", hi: "सुपुर्दगी" },
    description: {
      en: "Packed with care and handed to you the same day — fresh from counter to kitchen.",
      hi: "सावधानी से पैक करके उसी दिन आपको सौंपी गई — काउंटर से सीधे आपकी रसोई तक ताज़ा।",
    },
  },
];
