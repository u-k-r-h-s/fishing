import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { localize } from "@/i18n/types";
import { localizedPath } from "@/lib/utils";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/getDictionary";
import type { AboutContent } from "@/data/content";

export function AboutSection({
  locale,
  dict,
  content,
  full = false,
}: {
  locale: Locale;
  dict: Dictionary;
  content: AboutContent;
  /** Show the full story (all paragraphs, no "learn more" link) — used on the /about page. */
  full?: boolean;
}) {
  const allParagraphs = localize(content.paragraphs, locale);
  const paragraphs = full ? allParagraphs : allParagraphs.slice(0, 2);

  return (
    <section className="py-20 sm:py-24">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <ImageReveal className="relative order-1 aspect-[4/3] w-full rounded-[1.75rem] shadow-lg lg:order-none">
          <Image
            src={content.image}
            alt={content.imageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </ImageReveal>

        <ScrollReveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-ocean">
            {dict.about.eyebrow}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
            {localize(content.heading, locale)}
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-dark/70">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          {!full && (
            <Link
              href={localizedPath(locale, "/about")}
              className="mt-7 inline-flex items-center text-sm font-semibold text-ocean hover:text-navy"
            >
              {dict.common.learnMore} &rarr;
            </Link>
          )}
        </ScrollReveal>
      </Container>
    </section>
  );
}
