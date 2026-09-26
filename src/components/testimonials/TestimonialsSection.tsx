import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Testimonial } from "@/data/testimonials";

export function TestimonialsSection({
  locale,
  dict,
  testimonials,
}: {
  locale: Locale;
  dict: Dictionary;
  testimonials: Testimonial[];
}) {
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-mint/20 py-20 sm:py-24">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow={dict.testimonials.eyebrow}
            title={dict.testimonials.heading}
            description={dict.testimonials.description}
            align="center"
          />
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.id} delay={index * 0.08}>
              <TestimonialCard testimonial={testimonial} locale={locale} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
