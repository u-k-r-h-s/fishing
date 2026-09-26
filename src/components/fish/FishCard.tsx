import Link from "next/link";
import Image from "next/image";
import type { Fish } from "@/data/fish";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { cn, localizedPath } from "@/lib/utils";
import { localize } from "@/i18n/types";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/getDictionary";

export function FishCard({ item, locale, dict }: { item: Fish; locale: Locale; dict: Dictionary }) {
  const name = localize(item.name, locale);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-dark/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link
        href={localizedPath(locale, `/fresh-fish/${item.id}`)}
        aria-label={`${dict.common.viewDetails}: ${name}`}
        className="relative block aspect-[4/3] overflow-hidden bg-mint/20"
      >
        <Image
          src={item.image}
          alt={name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span
          className={cn(
            "absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold shadow-sm",
            item.available ? "bg-aqua text-navy" : "bg-dark/70 text-offwhite"
          )}
        >
          {item.available ? dict.common.availableToday : dict.common.currentlyUnavailable}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5 transition-transform duration-300 group-hover:-translate-y-0.5">
        <p className="text-xs font-bold uppercase tracking-widest text-ocean">{name}</p>
        <Link href={localizedPath(locale, `/fresh-fish/${item.id}`)} className="mt-1">
          <h3 className="text-lg font-bold text-dark hover:text-ocean">Fresh {name}</h3>
        </Link>
        <p className="mt-1.5 flex flex-wrap items-baseline gap-x-2 text-sm font-semibold text-dark/80">
          <span>{item.price}</span>
          {item.weight && <span className="text-xs font-normal text-dark/50">{item.weight}</span>}
        </p>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-dark/60">
          {localize(item.description, locale)}
        </p>

        <WhatsAppButton
          locale={locale}
          fishName={name}
          label={`${dict.common.whatsappUs} — ${name}`}
          variant="outline"
          className="mt-5 w-full transition-colors group-hover:border-aqua group-hover:text-ocean"
        />
      </div>
    </article>
  );
}
