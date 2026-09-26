import Link from "next/link";
import Image from "next/image";
import type { Fish } from "@/data/fish";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { cn, localizedPath } from "@/lib/utils";
import { localize } from "@/i18n/types";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/getDictionary";

/** The large "hero" card for today's headline catch — same data as FishCard, bigger presence. */
export function FeaturedFishCard({
  item,
  locale,
  dict,
}: {
  item: Fish;
  locale: Locale;
  dict: Dictionary;
}) {
  const name = localize(item.name, locale);

  return (
    <article className="group relative flex h-full min-h-[26rem] flex-col justify-end overflow-hidden rounded-3xl bg-navy shadow-xl">
      <Image
        src={item.image}
        alt={name}
        fill
        priority
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />

      <span
        className={cn(
          "absolute left-5 top-5 rounded-full px-3 py-1 text-xs font-semibold shadow-sm",
          item.available ? "bg-aqua text-navy" : "bg-dark/70 text-offwhite"
        )}
      >
        {item.available ? dict.common.availableToday : dict.common.currentlyUnavailable}
      </span>

      <div className="relative p-7 text-offwhite sm:p-9">
        <p className="text-xs font-bold uppercase tracking-widest text-mint">{dict.catch.eyebrow}</p>
        <Link href={localizedPath(locale, `/fresh-fish/${item.id}`)}>
          <h3 className="mt-2 text-3xl font-extrabold tracking-tight hover:text-mint sm:text-4xl">
            {name}
          </h3>
        </Link>
        <p className="mt-2 text-lg font-semibold text-offwhite/90">{item.price}</p>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-offwhite/70">
          {localize(item.description, locale)}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <WhatsAppButton locale={locale} fishName={name} variant="light" />
          <Link
            href={localizedPath(locale, `/fresh-fish/${item.id}`)}
            className="inline-flex items-center justify-center rounded-full border border-offwhite/25 px-6 py-3 text-sm font-semibold text-offwhite transition-colors hover:border-aqua hover:text-aqua"
          >
            {dict.common.viewDetails}
          </Link>
        </div>
      </div>
    </article>
  );
}
