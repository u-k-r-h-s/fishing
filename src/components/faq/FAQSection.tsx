import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/getDictionary";
import type { FAQ } from "@/data/faqs";

export function FAQSection({
  locale,
  dict,
  faqs,
}: {
  locale: Locale;
  dict: Dictionary;
  faqs: FAQ[];
}) {
  return (
    <section className="py-20 sm:py-24">
      <Container className="max-w-4xl">
        <ScrollReveal>
          <SectionHeading
            eyebrow={dict.faq.eyebrow}
            title={dict.faq.heading}
            description={dict.faq.description}
            align="center"
          />
        </ScrollReveal>

        <ScrollReveal className="mt-10" delay={0.1}>
          <FAQAccordion items={faqs} locale={locale} />
        </ScrollReveal>
      </Container>
    </section>
  );
}
