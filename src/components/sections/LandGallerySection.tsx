"use client";

import { useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Icon } from "@/components/shared/Icon";
import { localize } from "@/i18n/types";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Localized } from "@/i18n/types";

/**
 * A dynamic slider for the About page's land/premises photos — admin-managed
 * (0 to 10 images, see AboutSectionForm's GalleryUploadField). Renders
 * nothing at all when no images have been uploaded yet, and adapts to
 * however many are actually present rather than assuming a fixed count.
 * Plain CSS scroll-snap + a native horizontal scroll, not a carousel
 * library — this project only pulls in GSAP for real animation needs.
 */
export function LandGallerySection({
  locale,
  dict,
  images,
  heading,
  description,
}: {
  locale: Locale;
  dict: Dictionary;
  images: string[];
  /** Admin-written heading — falls back to a generic dictionary heading when empty. */
  heading?: Localized<string>;
  /** Admin-written description (e.g. the story of the land) — hidden entirely when empty. */
  description?: Localized<string>;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  if (images.length === 0) return null;

  const localizedHeading = heading ? localize(heading, locale) : "";
  const localizedDescription = description ? localize(description, locale) : "";

  function scrollByOne(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const amount = (card?.offsetWidth ?? track.clientWidth) + 16;
    track.scrollBy({ left: amount * direction, behavior: "smooth" });
  }

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <ScrollReveal className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-ocean">
              {dict.about.galleryEyebrow}
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
              {localizedHeading || dict.about.galleryHeading}
            </h2>
            {localizedDescription && (
              <p className="mt-4 text-base leading-relaxed text-dark/70">{localizedDescription}</p>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scrollByOne(-1)}
                aria-label="Previous image"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-dark/10 text-dark/70 transition-colors hover:border-aqua hover:text-ocean"
              >
                <Icon name="chevron-down" className="h-4 w-4 rotate-90" />
              </button>
              <button
                type="button"
                onClick={() => scrollByOne(1)}
                aria-label="Next image"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-dark/10 text-dark/70 transition-colors hover:border-aqua hover:text-ocean"
              >
                <Icon name="chevron-down" className="h-4 w-4 -rotate-90" />
              </button>
            </div>
          )}
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div
            ref={trackRef}
            className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {images.map((src, index) => (
              <div
                key={src}
                className="relative aspect-[4/3] w-[80%] shrink-0 snap-center overflow-hidden rounded-2xl shadow-sm ring-1 ring-dark/5 sm:w-[45%] lg:w-[31%]"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 31vw, (min-width: 640px) 45vw, 80vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
