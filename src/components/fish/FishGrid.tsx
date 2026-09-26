"use client";

import { useRef } from "react";
import type { Fish } from "@/data/fish";
import { FishCard } from "@/components/fish/FishCard";
import { gsap, ensureGsapPlugins, useIsomorphicLayoutEffect } from "@/lib/gsapConfig";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/getDictionary";

export function FishGrid({
  items,
  locale,
  dict,
}: {
  items: Fish[];
  locale: Locale;
  dict: Dictionary;
}) {
  const gridRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const cards = Array.from(el.children);

    if (prefersReducedMotion) {
      gsap.set(cards, { opacity: 1, y: 0 });
      return;
    }

    ensureGsapPlugins();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [items]);

  if (items.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-dark/15 p-10 text-center text-dark/60">
        No fish available right now — please check back soon or message us directly.
      </p>
    );
  }

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      {items.map((item) => (
        <FishCard key={item.id} item={item} locale={locale} dict={dict} />
      ))}
    </div>
  );
}
