/**
 * ============================================================
 *  FISH CATALOGUE — EDIT YOUR PRODUCTS HERE
 * ============================================================
 * Every fish card, catalogue page, and detail page
 * (/{locale}/fresh-fish/[id]) is generated from this array.
 *
 * To add a fish: copy an existing object, give it a unique
 * `id` (used in the URL, e.g. /fresh-fish/rohu), and fill in
 * the fields. Text fields are `{ en, hi }` — edit both.
 *
 * To remove a fish: delete its object from the array.
 *
 * Images referenced here live in `public/images/fish/`.
 * Replace those files with real photos any time — the
 * filenames can stay the same.
 *
 * The data below is DEMO / PLACEHOLDER content.
 * ============================================================
 */
import type { Localized } from "@/i18n/types";

export interface Fish {
  /** Unique slug, used in the URL: /fresh-fish/{id} — never translated */
  id: string;
  name: Localized<string>;
  /** Path under /public, e.g. "/images/fish/rohu.svg" */
  image: string;
  /** Short one-line description shown on catalogue cards */
  description: Localized<string>;
  /** Longer description shown on the fish detail page */
  longDescription: Localized<string>;
  /** Display price string, e.g. "₹450/kg" — never translated */
  price: string;
  /** Free-text weight info, e.g. "800g - 1.2kg" or "Approx 1kg each" — never translated */
  weight: string;
  /** Extra photos beyond the main `image` — at least 4, admin-managed */
  gallery: string[];
  available: boolean;
  /** Show this fish in the homepage "Featured" rail */
  featured: boolean;
  /** Freshness / prep info shown on the detail page */
  freshnessNote: Localized<string>;
  /** Optional overrides for SEO — sensible defaults are generated if omitted */
  seoTitle?: Localized<string>;
  seoDescription?: Localized<string>;
}

export const fish: Fish[] = [
  {
    id: "rohu",
    name: { en: "Rohu", hi: "रोहू" },
    image: "/images/fish/rohu.svg",
    description: {
      en: "A household favourite — soft, mild-flavoured river fish.",
      hi: "घर-घर की पसंद — नरम, हल्के स्वाद वाली नदी की मछली।",
    },
    longDescription: {
      en: "Rohu is a delicately flavoured freshwater fish, prized for its soft texture and versatility. It works beautifully in traditional curries, fries, or a simple home-style preparation. Each fish is hand-selected for firmness and clear, bright eyes before it reaches our counter.",
      hi: "रोहू एक हल्के स्वाद वाली मीठे पानी की मछली है, जो अपनी नरम बनावट और बहुमुखी उपयोग के लिए पसंद की जाती है। यह पारंपरिक करी, फ्राई या घर के सामान्य पकवान में बेहद स्वादिष्ट लगती है। हमारे काउंटर तक पहुँचने से पहले हर मछली को मज़बूती और साफ़, चमकदार आँखों के आधार पर हाथ से चुना जाता है।",
    },
    price: "₹450/kg",
    weight: "800g - 1.5kg",
    gallery: [],
    available: true,
    featured: true,
    freshnessNote: {
      en: "Sourced fresh daily. Cleaned and scaled on request at no extra cost.",
      hi: "रोज़ ताज़ा लाई जाती है। बिना किसी अतिरिक्त शुल्क के अनुरोध पर साफ़ और स्केल की जाती है।",
    },
  },
  {
    id: "katla",
    name: { en: "Katla", hi: "कतला" },
    image: "/images/fish/katla.svg",
    description: {
      en: "Firm, meaty freshwater fish, great for rich curries.",
      hi: "मज़बूत, मांसल मीठे पानी की मछली, गाढ़ी करी के लिए बेहतरीन।",
    },
    longDescription: {
      en: "Katla is known for its firm, meaty flesh that holds together well in slow-cooked curries and gravies. A staple across many home kitchens, it's a reliable choice for family meals that need to feed a crowd.",
      hi: "कतला अपने मज़बूत, मांसल गूदे के लिए जानी जाती है जो धीमी आँच पर पकी करी और ग्रेवी में अच्छी तरह बना रहता है। कई घरों की रसोई में यह एक मुख्य विकल्प है, बड़े परिवार के भोजन के लिए एक भरोसेमंद पसंद।",
    },
    price: "₹420/kg",
    weight: "1kg - 2kg",
    gallery: [],
    available: true,
    featured: true,
    freshnessNote: {
      en: "Delivered fresh from the local harbour every morning.",
      hi: "हर सुबह स्थानीय बंदरगाह से ताज़ा पहुँचाई जाती है।",
    },
  },
  {
    id: "hilsa",
    name: { en: "Hilsa", hi: "हिल्सा" },
    image: "/images/fish/hilsa.svg",
    description: {
      en: "The prized seasonal favourite, rich and full of flavour.",
      hi: "मौसमी पसंदीदा, गाढ़ी और स्वाद से भरपूर।",
    },
    longDescription: {
      en: "Hilsa (Ilish) is celebrated for its rich, buttery flavour and is considered a delicacy in many regional cuisines. Best enjoyed steamed in mustard sauce or lightly fried, it's a seasonal treat we source carefully to guarantee freshness.",
      hi: "हिल्सा (इलिश) अपने गाढ़े, मक्खन जैसे स्वाद के लिए जानी जाती है और कई क्षेत्रीय व्यंजनों में इसे विशेष माना जाता है। सरसों की ग्रेवी में भाप में पकाकर या हल्का फ्राई करके इसका सबसे अच्छा स्वाद मिलता है — यह एक मौसमी विशेष मछली है जिसे हम ताज़गी सुनिश्चित करने के लिए सावधानी से लाते हैं।",
    },
    price: "₹900/kg",
    weight: "500g - 1kg",
    gallery: [],
    available: true,
    featured: true,
    freshnessNote: {
      en: "Seasonal availability — call ahead to confirm today's stock.",
      hi: "मौसमी उपलब्धता — आज का स्टॉक जानने के लिए पहले से कॉल करें।",
    },
  },
  {
    id: "prawns",
    name: { en: "Prawns", hi: "झींगा" },
    image: "/images/fish/prawns.svg",
    description: {
      en: "Plump, fresh-water prawns cleaned and deveined on request.",
      hi: "मोटे, मीठे पानी के झींगे, अनुरोध पर साफ़ और नस निकाले हुए।",
    },
    longDescription: {
      en: "Our prawns are sorted by size and kept on ice from harvest to counter. Whether you're making a quick stir-fry or a festive prawn curry, we clean and devein them on request so you can start cooking right away.",
      hi: "हमारे झींगों को आकार के अनुसार छाँटा जाता है और पकड़ से लेकर काउंटर तक बर्फ़ पर रखा जाता है। चाहे झटपट स्टिर-फ्राई बनानी हो या उत्सव की झींगा करी, हम अनुरोध पर उन्हें साफ़ और नस-रहित कर देते हैं ताकि आप तुरंत खाना बनाना शुरू कर सकें।",
    },
    price: "₹600/kg",
    weight: "Sold by weight — small or jumbo",
    gallery: [],
    available: true,
    featured: true,
    freshnessNote: {
      en: "Cleaned and deveined on request. Available in small and jumbo sizes.",
      hi: "अनुरोध पर साफ़ और नस-रहित किए जाते हैं। छोटे और जंबो आकार में उपलब्ध।",
    },
  },
  {
    id: "pomfret",
    name: { en: "Pomfret", hi: "पॉम्फ्रेट" },
    image: "/images/fish/pomfret.svg",
    description: {
      en: "Delicate white-fleshed fish, perfect for frying or grilling.",
      hi: "नाज़ुक सफ़ेद गूदे वाली मछली, फ्राई या ग्रिल के लिए एकदम सही।",
    },
    longDescription: {
      en: "Pomfret's delicate, boneless-feeling white flesh makes it one of the most sought-after fish for frying, grilling, or a light tawa-fry with simple spices. We keep a close eye on size and freshness for every batch.",
      hi: "पॉम्फ्रेट का नाज़ुक, लगभग बिना काँटे वाला सफ़ेद गूदा इसे फ्राई, ग्रिल या साधारण मसालों के साथ हल्के तवा-फ्राई के लिए सबसे पसंदीदा मछलियों में से एक बनाता है। हर खेप के आकार और ताज़गी पर हमारी पूरी नज़र रहती है।",
    },
    price: "₹700/kg",
    weight: "600g - 1kg",
    gallery: [],
    available: true,
    featured: false,
    freshnessNote: {
      en: "Available whole or pre-cut into steaks on request.",
      hi: "पूरी या अनुरोध पर पहले से स्टेक में कटी हुई उपलब्ध।",
    },
  },
  {
    id: "surmai",
    name: { en: "Surmai", hi: "सुरमई" },
    image: "/images/fish/surmai.svg",
    description: {
      en: "Kingfish steaks — firm texture, minimal bones.",
      hi: "किंगफ़िश स्टेक — मज़बूत बनावट, बहुत कम काँटे।",
    },
    longDescription: {
      en: "Surmai (Kingfish) is a firm, almost boneless fish that's ideal for pan-frying or tandoor-style preparations. Cut into steaks of your preferred thickness, it's a favourite for special weekend meals.",
      hi: "सुरमई (किंगफ़िश) एक मज़बूत, लगभग बिना काँटे वाली मछली है जो पैन-फ्राई या तंदूरी शैली के लिए आदर्श है। आपकी पसंद की मोटाई में स्टेक काटी जाती है — विशेष सप्ताहांत भोजन के लिए पसंदीदा।",
    },
    price: "₹800/kg",
    weight: "Cut to preferred steak thickness",
    gallery: [],
    available: true,
    featured: false,
    freshnessNote: {
      en: "Cut into steaks to your preferred thickness on request.",
      hi: "अनुरोध पर आपकी पसंद की मोटाई में स्टेक काटी जाती है।",
    },
  },
  {
    id: "tilapia",
    name: { en: "Tilapia", hi: "तिलापिया" },
    image: "/images/fish/tilapia.svg",
    description: {
      en: "Mild, easy-to-cook fish, great for everyday meals.",
      hi: "हल्की, आसानी से पकने वाली मछली, रोज़मर्रा के भोजन के लिए बढ़िया।",
    },
    longDescription: {
      en: "Tilapia's mild flavour and quick cooking time make it a practical everyday choice. It takes on marinades and spices well, making it a flexible option for weeknight dinners.",
      hi: "तिलापिया का हल्का स्वाद और जल्दी पकने का गुण इसे रोज़ के लिए एक व्यावहारिक विकल्प बनाता है। यह मैरिनेड और मसालों को अच्छी तरह सोखती है, जिससे यह हफ़्ते के दिनों के खाने के लिए एक लचीला विकल्प बनती है।",
    },
    price: "₹380/kg",
    weight: "700g - 1kg",
    gallery: [],
    available: true,
    featured: false,
    freshnessNote: {
      en: "Farm-raised and inspected fresh before sale.",
      hi: "फ़ार्म में पाली गई और बिक्री से पहले ताज़गी की जाँच की गई।",
    },
  },
  {
    id: "basa",
    name: { en: "Basa", hi: "बासा" },
    image: "/images/fish/basa.svg",
    description: {
      en: "Soft, boneless fillets — ideal for quick, fuss-free cooking.",
      hi: "नरम, बिना काँटे वाले फ़िलेट — झटपट और आसान खाना पकाने के लिए आदर्श।",
    },
    longDescription: {
      en: "Basa fillets are soft, nearly boneless, and cook quickly — a convenient option for anyone who wants a fuss-free fish meal without the hassle of bones or scaling.",
      hi: "बासा के फ़िलेट नरम, लगभग बिना काँटे के होते हैं और जल्दी पक जाते हैं — काँटों या स्केलिंग की परेशानी के बिना आसान मछली भोजन चाहने वालों के लिए सुविधाजनक विकल्प।",
    },
    price: "₹350/kg",
    weight: "Fillets — 200g packs",
    gallery: [],
    available: false,
    featured: false,
    freshnessNote: {
      en: "Currently out of stock — check back soon or ask us directly.",
      hi: "फ़िलहाल स्टॉक में नहीं है — जल्द ही दोबारा देखें या सीधे हमसे पूछें।",
    },
  },
];

/** Convenience helpers */
export const getFishById = (id: string): Fish | undefined =>
  fish.find((item) => item.id === id);

export const getFeaturedFish = (): Fish[] => fish.filter((item) => item.featured);

export const getAvailableFish = (): Fish[] => fish.filter((item) => item.available);
