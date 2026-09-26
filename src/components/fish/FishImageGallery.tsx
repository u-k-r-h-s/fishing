"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { cn } from "@/lib/utils";

/**
 * Main photo + a row of thumbnails (main photo first, then the admin's
 * gallery uploads) — click a thumbnail to swap the main photo, same
 * click-to-select pattern as the hero's reel thumbnails.
 */
export function FishImageGallery({
  images,
  alt,
  badge,
}: {
  /** Main image first, followed by gallery images — already deduped by the caller. */
  images: string[];
  alt: string;
  badge?: React.ReactNode;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex] ?? images[0];

  return (
    <div>
      <ImageReveal className="relative aspect-square w-full rounded-[1.75rem] bg-mint/20 shadow-lg">
        <Image
          src={active}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover"
        />
        {badge}
      </ImageReveal>

      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {images.map((src, index) => (
            <button
              key={src + index}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`${alt} — photo ${index + 1}`}
              aria-pressed={index === activeIndex}
              className={cn(
                "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg ring-2 transition-all",
                index === activeIndex ? "ring-aqua" : "opacity-60 ring-transparent hover:opacity-100"
              )}
            >
              <Image src={src} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
