import { Container } from "@/components/shared/Container";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { CallButton } from "@/components/shared/CallButton";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { tf } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/getDictionary";

export function CTASection({
  locale,
  dict,
  businessName,
  title,
  description,
}: {
  locale: Locale;
  dict: Dictionary;
  businessName: string;
  title?: string;
  description?: string;
}) {
  return (
    <section className="py-16">
      <Container>
        <ScrollReveal>
          <div className="flex flex-col items-center gap-6 rounded-3xl bg-gradient-to-br from-navy to-ocean px-8 py-14 text-center text-offwhite">
            <h2 className="max-w-xl text-2xl font-bold tracking-tight sm:text-3xl">
              {title ?? dict.finalCta.heading}
            </h2>
            <p className="max-w-md text-sm text-offwhite/75 sm:text-base">
              {description ?? tf(dict.finalCta.description, { business: businessName })}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <WhatsAppButton locale={locale} variant="light" />
              <CallButton
                locale={locale}
                variant="outline"
                className="border-offwhite/25 text-offwhite hover:border-aqua hover:text-aqua"
              />
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
