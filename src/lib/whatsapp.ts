import { business } from "@/data/business";

/** Strips everything except leading "+" and digits, for wa.me links. */
function toWhatsAppNumber(raw: string): string {
  return raw.replace(/[^\d]/g, "");
}

/**
 * Builds a wa.me link with a prefilled message.
 * Falls back to the general enquiry message when no fish name is given.
 */
export function getWhatsAppLink(fishName?: string): string {
  const number = toWhatsAppNumber(business.whatsapp);
  const message = fishName
    ? `Hi ${business.name}, I am interested in ${fishName}. Please share today's availability and price.`
    : `Hi ${business.name}, I would like to know today's fresh fish availability and prices.`;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function getCallLink(): string {
  return `tel:${business.phone}`;
}
