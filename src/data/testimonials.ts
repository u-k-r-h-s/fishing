/**
 * ============================================================
 *  TESTIMONIALS — EDIT CUSTOMER QUOTES HERE
 * ============================================================
 * These are DEMO / PLACEHOLDER quotes, not real verified
 * customer reviews. Replace them with genuine testimonials
 * (with permission) once you have collected real feedback.
 * ============================================================
 */

export interface Testimonial {
  id: string;
  name: string;
  /** e.g. "Regular Customer", "Home Chef" — keep generic for demo content */
  role: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

/** DEMO CONTENT — not verified customer reviews. Replace before launch. */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Demo Customer A",
    role: "Regular Customer",
    quote:
      "The fish is always fresh and the team cleans it exactly the way I ask. Placeholder testimonial — replace with a real review.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Demo Customer B",
    role: "Home Chef",
    quote:
      "I appreciate being able to check availability on WhatsApp before heading over. Placeholder testimonial — replace with a real review.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Demo Customer C",
    role: "Weekly Buyer",
    quote:
      "Consistent quality every week — this is sample text until real feedback is added. Placeholder testimonial — replace with a real review.",
    rating: 4,
  },
];
