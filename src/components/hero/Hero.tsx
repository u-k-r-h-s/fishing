"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useIsomorphicLayoutEffect } from "@/lib/gsapConfig";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { UnderwaterScene } from "@/components/hero/UnderwaterScene";
import type { Locale } from "@/i18n/locales";
import { localize } from "@/i18n/types";
import { localizedPath } from "@/lib/utils";
import type { BusinessConfig } from "@/data/business";
import type { HeroContent } from "@/lib/data/homepage";

export function Hero({
  locale,
  business,
  content,
}: {
  locale: Locale;
  business: BusinessConfig;
  content: HeroContent;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set([eyebrowRef.current, headingRef.current, subRef.current, ctaRef.current], {
        opacity: 1,
        y: 0,
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Kept short (finishes well under 0.5s) and entirely local to this
      // component — it never waits on Supabase, images, or the underwater
      // scene's fish/boat animation. Hero content is real, non-empty markup
      // from first paint; this is just a quick polish fade on top of it.
      gsap.fromTo(
        [eyebrowRef.current, headingRef.current, subRef.current, ctaRef.current],
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.03, ease: "power2.out" }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative isolate min-h-[92vh] overflow-hidden bg-navy text-offwhite">
      <UnderwaterScene />

      <div className="relative mx-auto flex min-h-[92vh] w-full max-w-7xl items-center px-5 py-24 sm:px-8 lg:px-10">
        <div className="max-w-lg">
          <p
            ref={eyebrowRef}
            className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-mint sm:text-sm"
          >
            {localize(content.eyebrow, locale)}
          </p>
          <h1
            ref={headingRef}
            className="text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
          >
            {localize(content.headlineLine1, locale)}
            <br />
            {localize(content.headlineLine2, locale)}
          </h1>
          <p ref={subRef} className="mt-6 max-w-sm text-lg leading-relaxed text-offwhite/80">
            {localize(content.subheading, locale)}
          </p>
          <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={localizedPath(locale, "/fresh-fish")}
              className="inline-flex items-center justify-center rounded-full bg-aqua px-7 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-mint"
            >
              {localize(content.ctaPrimaryLabel, locale)}
            </Link>
            <WhatsAppButton locale={locale} variant="light" label={localize(content.ctaSecondaryLabel, locale)} />
          </div>
          <p className="mt-10 text-xs text-offwhite/50">
            {business.name} &middot; {business.city}
          </p>
        </div>
      </div>
    </section>
  );
}
