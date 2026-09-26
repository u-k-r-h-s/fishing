"use client";

import { useRef } from "react";
import { gsap, useIsomorphicLayoutEffect } from "@/lib/gsapConfig";
import { VideoPlayer } from "@/components/video/VideoPlayer";
import type { SocialPost } from "@/data/social";
import type { Dictionary } from "@/i18n/getDictionary";
import { localize } from "@/i18n/types";
import type { Locale } from "@/i18n/locales";

/** A realistic-but-simple phone bezel with a 9:16 video viewport, integrated into the page rather than pasted on top. */
export function SocialPhoneMockup({
  post,
  locale,
  dict,
}: {
  post: SocialPost;
  locale: Locale;
  dict: Dictionary;
}) {
  const floatRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = floatRef.current;
    if (!el) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: 10,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
    return () => ctx.revert();
  }, []);

  useIsomorphicLayoutEffect(() => {
    const el = screenRef.current;
    if (!el) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, scale: 1 });
      return;
    }
    gsap.fromTo(el, { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" });
  }, [post.id]);

  return (
    <div ref={floatRef} className="relative mx-auto w-full max-w-[300px]">
      {/* Bezel */}
      <div className="relative aspect-[9/19.5] w-full rounded-[2.75rem] border-[10px] border-dark bg-dark shadow-2xl">
        {/* Speaker/camera */}
        <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-dark" />

        {/* Screen */}
        <div ref={screenRef} className="absolute inset-0 overflow-hidden rounded-[2.1rem]">
          <VideoPlayer
            src={post.video}
            poster={post.thumbnail}
            title={localize(post.title, locale)}
            dict={dict}
            autoPlay
            className="h-full w-full"
          />

          {/* Screen reflection */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"
          />

          {/* Caption overlay */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-10">
            <p className="text-sm font-semibold text-white">{localize(post.title, locale)}</p>
            <p className="mt-1 text-xs text-white/75">{localize(post.caption, locale)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
