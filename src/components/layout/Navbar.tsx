import Link from "next/link";
import { business } from "@/data/business";
import { navLinks } from "@/data/navigation";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Container } from "@/components/shared/Container";
import { Icon } from "@/components/shared/Icon";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-dark/5 bg-offwhite/85 backdrop-blur-md">
      <Container className="flex h-18 items-center justify-between py-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-navy"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-mint">
            <Icon name="fish" className="h-5 w-5" />
          </span>
          {business.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-dark/70 transition-colors hover:text-ocean"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <WhatsAppButton />
        </div>

        <MobileMenu />
      </Container>
    </header>
  );
}
