/**
 * ============================================================
 *  BUSINESS CONFIGURATION — SINGLE SOURCE OF TRUTH
 * ============================================================
 * Every piece of business info shown on the site (name, phone,
 * address, socials, hours) is read from this file. To rebrand
 * the site or update contact details, edit the values below —
 * you do not need to touch any component or page.
 *
 * NOTE: All values below are DEMO / PLACEHOLDER data for the
 * temporary business "OceanFresh Fish". Replace them with the
 * real business details before going live.
 * ============================================================
 */

export interface OpeningHoursEntry {
  /** e.g. "Monday – Saturday" */
  days: string;
  /** e.g. "6:00 AM – 8:00 PM" */
  hours: string;
}

export interface BusinessConfig {
  name: string;
  legalName?: string;
  tagline: string;
  description: string;

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
}

export const business: BusinessConfig = {
  name: "OceanFresh Fish",
  legalName: "OceanFresh Fish (Demo Business)",
  tagline: "Freshness You Can Trust",
  description:
    "OceanFresh Fish brings you honest, hand-selected fresh fish and seafood — cleaned to order and delivered with care. This is demo placeholder content for a temporary business name; replace it with your real story.",

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
};
