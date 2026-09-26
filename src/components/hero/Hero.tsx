"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap, useIsomorphicLayoutEffect } from "@/lib/gsapConfig";
import { business } from "@/data/business";
import { heroContent } from "@/data/content";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(
        [eyebrowRef.current, headingRef.current, subRef.current, ctaRef.current, imageRef.current],
        { opacity: 1, y: 0, scale: 1 }
      );
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(eyebrowRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 })
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.3"
        )
        .fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .fromTo(ctaRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.35")
        .fromTo(
          imageRef.current,
          { opacity: 0, scale: 1.06, x: 24 },
          { opacity: 1, scale: 1, x: 0, duration: 1 },
          "-=0.6"
        );

      // Subtle continuous drift on the hero image
      gsap.to(imageRef.current, {
        y: 10,
        duration: 3.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.2,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-navy text-offwhite">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(8,145,178,0.35),transparent_45%),radial-gradient(circle_at_85%_60%,rgba(204,251,241,0.12),transparent_50%)]"
      />
      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-2 lg:px-10">
        <div>
          <p ref={eyebrowRef} className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-mint">
            {heroContent.eyebrow}
          </p>
          <h1
            ref={headingRef}
            className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
          >
            {heroContent.headline}
          </h1>
          <p ref={subRef} className="mt-6 max-w-md text-lg leading-relaxed text-offwhite/80">
            {heroContent.subheading}
          </p>
          <div ref={ctaRef} className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/fresh-fish"
              className="inline-flex items-center justify-center rounded-full bg-aqua px-7 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-mint"
            >
              Explore Fresh Fish
            </Link>
            <WhatsAppButton variant="light" />
          </div>
          <p className="mt-8 text-xs text-offwhite/50">
            {business.name} &middot; {business.city}
          </p>
        </div>

        <div ref={imageRef} className="relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-aqua/30 to-mint/10 blur-2xl" />
          <div className="relative h-full w-full overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-offwhite/10">
            <Image
              src={heroContent.image}
              alt={heroContent.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 480px, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
