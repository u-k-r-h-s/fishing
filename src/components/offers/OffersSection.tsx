import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { OfferCard } from "@/components/offers/OfferCard";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Offer } from "@/data/offers";

export function OffersSection({
  locale,
  dict,
  offers,
}: {
  locale: Locale;
  dict: Dictionary;
  offers: Offer[];
}) {
  if (offers.length === 0) return null;

  return (
    <section className="bg-offwhite py-20 sm:py-24">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow={dict.offers.eyebrow}
            title={dict.offers.heading}
            description={dict.offers.description}
          />
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer, index) => (
            <ScrollReveal key={offer.id} delay={index * 0.08}>
              <OfferCard offer={offer} locale={locale} dict={dict} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
