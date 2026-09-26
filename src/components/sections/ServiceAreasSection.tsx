import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Icon } from "@/components/shared/Icon";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { localize } from "@/i18n/types";
import type { Localized } from "@/i18n/types";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/getDictionary";

export function ServiceAreasSection({
  locale,
  dict,
  serviceAreas,
}: {
  locale: Locale;
  dict: Dictionary;
  serviceAreas: Localized<string>[];
}) {
  return (
    <section className="relative overflow-hidden bg-navy py-20 text-offwhite sm:py-24">
      {/* Decorative radiating-coverage visual — abstract, not a real map. */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-full w-[140%] max-w-none -translate-x-1/2 opacity-20"
        viewBox="0 0 800 400"
      >
        <circle cx="400" cy="120" r="60" fill="none" stroke="currentColor" strokeWidth="1" className="text-aqua" />
        <circle cx="400" cy="120" r="120" fill="none" stroke="currentColor" strokeWidth="1" className="text-aqua" />
        <circle cx="400" cy="120" r="180" fill="none" stroke="currentColor" strokeWidth="1" className="text-aqua" />
        <circle cx="400" cy="120" r="6" fill="currentColor" className="text-mint" />
      </svg>

      <Container className="relative">
        <ScrollReveal>
          <SectionHeading
            eyebrow={dict.serviceAreas.eyebrow}
            title={dict.serviceAreas.heading}
            description={dict.serviceAreas.description}
            align="center"
            className="[&_h2]:text-offwhite [&_p]:text-offwhite/70"
          />
        </ScrollReveal>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {serviceAreas.map((area, index) => (
            <ScrollReveal key={localize(area, locale)} delay={index * 0.04} as="span">
              <span className="flex items-center gap-2 rounded-full border border-offwhite/15 bg-offwhite/5 px-5 py-2.5 text-sm font-medium text-offwhite/85">
                <Icon name="map-pin" className="h-4 w-4 text-aqua" />
                {localize(area, locale)}
              </span>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-10 flex justify-center" delay={0.15}>
          <WhatsAppButton locale={locale} variant="light" />
        </ScrollReveal>
      </Container>
    </section>
  );
}
