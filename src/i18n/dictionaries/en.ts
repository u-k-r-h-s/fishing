/**
 * ============================================================
 *  ENGLISH DICTIONARY — UI / CHROME STRINGS ONLY
 * ============================================================
 * This file holds generic interface text (nav labels, buttons,
 * section labels, accessibility strings). Business CONTENT that
 * an owner edits per-item (fish names, offer copy, FAQ answers,
 * testimonials, about paragraphs) lives in src/data/*.ts as
 * { en, hi } fields instead — see src/i18n/types.ts.
 *
 * `hi.ts` must implement this exact shape (TypeScript enforces
 * this via `satisfies Dictionary` in that file).
 * ============================================================
 */
const en = {
  meta: {
    skipToContent: "Skip to main content",
  },
  nav: {
    home: "Home",
    freshFish: "Fresh Fish",
    offers: "Offers",
    about: "About",
    contact: "Contact",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
  },
  hero: {
    eyebrow: "Fresh Every Day · Carefully Selected",
    headlineLine1: "Fresh Fish.",
    headlineLine2: "Honest Quality.",
    subheading: "Freshly selected fish for everyday meals, prepared with care.",
    ctaPrimary: "Explore Fresh Fish",
    ctaSecondary: "WhatsApp Us",
  },
  whatsapp: {
    messageFish: "Hi {business}, I am interested in {name}. Please share today's availability and price.",
    messageGeneral: "Hi {business}, I would like to know today's fresh fish availability and prices.",
  },
  common: {
    whatsappUs: "WhatsApp Us",
    whatsappAbout: "WhatsApp About {name}",
    callNow: "Call Now",
    viewDetails: "View Details",
    viewFullCatalogue: "View Full Catalogue",
    learnMore: "Learn more about us",
    availableToday: "Available Today",
    currentlyUnavailable: "Currently Unavailable",
    demoImageNotice: "Demo image — replace in",
    getDirections: "Get Directions",
    readMore: "Read more",
  },
  freshFishPage: {
    eyebrow: "Catalogue",
    heading: "Fresh Fish, Selected Daily",
    description:
      "Every fish below is checked for freshness before it's offered for sale. Tap any item for details, or message us directly for today's best picks.",
    metaDescription:
      "Browse the full range of fresh fish and seafood available at {business}. Message us on WhatsApp for today's availability and pricing.",
  },
  catch: {
    eyebrow: "Fresh Today",
    heading: "Today's Fresh Catch",
    description: "Selected fresh for today. Availability changes with the catch.",
  },
  freshnessPromise: {
    eyebrow: "Our Promise",
    heading: "Freshness is not a slogan. It's how we work.",
  },
  process: {
    eyebrow: "From Water to Your Table",
    heading: "How Every Order Reaches You",
    description: "A simple, careful process behind every piece of fish we sell.",
  },
  video: {
    eyebrow: "Behind the Catch",
    heading: "See the Freshness",
    description: "A closer look at how we select, clean, and prepare fish every day.",
    play: "Play video",
    pause: "Pause video",
    mute: "Mute",
    unmute: "Unmute",
  },
  social: {
    eyebrow: "Fresh From Our Feed",
    heading: "Follow the Freshness",
    description: "Daily moments from the counter, the harbour, and the kitchen.",
    viewOn: "View on {platform}",
  },
  offers: {
    eyebrow: "Offers",
    heading: "Today's Best Value",
    description: "Fresh promotions, updated regularly. Message us to confirm availability.",
    empty: "No active offers right now — check back soon or message us for the best current price.",
  },
  offersPage: {
    heading: "Current Promotions",
    description:
      "Offers are updated regularly based on seasonal availability. Message us to confirm details before you visit.",
    metaDescription: "See current promotions and special pricing from {business}.",
  },
  contactPage: {
    heading: "We'd Love to Hear From You",
    description:
      "Whether it's a question about today's catch or a bulk order for an event, reach out any time.",
    metaDescription: "Reach {business} by phone, WhatsApp, or visit our shop in {city}.",
  },
  aboutPage: {
    metaDescription: "Learn about {business}'s commitment to freshness, quality, and hygiene.",
  },
  about: {
    eyebrow: "Our Story",
  },
  owner: {
    eyebrow: "Meet the People Behind the Catch",
    heading: "A Business Built on Trust",
  },
  whyChooseUs: {
    eyebrow: "Why Choose Us",
    heading: "A Standard You Can Taste",
  },
  serviceAreas: {
    eyebrow: "Where We Deliver",
    heading: "Proudly Serving These Areas",
    description: "Not sure if we cover your location? Message us and we'll confirm right away.",
  },
  testimonials: {
    eyebrow: "Testimonials",
    heading: "What Customers Say",
    description: "Sample feedback shown for demonstration — real customer reviews will appear here.",
  },
  faq: {
    eyebrow: "FAQ",
    heading: "Common Questions",
    description: "Everything you need to know before you order.",
  },
  finalCta: {
    heading: "Can't decide what's freshest today?",
    description: "Message {business} directly on WhatsApp — we'll tell you exactly what came in this morning.",
  },
  contact: {
    eyebrow: "Contact",
    heading: "Get In Touch",
    description: "The fastest way to check today's fresh catch is a quick WhatsApp message.",
    visitUs: "Visit Us",
    openingHours: "Opening Hours",
    phoneEmail: "Phone & Email",
    followUs: "Follow Us",
    readyToOrder: "Ready to order?",
    readyToOrderBody: "Message us for today's availability and pricing — we typically reply within minutes during business hours.",
  },
  footer: {
    quickLinks: "Quick Links",
    contact: "Contact",
    openingHours: "Opening Hours",
    serviceAreas: "Service Areas",
    rights: "All rights reserved.",
    demoNotice: "Demo content — for a fresh fish business template.",
  },
  notFound: {
    eyebrow: "404",
    heading: "We couldn't find that page",
    description: "The fish or page you're looking for may have moved. Browse our full fresh fish catalogue or message us directly.",
    browse: "Browse Fresh Fish",
  },
  fishDetail: {
    freshPrefix: "Fresh {name}",
    metaDescription: "{description} Available at {price}. Order fresh {name} today via WhatsApp or call {phone}.",
    catalogue: "Fresh Fish",
    freshnessPrep: "Freshness & Prep",
    priceNotice: "Prices may vary slightly day to day. Message us on WhatsApp or call {phone} to confirm today's price before visiting.",
    alsoLike: "You May Also Like",
  },
};

export type Dictionary = typeof en;
export default en;
