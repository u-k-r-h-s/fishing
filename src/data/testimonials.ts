/**
 * ============================================================
 *  TESTIMONIALS — EDIT CUSTOMER QUOTES HERE
 * ============================================================
 * These are DEMO / PLACEHOLDER quotes, not real verified
 * customer reviews. Replace them with genuine testimonials
 * (with permission) once you have collected real feedback.
 * `role` and `quote` are `{ en, hi }`; `name` is a person's
 * name and is not translated.
 * ============================================================
 */
import type { Localized } from "@/i18n/types";

export interface Testimonial {
  id: string;
  name: string;
  /** e.g. "Regular Customer", "Home Chef" — keep generic for demo content */
  role: Localized<string>;
  quote: Localized<string>;
  rating: 1 | 2 | 3 | 4 | 5;
}

/** DEMO CONTENT — not verified customer reviews. Replace before launch. */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Demo Customer A",
    role: { en: "Regular Customer", hi: "नियमित ग्राहक" },
    quote: {
      en: "The fish is always fresh and the team cleans it exactly the way I ask. Placeholder testimonial — replace with a real review.",
      hi: "मछली हमेशा ताज़ी होती है और टीम बिल्कुल मेरी पसंद के अनुसार साफ़ करती है। यह एक नमूना समीक्षा है — असली समीक्षा से बदलें।",
    },
    rating: 5,
  },
  {
    id: "t2",
    name: "Demo Customer B",
    role: { en: "Home Chef", hi: "होम शेफ़" },
    quote: {
      en: "I appreciate being able to check availability on WhatsApp before heading over. Placeholder testimonial — replace with a real review.",
      hi: "आने से पहले व्हाट्सएप पर उपलब्धता जान पाना मुझे बहुत पसंद है। यह एक नमूना समीक्षा है — असली समीक्षा से बदलें।",
    },
    rating: 5,
  },
  {
    id: "t3",
    name: "Demo Customer C",
    role: { en: "Weekly Buyer", hi: "साप्ताहिक खरीदार" },
    quote: {
      en: "Consistent quality every week — this is sample text until real feedback is added. Placeholder testimonial — replace with a real review.",
      hi: "हर हफ़्ते एक जैसी गुणवत्ता — असली प्रतिक्रिया जोड़े जाने तक यह नमूना पाठ है। असली समीक्षा से बदलें।",
    },
    rating: 4,
  },
];
