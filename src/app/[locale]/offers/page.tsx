import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { OfferCard } from "@/components/offers/OfferCard";
import { CTASection } from "@/components/sections/CTASection";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { JsonLd } from "@/components/shared/JsonLd";
import { getBreadcrumbSchema } from "@/lib/structuredData";
import { buildMetadata } from "@/lib/seo";
import { getDictionary, tf } from "@/i18n/getDictionary";
import { requireLocale } from "@/i18n/requireLocale";
import { getBusinessConfig } from "@/lib/data/business";
import { getActiveOffers } from "@/lib/data/offers";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = requireLocale((await params).locale);
  const dict = getDictionary(locale);
  const business = await getBusinessConfig();

  return buildMetadata({
    locale,
    siteName: business.name,
    title: dict.offersPage.heading,
    description: tf(dict.offersPage.metaDescription, { business: business.name }),
    path: "/offers",
  });
}

export default async function OffersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = requireLocale((await params).locale);
  const dict = getDictionary(locale);
  const [activeOffers, business] = await Promise.all([getActiveOffers(), getBusinessConfig()]);

  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema(locale, [
          { name: "Home", path: "/" },
          { name: dict.nav.offers, path: "/offers" },
        ])}
      />

      <section className="bg-navy py-16 text-offwhite sm:py-20">
        <Container>
          <ScrollReveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-mint">
              {dict.offers.eyebrow}
            </p>
            <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
              {dict.offersPage.heading}
            </h1>
            <p className="mt-5 max-w-xl text-base text-offwhite/75 sm:text-lg">
              {dict.offersPage.description}
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
                  <OfferCard offer={offer} locale={locale} dict={dict} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-dark/15 p-10 text-center text-dark/60">
              {dict.offers.empty}
            </p>
          )}
        </Container>
      </section>

      <CTASection locale={locale} dict={dict} businessName={business.name} />
    </>
  );
}
