import type { Metadata } from "next";
import { fish } from "@/data/fish";
import { business } from "@/data/business";
import { Container } from "@/components/shared/Container";
import { FishGrid } from "@/components/fish/FishGrid";
import { CTASection } from "@/components/sections/CTASection";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { JsonLd } from "@/components/shared/JsonLd";
import { getBreadcrumbSchema } from "@/lib/structuredData";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Fresh Fish Catalogue",
  description: `Browse the full range of fresh fish and seafood available at ${business.name}. Message us on WhatsApp for today's availability and pricing.`,
  path: "/fresh-fish",
});

export default function FreshFishPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Fresh Fish", path: "/fresh-fish" },
        ])}
      />

      <section className="bg-navy py-16 text-offwhite sm:py-20">
        <Container>
          <ScrollReveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-mint">
              Catalogue
            </p>
            <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
              Fresh Fish, Selected Daily
            </h1>
            <p className="mt-5 max-w-xl text-base text-offwhite/75 sm:text-lg">
              Every fish below is checked for freshness before it&apos;s offered for sale. Tap
              any item for details, or message us directly for today&apos;s best picks.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <FishGrid items={fish} />
        </Container>
      </section>

      <CTASection />
    </>
  );
}
