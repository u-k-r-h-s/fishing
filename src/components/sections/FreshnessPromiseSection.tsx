import { Container } from "@/components/shared/Container";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { localize } from "@/i18n/types";
import type { Locale } from "@/i18n/locales";
import type { FreshnessPromiseFull } from "@/lib/data/homepage";

export function FreshnessPromiseSection({ locale, content }: { locale: Locale; content: FreshnessPromiseFull }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-ocean to-navy py-24 text-offwhite sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(14,165,198,0.25),transparent_45%)]"
      />
      <Container className="relative max-w-3xl text-center">
        <ScrollReveal>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-mint sm:text-sm">
            {localize(content.eyebrow, locale)}
          </p>
          <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            {localize(content.heading, locale)}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-offwhite/80 sm:text-lg">
            {localize(content.statement, locale)}
          </p>
        </ScrollReveal>
      </Container>
    </section>
  );
}
