import { faqs } from "@/data/faqs";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function FAQSection() {
  return (
    <section className="py-20 sm:py-24">
      <Container className="max-w-4xl">
        <ScrollReveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Common Questions"
            description="Everything you need to know before you order."
            align="center"
          />
        </ScrollReveal>

        <ScrollReveal className="mt-10" delay={0.1}>
          <FAQAccordion items={faqs} />
        </ScrollReveal>
      </Container>
    </section>
  );
}
