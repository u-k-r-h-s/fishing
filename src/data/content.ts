/**
 * ============================================================
 *  SITE CONTENT — EDIT ABOUT / WHY-CHOOSE-US WORDING HERE
 * ============================================================
 * Editable copy blocks that don't fit neatly into business.ts,
 * fish.ts, offers.ts, etc. Icons referenced by key are rendered
 * via components/shared/Icon.tsx.
 * ============================================================
 */

export interface HeroContent {
  eyebrow: string;
  headline: string;
  subheading: string;
  image: string;
  imageAlt: string;
}

export const heroContent: HeroContent = {
  eyebrow: "Hand-Selected · Delivered Fresh",
  headline: "Fresh Fish. Honest Quality.",
  subheading: "Freshly selected fish for delicious everyday meals.",
  image: "/images/hero/hero-fish.svg",
  imageAlt: "Fresh whole fish and prawns arranged on ice",
};

export interface AboutContent {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
}

export const aboutContent: AboutContent = {
  eyebrow: "Our Story",
  heading: "Freshness is a promise, not a slogan.",
  paragraphs: [
    "OceanFresh Fish started with a simple idea: fish should taste like it was caught this morning, because it usually was. We work directly with trusted local suppliers and harbours to bring in fish and seafood daily, not weekly.",
    "Every fish that reaches our counter is checked for firmness, clarity of the eyes, and smell before it's offered for sale. If it doesn't meet our standard, it doesn't go out.",
    "Hygiene and careful handling matter as much as freshness. From ice-packed transport to clean cutting boards, every step is designed to protect quality until it reaches your kitchen.",
  ],
  image: "/images/about/about-fresh-selection.svg",
  imageAlt: "Hand-selected fresh fish being prepared for sale",
};

export interface WhyChooseUsItem {
  id: string;
  icon: "fresh" | "quality" | "selected" | "contact";
  title: string;
  description: string;
}

export const whyChooseUs: WhyChooseUsItem[] = [
  {
    id: "fresh-every-day",
    icon: "fresh",
    title: "Fresh Every Day",
    description: "New stock arrives daily — nothing lingers in storage.",
  },
  {
    id: "quality-trust",
    icon: "quality",
    title: "Quality You Can Trust",
    description: "Every fish is checked for firmness, clarity, and smell.",
  },
  {
    id: "carefully-selected",
    icon: "selected",
    title: "Carefully Selected",
    description: "Sourced from trusted local suppliers and harbours.",
  },
  {
    id: "easy-to-contact",
    icon: "contact",
    title: "Easy to Contact",
    description: "Reach us instantly on WhatsApp, call, or social media.",
  },
];
