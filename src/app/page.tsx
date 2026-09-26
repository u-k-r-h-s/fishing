import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { FishGrid } from "@/components/fish/FishGrid";
import { OffersSection } from "@/components/offers/OffersSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { ServiceAreasSection } from "@/components/sections/ServiceAreasSection";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { FAQSection } from "@/components/faq/FAQSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { getFeaturedFish } from "@/data/fish";
import { business } from "@/data/business";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/shared/JsonLd";
import { getFAQPageSchema } from "@/lib/structuredData";
import Link from "next/link";

export const metadata: Metadata = buildMetadata({
  title: `${business.name} | ${business.tagline}`,
  description: business.description,
  path: "/",
});

export default function HomePage() {
  const featured = getFeaturedFish();

  return (
    <>
      <JsonLd data={getFAQPageSchema()} />
      <Hero />

      <section className="py-20 sm:py-24">
        <Container>
          <ScrollReveal>
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading
                eyebrow="Fresh Today"
                title="Our Featured Fresh Fish"
                description="Hand-picked and checked for freshness before it ever reaches the counter."
              />
              <Link
                href="/fresh-fish"
                className="shrink-0 text-sm font-semibold text-ocean hover:text-navy"
              >
                View Full Catalogue &rarr;
              </Link>
            </div>
          </ScrollReveal>

          <div className="mt-10">
            <FishGrid items={featured} />
          </div>
        </Container>
      </section>

      <OffersSection />
      <AboutSection />
      <WhyChooseUsSection />
      <ServiceAreasSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
