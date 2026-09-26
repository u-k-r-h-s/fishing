import type { Offer } from "@/data/offers";

export function OfferCard({ offer }: { offer: Offer }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-navy to-ocean p-7 text-offwhite shadow-sm">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-aqua/20 blur-2xl"
      />
      {offer.badge && (
        <span className="mb-4 inline-block w-fit rounded-full bg-aqua/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-mint">
          {offer.badge}
        </span>
      )}
      <h3 className="text-xl font-bold">{offer.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-offwhite/75">{offer.description}</p>
    </div>
  );
}
