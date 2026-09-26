import type { Metadata } from "next";
import { business } from "@/data/business";
import { Container } from "@/components/shared/Container";
import { ContactSection } from "@/components/contact/ContactSection";
import { FAQSection } from "@/components/faq/FAQSection";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { JsonLd } from "@/components/shared/JsonLd";
import { getBreadcrumbSchema, getFAQPageSchema } from "@/lib/structuredData";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description: `Reach ${business.name} by phone, WhatsApp, or visit our shop in ${business.city}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <JsonLd data={getFAQPageSchema()} />

      <section className="bg-navy py-16 text-offwhite sm:py-20">
        <Container>
          <ScrollReveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-mint">
              Contact
            </p>
            <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
              We&apos;d Love to Hear From You
            </h1>
            <p className="mt-5 max-w-xl text-base text-offwhite/75 sm:text-lg">
              Whether it&apos;s a question about today&apos;s catch or a bulk order for an event, reach
              out any time.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <ContactSection showHeading={false} />
      <FAQSection />
    </>
  );
}
