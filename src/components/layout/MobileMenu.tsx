"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import gsap from "gsap";
import { navLinks } from "@/data/navigation";
import type { BusinessConfig } from "@/data/business";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { CallButton } from "@/components/shared/CallButton";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Icon } from "@/components/shared/Icon";
import { localizedPath } from "@/lib/utils";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/getDictionary";

const emptySubscribe = () => () => {};

/** True only once mounted on the client — lets us safely portal into document.body. */
function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function MobileMenu({
  locale,
  dict,
  business,
}: {
  locale: Locale;
  dict: Dictionary;
  business: BusinessConfig;
}) {
  const [open, setOpen] = useState(false);
  const mounted = useMounted();
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const panel = panelRef.current;
    const overlay = overlayRef.current;
    if (!panel || !overlay) return;

    const ctx = gsap.context(() => {
      if (open) {
        gsap.set(panel, { display: "flex" });
        gsap.set(overlay, { display: "block", pointerEvents: "none" });
        gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power1.out" });
        gsap.fromTo(
          panel,
          { xPercent: 100 },
          {
            xPercent: 0,
            duration: 0.4,
            ease: "power3.out",
            onComplete: () => gsap.set(overlay, { pointerEvents: "auto" }),
          }
        );
        gsap.fromTo(
          linkRefs.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, delay: 0.15, ease: "power2.out" }
        );
      } else if (panel.style.display !== "none") {
        gsap.to(overlay, { opacity: 0, duration: 0.2, ease: "power1.in" });
        gsap.to(panel, {
          xPercent: 100,
          duration: 0.3,
          ease: "power3.in",
          onComplete: () => {
            gsap.set(panel, { display: "none" });
            gsap.set(overlay, { display: "none" });
          },
        });
      }
    });

    return () => ctx.revert();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-dark/10 text-dark"
      >
        <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
      </button>

      {mounted &&
        createPortal(
          <>
            {/*
              Rendered via a portal into <body>: the header uses
              backdrop-blur, which creates a new containing block for
              `position: fixed` descendants and would otherwise clip
              this panel to the header's own height.
            */}
            <div
              ref={overlayRef}
              aria-hidden="true"
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 hidden bg-dark/40 backdrop-blur-sm"
            />

            <div
              id="mobile-menu-panel"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="fixed inset-y-0 right-0 z-50 hidden w-[82%] max-w-sm flex-col bg-offwhite px-6 py-6 shadow-2xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-lg font-extrabold text-navy">{business.name}</span>
                <button
                  type="button"
                  aria-label={dict.nav.closeMenu}
                  onClick={() => setOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-dark/10"
                >
                  <Icon name="close" className="h-4 w-4" />
                </button>
              </div>

              <LanguageSwitcher locale={locale} ariaLabel={dict.nav.language} className="mb-4" />

              <ul className="flex flex-col gap-1">
                {navLinks.map((link, index) => (
                  <li key={link.href} ref={(el) => { linkRefs.current[index] = el; }}>
                    <Link
                      href={localizedPath(locale, link.href)}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-3 text-base font-semibold text-dark hover:bg-mint/40"
                    >
                      {dict.nav[link.labelKey]}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col gap-3 pt-6">
                <WhatsAppButton locale={locale} className="w-full" />
                <CallButton locale={locale} className="w-full" />
              </div>
            </div>
          </>,
          document.body
        )}
    </div>
  );
}
