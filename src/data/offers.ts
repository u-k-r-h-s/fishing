/**
 * ============================================================
 *  OFFERS — EDIT PROMOTIONS HERE
 * ============================================================
 * Displayed on the homepage and the /offers page.
 * Set `active: false` to hide an offer without deleting it.
 * This is DEMO / PLACEHOLDER content.
 * ============================================================
 */

export interface Offer {
  id: string;
  title: string;
  description: string;
  /** Optional short badge text, e.g. "This Week" */
  badge?: string;
  active: boolean;
}

export const offers: Offer[] = [
  {
    id: "weekend-fresh-catch",
    title: "Weekend Fresh Catch",
    description:
      "Special prices on select fresh fish, available Saturday and Sunday. Message us on WhatsApp for today's list.",
    badge: "This Weekend",
    active: true,
  },
  {
    id: "bulk-order-discount",
    title: "Bulk Order Discount",
    description:
      "Ordering for a family gathering or event? Ask about discounted rates on bulk orders of 5kg and above.",
    badge: "Bulk Orders",
    active: true,
  },
  {
    id: "festive-special",
    title: "Festive Special",
    description:
      "Seasonal fish like Hilsa are stocked in limited quantities during festive weeks — reserve yours in advance.",
    badge: "Limited",
    active: false,
  },
];

export const getActiveOffers = (): Offer[] => offers.filter((offer) => offer.active);
