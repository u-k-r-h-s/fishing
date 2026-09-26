import { business } from "@/data/business";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { CallButton } from "@/components/shared/CallButton";
import { Icon } from "@/components/shared/Icon";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const socialConfig = [
  { key: "instagram" as const, label: "Instagram" },
  { key: "facebook" as const, label: "Facebook" },
  { key: "youtube" as const, label: "YouTube" },
];

export function ContactSection({ showHeading = true }: { showHeading?: boolean }) {
  const socials = socialConfig.filter((item) => business[item.key]);

  return (
    <section className="py-20 sm:py-24">
      <Container>
        {showHeading && (
          <ScrollReveal>
            <SectionHeading
              eyebrow="Contact"
              title="Get In Touch"
              description="The fastest way to check today's fresh catch is a quick WhatsApp message."
              align="center"
            />
          </ScrollReveal>
        )}

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <ScrollReveal className="lg:col-span-2">
            <div className="grid h-full grid-cols-1 gap-6 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-dark/5 sm:grid-cols-2">
              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-ocean">
                  <Icon name="map-pin" className="h-4 w-4" /> Visit Us
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-dark/70">
                  {business.address}
                  <br />
                  {business.city}, {business.state} {business.postalCode}
                  <br />
                  {business.country}
                </p>
                {business.googleMaps && (
                  <a
                    href={business.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm font-semibold text-ocean hover:text-navy"
                  >
                    Get Directions &rarr;
                  </a>
                )}
              </div>

              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-ocean">
                  <Icon name="clock" className="h-4 w-4" /> Opening Hours
                </h3>
                <ul className="mt-3 space-y-1 text-sm text-dark/70">
                  {business.openingHours.map((entry) => (
                    <li key={entry.days}>
                      <span className="font-medium text-dark">{entry.days}:</span> {entry.hours}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sm:col-span-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-ocean">
                  Phone &amp; Email
                </h3>
                <div className="mt-3 flex flex-col gap-1 text-sm text-dark/70">
                  <a href={`tel:${business.phone}`} className="hover:text-ocean">
                    {business.phoneDisplay}
                  </a>
                  <a href={`mailto:${business.email}`} className="hover:text-ocean">
                    {business.email}
                  </a>
                </div>
              </div>

              {socials.length > 0 && (
                <div className="sm:col-span-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-ocean">
                    Follow Us
                  </h3>
                  <div className="mt-3 flex gap-3">
                    {socials.map((social) => (
                      <a
                        key={social.key}
                        href={business[social.key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-dark/10 text-dark/70 transition-colors hover:border-aqua hover:text-ocean"
                      >
                        <Icon name={social.key} className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex h-full flex-col justify-center gap-4 rounded-2xl bg-navy p-8 text-offwhite shadow-sm">
              <h3 className="text-lg font-bold">Ready to order?</h3>
              <p className="text-sm text-offwhite/70">
                Message us for today&apos;s availability and pricing — we typically reply within
                minutes during business hours.
              </p>
              <WhatsAppButton variant="light" className="w-full" />
              <CallButton variant="outline" className="w-full border-offwhite/20 text-offwhite hover:border-aqua hover:text-aqua" />
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
