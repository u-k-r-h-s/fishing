import { getActiveOffers } from "@/data/offers";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { OfferCard } from "@/components/offers/OfferCard";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function OffersSection() {
  const activeOffers = getActiveOffers();

  if (activeOffers.length === 0) return null;

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Offers"
            title="Today's Best Value"
            description="Fresh promotions, updated regularly. Message us to confirm availability."
          />
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activeOffers.map((offer, index) => (
            <ScrollReveal key={offer.id} delay={index * 0.08}>
              <OfferCard offer={offer} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
