import Image from "next/image";
import type { Offer } from "@/data/offers";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { localize } from "@/i18n/types";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/getDictionary";

export function OfferCard({ offer, locale, dict }: { offer: Offer; locale: Locale; dict: Dictionary }) {
  return (
    <div className="relative flex h-full min-h-[20rem] flex-col justify-end overflow-hidden rounded-2xl bg-navy p-7 text-offwhite shadow-md">
      {offer.image ? (
        <>
          <Image src={offer.image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover opacity-60" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-navy/10" />
        </>
      ) : (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-aqua/20 blur-2xl"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy to-ocean" />
        </>
      )}

      <div className="relative">
        {offer.badge && (
          <span className="mb-4 inline-block w-fit rounded-full bg-aqua/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-mint">
            {localize(offer.badge, locale)}
          </span>
        )}
        <h3 className="text-2xl font-extrabold tracking-tight">{localize(offer.title, locale)}</h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-offwhite/80">
          {localize(offer.description, locale)}
        </p>
        <WhatsAppButton
          locale={locale}
          label={dict.common.whatsappUs}
          variant="light"
          className="mt-6"
        />
      </div>
    </div>
  );
}
