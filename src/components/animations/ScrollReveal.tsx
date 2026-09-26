"use client";

import { useRef } from "react";
import { gsap, ensureGsapPlugins, useIsomorphicLayoutEffect } from "@/lib/gsapConfig";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Vertical offset in px the element travels from. */
  y?: number;
  delay?: number;
  duration?: number;
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * Fades + slides an element up into view once it enters the viewport.
 * Respects prefers-reduced-motion by skipping the animation entirely.
 */
export function ScrollReveal({
  children,
  className,
  y = 32,
  delay = 0,
  duration = 0.8,
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    ensureGsapPlugins();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [y, delay, duration]);

  const Component = Tag as React.ElementType;

  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
}
