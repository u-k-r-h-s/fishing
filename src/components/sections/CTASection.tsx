import { business } from "@/data/business";
import { Container } from "@/components/shared/Container";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { CallButton } from "@/components/shared/CallButton";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function CTASection({
  title = "Can't decide what's freshest today?",
  description = `Message ${business.name} directly on WhatsApp — we'll tell you exactly what came in this morning.`,
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="py-16">
      <Container>
        <ScrollReveal>
          <div className="flex flex-col items-center gap-6 rounded-3xl bg-gradient-to-br from-navy to-ocean px-8 py-14 text-center text-offwhite">
            <h2 className="max-w-xl text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
            <p className="max-w-md text-sm text-offwhite/75 sm:text-base">{description}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <WhatsAppButton variant="light" />
              <CallButton
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
