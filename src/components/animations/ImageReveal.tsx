"use client";

import { useRef } from "react";
import { gsap, ensureGsapPlugins, useIsomorphicLayoutEffect } from "@/lib/gsapConfig";
import { cn } from "@/lib/utils";

/**
 * Reveals an image with a soft clip + scale transition as it enters view.
 * Wrap a next/image (with `fill`) inside this component.
 */
export function ImageReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, scale: 1 });
      return;
    }

    ensureGsapPlugins();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 1.08 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.1,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={wrapperRef} className={cn("overflow-hidden", className)}>
      {children}
    </div>
  );
}
