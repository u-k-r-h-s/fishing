/**
 * ============================================================
 *  SERVICE AREAS — EDIT COVERAGE HERE
 * ============================================================
 * Simple list of areas/localities served. Not tied to a single
 * hardcoded city — update freely as coverage changes. Each area
 * is `{ en, hi }` so place names can be shown in Devanagari too.
 * ============================================================
 */
import type { Localized } from "@/i18n/types";

export const serviceAreas: Localized<string>[] = [
  { en: "Your City", hi: "आपका शहर" },
  { en: "Your Area", hi: "आपका इलाका" },
  { en: "Nearby Areas", hi: "आस-पास के इलाके" },
  { en: "Downtown District", hi: "डाउनटाउन क्षेत्र" },
  { en: "Harbour Side", hi: "बंदरगाह क्षेत्र" },
];
