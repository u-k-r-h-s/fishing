"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SocialPhoneMockup } from "@/components/social/SocialPhoneMockup";
import { Icon } from "@/components/shared/Icon";
import { cn } from "@/lib/utils";
import { tf } from "@/i18n/getDictionary";
import { localize } from "@/i18n/types";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/getDictionary";
import type { SocialPost } from "@/data/social";

export function SocialShowcaseSection({
  locale,
  dict,
  posts,
}: {
  locale: Locale;
  dict: Dictionary;
  posts: SocialPost[];
}) {
  const [activeId, setActiveId] = useState(posts[0]?.id);
  const active = posts.find((p) => p.id === activeId) ?? posts[0];

  if (!active) return null;

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow={dict.social.eyebrow}
            title={dict.social.heading}
            description={dict.social.description}
            align="center"
          />
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_auto_1fr]">
          <div className="order-2 hidden flex-col gap-3 lg:order-1 lg:flex">
            {posts.slice(0, Math.ceil(posts.length / 2)).map((post) => (
              <ReelThumb
                key={post.id}
                post={post}
                active={post.id === active.id}
                locale={locale}
                onSelect={() => setActiveId(post.id)}
              />
            ))}
          </div>

          <ScrollReveal className="order-1 lg:order-2">
            <SocialPhoneMockup post={active} locale={locale} dict={dict} />
          </ScrollReveal>

          <div className="order-3 flex flex-row gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {posts.slice(Math.ceil(posts.length / 2)).map((post) => (
              <ReelThumb
                key={post.id}
                post={post}
                active={post.id === active.id}
                locale={locale}
                onSelect={() => setActiveId(post.id)}
              />
            ))}
          </div>
        </div>

        {active.url && (
          <p className="mt-8 text-center">
            <a
              href={active.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ocean hover:text-navy"
            >
              <Icon name="instagram" className="h-4 w-4" />
              {tf(dict.social.viewOn, { platform: "Instagram" })}
            </a>
          </p>
        )}
      </Container>
    </section>
  );
}

function ReelThumb({
  post,
  active,
  locale,
  onSelect,
}: {
  post: SocialPost;
  active: boolean;
  locale: Locale;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      aria-label={localize(post.title, locale)}
      className={cn(
        "relative aspect-[9/16] w-24 shrink-0 overflow-hidden rounded-xl ring-2 ring-transparent transition-all sm:w-28 lg:w-32",
        active ? "ring-aqua" : "opacity-60 hover:opacity-100"
      )}
    >
      <Image src={post.thumbnail} alt={localize(post.title, locale)} fill sizes="128px" className="object-cover" />
      <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-navy/70 text-offwhite">
        <Icon name={post.platform} className="h-3 w-3" />
      </span>
    </button>
  );
}
