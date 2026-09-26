import Link from "next/link";
import { business } from "@/data/business";
import { navLinks } from "@/data/navigation";
import { serviceAreas } from "@/data/serviceAreas";
import { Container } from "@/components/shared/Container";
import { Icon } from "@/components/shared/Icon";

const socialLinks = (business: { instagram: string; facebook: string; youtube: string }) =>
  [
    { name: "instagram" as const, href: business.instagram, label: "Instagram" },
    { name: "facebook" as const, href: business.facebook, label: "Facebook" },
    { name: "youtube" as const, href: business.youtube, label: "YouTube" },
  ].filter((item) => item.href);

export function Footer() {
  const socials = socialLinks(business);

  return (
    <footer className="border-t border-dark/5 bg-navy text-offwhite/80">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="flex items-center gap-2 text-lg font-extrabold text-offwhite">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-mint text-navy">
              <Icon name="fish" className="h-4 w-4" />
            </span>
            {business.name}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-offwhite/70">
            {business.description}
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
            Quick Links
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-offwhite/70 hover:text-offwhite">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-aqua">Contact</p>
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
            Opening Hours
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
            Service Areas
          </p>
          <p className="mt-3 text-sm text-offwhite/70">{serviceAreas.join(", ")}</p>
        </div>
      </Container>

      <div className="border-t border-offwhite/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-offwhite/50 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          <p>Demo content — for a fresh fish business template.</p>
        </Container>
      </div>
    </footer>
  );
}
