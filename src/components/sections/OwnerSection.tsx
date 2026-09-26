import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { Icon } from "@/components/shared/Icon";
import { localize } from "@/i18n/types";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Owner } from "@/data/business";

export function OwnerSection({
  locale,
  dict,
  owner,
}: {
  locale: Locale;
  dict: Dictionary;
  owner: Owner;
}) {
  return (
    <section className="py-20 sm:py-24">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,340px)_1fr]">
        <ImageReveal className="relative mx-auto aspect-square w-full max-w-[340px] rounded-full shadow-xl ring-4 ring-mint/40">
          <Image
            src={owner.image}
            alt={owner.name}
            fill
            sizes="340px"
            className="rounded-full object-cover"
            style={{ objectPosition: owner.imagePosition }}
          />
        </ImageReveal>

        <ScrollReveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-ocean">
            {dict.owner.eyebrow}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
            {dict.owner.heading}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-dark/70">
            {localize(owner.bio, locale)}
          </p>
          <div className="mt-6 flex items-center gap-4">
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">{owner.name}</h3>
              <p className="mt-1 text-sm font-medium uppercase tracking-wide text-dark/50">{owner.role}</p>
            </div>
            {owner.instagram && (
              <a
                href={owner.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-dark/10 text-dark/70 transition-colors hover:border-aqua hover:text-ocean"
              >
                <Icon name="instagram" className="h-4 w-4" />
              </a>
            )}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
