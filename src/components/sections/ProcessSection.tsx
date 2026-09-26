import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { Icon } from "@/components/shared/Icon";
import { localize } from "@/i18n/types";
import type { Locale } from "@/i18n/locales";
import type { ProcessContent } from "@/lib/data/homepage";

export function ProcessSection({ locale, content }: { locale: Locale; content: ProcessContent }) {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <ImageReveal className="relative order-1 aspect-[4/5] w-full rounded-[1.75rem] shadow-lg lg:order-none">
          <Image
            src="/images/about/process-story.svg"
            alt="From selection to handover — the process behind every order"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </ImageReveal>

        <div>
          <ScrollReveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-ocean">
              {localize(content.eyebrow, locale)}
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
              {localize(content.heading, locale)}
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-dark/70">
              {localize(content.description, locale)}
            </p>
          </ScrollReveal>

          <ol className="mt-9 space-y-6">
            {content.steps.map((step, index) => (
              <ScrollReveal key={step.id} delay={index * 0.08} as="li">
                <div className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy text-mint">
                    <Icon name={step.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-ocean">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-0.5 text-base font-bold text-dark">
                      {localize(step.title, locale)}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-dark/60">
                      {localize(step.description, locale)}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
