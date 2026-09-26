import type { Locale } from "@/i18n/locales";
import { getDictionary, tf } from "@/i18n/getDictionary";

/** Strips everything except digits, for wa.me links (which reject "+", spaces, etc). */
function toWhatsAppNumber(raw: string): string {
  return raw.replace(/[^\d]/g, "");
}

/**
 * Builds a wa.me link with a prefilled message in the given locale.
 * Falls back to the general enquiry message when no fish name is given.
 * `whatsapp`/`businessName` must be the real, Supabase-backed values (see
 * BusinessConfigProvider) — never the static placeholder demo data.
 */
export function getWhatsAppLink(locale: Locale, whatsapp: string, businessName: string, fishName?: string): string {
  const number = toWhatsAppNumber(whatsapp);
  const dict = getDictionary(locale);
  const message = fishName
    ? tf(dict.whatsapp.messageFish, { business: businessName, name: fishName })
    : tf(dict.whatsapp.messageGeneral, { business: businessName });

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function getCallLink(phone: string): string {
  return `tel:${phone}`;
}
