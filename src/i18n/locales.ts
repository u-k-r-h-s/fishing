/**
 * ============================================================
 *  SUPPORTED LOCALES
 * ============================================================
 * Adding a locale: add its code here, add a dictionary file in
 * src/i18n/dictionaries/, and add {lang}: "..." fields to the
 * bilingual content in src/data/*.ts.
 * ============================================================
 */
export const locales = ["en", "hi"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  hi: "हिन्दी",
};

/** BCP-47 tag used for <html lang>, hreflang, and Open Graph locale. */
export const localeTags: Record<Locale, string> = {
  en: "en-IN",
  hi: "hi-IN",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
