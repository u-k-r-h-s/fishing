import type { Metadata } from "next";
import { getActiveOffers } from "@/data/offers";
import { business } from "@/data/business";
import { Container } from "@/components/shared/Container";
import { OfferCard } from "@/components/offers/OfferCard";
import { CTASection } from "@/components/sections/CTASection";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { JsonLd } from "@/components/shared/JsonLd";
import { getBreadcrumbSchema } from "@/lib/structuredData";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Current Offers",
  description: `See current promotions and special pricing from ${business.name}.`,
  path: "/offers",
});

export default function OffersPage() {
  const activeOffers = getActiveOffers();

  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Offers", path: "/offers" },
        ])}
      />

      <section className="bg-navy py-16 text-offwhite sm:py-20">
        <Container>
          <ScrollReveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-mint">
              Offers
            </p>
            <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
              Current Promotions
            </h1>
            <p className="mt-5 max-w-xl text-base text-offwhite/75 sm:text-lg">
              Offers are updated regularly based on seasonal availability. Message us to
              confirm details before you visit.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          {activeOffers.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {activeOffers.map((offer, index) => (
                <ScrollReveal key={offer.id} delay={index * 0.08}>
                  <OfferCard offer={offer} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-dark/15 p-10 text-center text-dark/60">
              No active offers right now — check back soon or message us for the best current
              price.
            </p>
          )}
        </Container>
      </section>

      <CTASection />
    </>
  );
}
