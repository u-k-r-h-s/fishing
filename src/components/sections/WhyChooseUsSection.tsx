import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Icon } from "@/components/shared/Icon";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { localize } from "@/i18n/types";
import type { Locale } from "@/i18n/locales";
import type { WhyChooseUsContent } from "@/lib/data/homepage";

export function WhyChooseUsSection({ locale, content }: { locale: Locale; content: WhyChooseUsContent }) {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow={localize(content.eyebrow, locale)}
            title={localize(content.heading, locale)}
            align="center"
          />
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.items.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 0.08}>
              <div className="flex h-full flex-col items-center rounded-2xl bg-white p-7 text-center shadow-sm ring-1 ring-dark/5">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy text-mint">
                  <Icon name={item.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-base font-bold text-dark">{localize(item.title, locale)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-dark/60">
                  {localize(item.description, locale)}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
