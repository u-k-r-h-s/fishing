import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { CallButton } from "@/components/shared/CallButton";
import { Icon } from "@/components/shared/Icon";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/getDictionary";
import type { BusinessConfig } from "@/data/business";

const socialConfig = [
  { key: "instagram" as const, label: "Instagram" },
  { key: "facebook" as const, label: "Facebook" },
  { key: "youtube" as const, label: "YouTube" },
];

export function ContactSection({
  locale,
  dict,
  business,
  showHeading = true,
  showOwner = false,
}: {
  locale: Locale;
  dict: Dictionary;
  business: BusinessConfig;
  showHeading?: boolean;
  showOwner?: boolean;
}) {
  const socials = socialConfig.filter((item) => business[item.key]);
  const fullAddress = [business.address, business.city, business.state, business.country]
    .filter(Boolean)
    .join(", ");

  return (
    <section className="py-20 sm:py-24">
      <Container>
        {showHeading && (
          <ScrollReveal>
            <SectionHeading
              eyebrow={dict.contact.eyebrow}
              title={dict.contact.heading}
              description={dict.contact.description}
              align="center"
            />
          </ScrollReveal>
        )}

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <ScrollReveal className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-8 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-dark/5 sm:grid-cols-2">
              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-ocean">
                  <Icon name="map-pin" className="h-4 w-4" /> {dict.contact.visitUs}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-dark/70">
                  {business.address}
                  <br />
                  {business.city}, {business.state} {business.postalCode}
                  <br />
                  {business.country}
                </p>

                {fullAddress && (
                  <div className="mt-4 aspect-[4/3] w-full overflow-hidden rounded-xl ring-1 ring-dark/10">
                    <iframe
                      title={`Map to ${business.name}`}
                      src={`https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`}
                      className="h-full w-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                )}

                {business.googleMaps && (
                  <a
                    href={business.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm font-semibold text-ocean hover:text-navy"
                  >
                    {dict.common.getDirections} &rarr;
                  </a>
                )}
              </div>

              <div className="flex flex-col gap-8">
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-ocean">
                    <Icon name="clock" className="h-4 w-4" /> {dict.contact.openingHours}
                  </h3>
                  <ul className="mt-3 space-y-1 text-sm text-dark/70">
                    {business.openingHours.map((entry) => (
                      <li key={entry.days}>
                        <span className="font-medium text-dark">{entry.days}:</span> {entry.hours}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-ocean">
                    {dict.contact.phoneEmail}
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
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-ocean">
                      {dict.contact.followUs}
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
            </div>
          </ScrollReveal>

          <div className="flex flex-col gap-6">
            {showOwner && (
              <ScrollReveal>
                <div className="group relative aspect-square w-full overflow-hidden rounded-2xl shadow-sm ring-1 ring-dark/5">
                  <Image
                    src={business.owner.image}
                    alt={business.owner.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    style={{ objectPosition: business.owner.imagePosition }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-lg font-extrabold text-offwhite">{business.owner.name}</p>
                    <p className="text-xs font-medium uppercase tracking-wide text-offwhite/70">
                      {business.owner.role}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            )}

            <ScrollReveal delay={0.1}>
              <div className="flex h-full flex-col justify-center gap-4 rounded-2xl bg-navy p-8 text-offwhite shadow-sm">
                <h3 className="text-lg font-bold">{dict.contact.readyToOrder}</h3>
                <p className="text-sm text-offwhite/70">{dict.contact.readyToOrderBody}</p>
                <WhatsAppButton locale={locale} variant="light" className="w-full" />
                <CallButton
                  locale={locale}
                  variant="outline"
                  className="w-full border-offwhite/20 text-offwhite hover:border-aqua hover:text-aqua"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
