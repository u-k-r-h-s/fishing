/**
 * ============================================================
 *  FAQs — EDIT QUESTIONS & ANSWERS HERE
 * ============================================================
 * Powers the FAQ accordion and FAQPage structured data.
 * `question`/`answer` are `{ en, hi }`.
 * ============================================================
 */
import type { Localized } from "@/i18n/types";

export interface FAQ {
  id: string;
  question: Localized<string>;
  answer: Localized<string>;
}

export const faqs: FAQ[] = [
  {
    id: "freshness",
    question: { en: "How fresh is the fish?", hi: "मछली कितनी ताज़ी है?" },
    answer: {
      en: "We source fish daily from trusted local suppliers and harbours. Nothing sits in storage for long — what you see is typically what arrived that morning or the evening before.",
      hi: "हम रोज़ भरोसेमंद स्थानीय आपूर्तिकर्ताओं और बंदरगाहों से मछली लाते हैं। कुछ भी लंबे समय तक भंडारण में नहीं रहता — जो आप देखते हैं वह आमतौर पर उसी सुबह या पिछली शाम आया होता है।",
    },
  },
  {
    id: "cleaning",
    question: { en: "Do you clean the fish?", hi: "क्या आप मछली साफ़ करते हैं?" },
    answer: {
      en: "Yes. Cleaning and scaling are available on request at no extra cost. Just let us know your preference when you message us or visit.",
      hi: "जी हाँ। बिना किसी अतिरिक्त शुल्क के अनुरोध पर सफ़ाई और स्केलिंग उपलब्ध है। बस संदेश भेजते या आते समय अपनी पसंद बता दें।",
    },
  },
  {
    id: "cutting",
    question: { en: "Do you provide cutting options?", hi: "क्या आप काटने के विकल्प देते हैं?" },
    answer: {
      en: "Absolutely — we can cut fish into steaks, fillets, or curry-cut pieces depending on the variety and your recipe.",
      hi: "बिल्कुल — हम मछली की किस्म और आपकी रेसिपी के अनुसार स्टेक, फ़िलेट या करी-कट टुकड़ों में काट सकते हैं।",
    },
  },
  {
    id: "service-areas",
    question: { en: "Which areas do you serve?", hi: "आप किन क्षेत्रों में सेवा देते हैं?" },
    answer: {
      en: "We currently serve our local city and a few nearby areas. See the Service Areas section for the full, up-to-date list, or message us to confirm your location.",
      hi: "हम फ़िलहाल अपने स्थानीय शहर और कुछ आस-पास के क्षेत्रों में सेवा देते हैं। पूरी, अद्यतन सूची के लिए सेवा क्षेत्र अनुभाग देखें, या अपने स्थान की पुष्टि के लिए हमें संदेश भेजें।",
    },
  },
  {
    id: "todays-price",
    question: { en: "How can I check today's price?", hi: "मैं आज की कीमत कैसे जान सकता हूँ?" },
    answer: {
      en: "Prices can vary slightly day to day depending on the catch. Message us on WhatsApp or call for the most accurate, up-to-date pricing before you visit.",
      hi: "पकड़ के अनुसार कीमतें दिन-प्रतिदिन थोड़ी बदल सकती हैं। आने से पहले सबसे सटीक, अद्यतन कीमत के लिए हमें व्हाट्सएप पर संदेश भेजें या कॉल करें।",
    },
  },
];
