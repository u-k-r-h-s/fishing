import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/data/navigation";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { NavbarShrinkWrapper } from "@/components/layout/NavbarShrinkWrapper";
import { Container } from "@/components/shared/Container";
import { Icon } from "@/components/shared/Icon";
import { localizedPath } from "@/lib/utils";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/getDictionary";
import type { BusinessConfig } from "@/data/business";

export function Navbar({
  locale,
  dict,
  business,
}: {
  locale: Locale;
  dict: Dictionary;
  business: BusinessConfig;
}) {
  return (
    <NavbarShrinkWrapper>
      <Container className="flex h-11 items-center justify-between">
        <Link
          href={localizedPath(locale, "/")}
          className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-navy"
        >
          {business.logo ? (
            // A wordmark logo already carries the business name visually, so
            // it replaces (not joins) the text label. object-contain + a
            // fixed-size box that's wider than tall means the full logo
            // always shows, whatever its own aspect ratio — never cropped.
            <span className="relative h-9 w-32 shrink-0">
              <Image src={business.logo} alt={business.name} fill sizes="128px" className="object-contain object-left" />
            </span>
          ) : (
            <>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-mint">
                <Icon name="fish" className="h-5 w-5" />
              </span>
              {business.name}
            </>
          )}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={localizedPath(locale, link.href)}
              className="text-sm font-semibold text-dark/70 transition-colors hover:text-ocean"
            >
              {dict.nav[link.labelKey]}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher locale={locale} ariaLabel={dict.nav.language} />
          <WhatsAppButton locale={locale} />
        </div>

        <MobileMenu locale={locale} dict={dict} business={business} />
      </Container>
    </NavbarShrinkWrapper>
  );
}
