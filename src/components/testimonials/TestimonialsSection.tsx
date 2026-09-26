import { testimonials } from "@/data/testimonials";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function TestimonialsSection() {
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-mint/20 py-20 sm:py-24">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Testimonials"
            title="What Customers Say"
            description="Sample feedback shown for demonstration — real customer reviews will appear here."
            align="center"
          />
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.id} delay={index * 0.08}>
              <TestimonialCard testimonial={testimonial} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
