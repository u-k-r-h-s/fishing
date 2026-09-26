import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { FeaturedFishCard } from "@/components/fish/FeaturedFishCard";
import { FishCard } from "@/components/fish/FishCard";
import { localizedPath } from "@/lib/utils";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Fish } from "@/data/fish";

export function TodaysCatchSection({
  locale,
  dict,
  featured,
}: {
  locale: Locale;
  dict: Dictionary;
  featured: Fish[];
}) {
  const [hero, ...rest] = featured;

  if (!hero) return null;

  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <ScrollReveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow={dict.catch.eyebrow}
              title={dict.catch.heading}
              description={dict.catch.description}
            />
            <Link
              href={localizedPath(locale, "/fresh-fish")}
              className="shrink-0 text-sm font-semibold text-ocean hover:text-navy"
            >
              {dict.common.viewFullCatalogue} &rarr;
            </Link>
          </div>
        </ScrollReveal>

        {/* Desktop: a bento layout with one large featured card + a grid of supporting cards. */}
        <div className="mt-10 hidden gap-6 lg:grid lg:grid-cols-3">
          <ScrollReveal className="lg:col-span-2 lg:row-span-2">
            <FeaturedFishCard item={hero} locale={locale} dict={dict} />
          </ScrollReveal>
          {rest.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 0.08}>
              <FishCard item={item} locale={locale} dict={dict} />
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile/tablet: featured card, then a horizontal scroll-snap carousel. */}
        <div className="mt-10 lg:hidden">
          <ScrollReveal>
            <FeaturedFishCard item={hero} locale={locale} dict={dict} />
          </ScrollReveal>

          <div className="mt-6 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8">
            {rest.map((item) => (
              <div key={item.id} className="w-[78%] shrink-0 snap-start sm:w-[45%]">
                <FishCard item={item} locale={locale} dict={dict} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
