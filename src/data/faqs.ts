/**
 * ============================================================
 *  FAQs — EDIT QUESTIONS & ANSWERS HERE
 * ============================================================
 * Powers the FAQ accordion and FAQPage structured data.
 * ============================================================
 */

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: "freshness",
    question: "How fresh is the fish?",
    answer:
      "We source fish daily from trusted local suppliers and harbours. Nothing sits in storage for long — what you see is typically what arrived that morning or the evening before.",
  },
  {
    id: "cleaning",
    question: "Do you clean the fish?",
    answer:
      "Yes. Cleaning and scaling are available on request at no extra cost. Just let us know your preference when you message us or visit.",
  },
  {
    id: "cutting",
    question: "Do you provide cutting options?",
    answer:
      "Absolutely — we can cut fish into steaks, fillets, or curry-cut pieces depending on the variety and your recipe.",
  },
  {
    id: "service-areas",
    question: "Which areas do you serve?",
    answer:
      "We currently serve our local city and a few nearby areas. See the Service Areas section for the full, up-to-date list, or message us to confirm your location.",
  },
  {
    id: "todays-price",
    question: "How can I check today's price?",
    answer:
      "Prices can vary slightly day to day depending on the catch. Message us on WhatsApp or call for the most accurate, up-to-date pricing before you visit.",
  },
];
