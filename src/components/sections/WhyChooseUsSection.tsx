import { whyChooseUs } from "@/data/content";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Icon } from "@/components/shared/Icon";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function WhyChooseUsSection() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Why Choose Us"
            title="A Standard You Can Taste"
            align="center"
          />
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 0.08}>
              <div className="flex h-full flex-col items-center rounded-2xl bg-white p-7 text-center shadow-sm ring-1 ring-dark/5">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy text-mint">
                  <Icon name={item.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-base font-bold text-dark">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-dark/60">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
