import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/data/navigation";
import { Container } from "@/components/shared/Container";
import { Icon } from "@/components/shared/Icon";
import { localize } from "@/i18n/types";
import type { Localized } from "@/i18n/types";
import { localizedPath } from "@/lib/utils";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/getDictionary";
import type { BusinessConfig } from "@/data/business";

const socialLinks = (biz: { instagram: string; facebook: string; youtube: string }) =>
  [
    { name: "instagram" as const, href: biz.instagram, label: "Instagram" },
    { name: "facebook" as const, href: biz.facebook, label: "Facebook" },
    { name: "youtube" as const, href: biz.youtube, label: "YouTube" },
  ].filter((item) => item.href);

export function Footer({
  locale,
  dict,
  business,
  serviceAreas,
}: {
  locale: Locale;
  dict: Dictionary;
  business: BusinessConfig;
  serviceAreas: Localized<string>[];
}) {
  const socials = socialLinks(business);

  return (
    <footer className="relative border-t border-dark/5 bg-navy text-offwhite/80">
      <svg
        aria-hidden="true"
        className="absolute -top-px left-0 h-6 w-full text-offwhite"
        viewBox="0 0 1200 24"
        preserveAspectRatio="none"
      >
        <path d="M0 24 Q 150 0, 300 24 T 600 24 T 900 24 T 1200 24 V0 H0 Z" fill="currentColor" />
      </svg>

      <Container className="grid gap-10 pt-16 pb-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="flex items-center gap-2 text-lg font-extrabold text-offwhite">
            {business.logo ? (
              <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
                <Image src={business.logo} alt="" fill sizes="32px" className="object-cover" />
              </span>
            ) : (
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-mint text-navy">
                <Icon name="fish" className="h-4 w-4" />
              </span>
            )}
            {business.name}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-offwhite/70">
            {localize(business.description, locale)}
          </p>
          {socials.length > 0 && (
            <div className="mt-5 flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-offwhite/20 text-offwhite/80 transition-colors hover:border-aqua hover:text-aqua"
                >
                  <Icon name={social.name} className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-aqua">
            {dict.footer.quickLinks}
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={localizedPath(locale, link.href)} className="text-offwhite/70 hover:text-offwhite">
                  {dict.nav[link.labelKey]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-aqua">
            {dict.footer.contact}
          </p>
          <ul className="mt-4 space-y-3 text-sm text-offwhite/70">
            <li>
              <a href={`tel:${business.phone}`} className="hover:text-offwhite">
                {business.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className="hover:text-offwhite">
                {business.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="map-pin" className="mt-0.5 h-4 w-4 shrink-0 text-aqua" />
              <span>
                {business.address}, {business.city}, {business.state} {business.postalCode}
              </span>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-aqua">
            {dict.footer.openingHours}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-offwhite/70">
            {business.openingHours.map((entry) => (
              <li key={entry.days} className="flex items-start gap-2">
                <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-aqua" />
                <span>
                  {entry.days}: {entry.hours}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-aqua">
            {dict.footer.serviceAreas}
          </p>
          <p className="mt-3 text-sm text-offwhite/70">
            {serviceAreas.map((area) => localize(area, locale)).join(", ")}
          </p>
        </div>
      </Container>

      <div className="border-t border-offwhite/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-offwhite/50 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {business.name}. {dict.footer.rights}
          </p>
          <p>{dict.footer.demoNotice}</p>
        </Container>
      </div>
    </footer>
  );
}
