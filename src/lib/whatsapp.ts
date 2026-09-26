import { business } from "@/data/business";
import type { Locale } from "@/i18n/locales";
import { getDictionary, tf } from "@/i18n/getDictionary";

/** Strips everything except leading "+" and digits, for wa.me links. */
function toWhatsAppNumber(raw: string): string {
  return raw.replace(/[^\d]/g, "");
}

/**
 * Builds a wa.me link with a prefilled message in the given locale.
 * Falls back to the general enquiry message when no fish name is given.
 */
export function getWhatsAppLink(locale: Locale, fishName?: string): string {
  const number = toWhatsAppNumber(business.whatsapp);
  const dict = getDictionary(locale);
  const message = fishName
    ? tf(dict.whatsapp.messageFish, { business: business.name, name: fishName })
    : tf(dict.whatsapp.messageGeneral, { business: business.name });

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function getCallLink(): string {
  return `tel:${business.phone}`;
}
