import type { Metadata } from "next";
import { business } from "@/data/business";
import { Container } from "@/components/shared/Container";
import { AboutSection } from "@/components/sections/AboutSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { JsonLd } from "@/components/shared/JsonLd";
import { getBreadcrumbSchema } from "@/lib/structuredData";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description: `Learn about ${business.name}'s commitment to freshness, quality, and hygiene.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <section className="bg-navy py-16 text-offwhite sm:py-20">
        <Container>
          <ScrollReveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-mint">
              About Us
            </p>
            <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
              {business.tagline}
            </h1>
            <p className="mt-5 max-w-xl text-base text-offwhite/75 sm:text-lg">
              {business.description}
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <AboutSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
