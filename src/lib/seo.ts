import type { Metadata } from "next";
import type { Fish } from "@/data/fish";
import { absoluteUrl, localizedPath } from "@/lib/utils";
import { locales, localeTags, type Locale } from "@/i18n/locales";
import { localize } from "@/i18n/types";
import { getDictionary, tf } from "@/i18n/getDictionary";

/** Builds the `alternates.languages` map (+ x-default) for a locale-agnostic path. */
function buildLanguageAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[localeTags[locale]] = absoluteUrl(localizedPath(locale, path));
  }
  languages["x-default"] = absoluteUrl(localizedPath("en", path));
  return languages;
}

export function buildMetadata(options: {
  locale: Locale;
  siteName: string;
  title: string;
  description: string;
  /** Locale-agnostic path, e.g. "/fresh-fish" (no /{locale} prefix) */
  path: string;
  image?: string;
}): Metadata {
  const { locale, siteName, title, description, path, image } = options;
  const url = absoluteUrl(localizedPath(locale, path));
  const ogImage = image ? absoluteUrl(image) : absoluteUrl("/images/hero/hero-fish.svg");

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      images: [{ url: ogImage }],
      type: "website",
      locale: localeTags[locale],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function buildFishMetadata(
  locale: Locale,
  item: Fish,
  business: { name: string; phoneDisplay: string }
): Metadata {
  // Plain segment title — the locale layout's title template appends
  // " | {site name}" automatically, so it isn't repeated here.
  const dict = getDictionary(locale);
  const name = localize(item.name, locale);
  const title = item.seoTitle ? localize(item.seoTitle, locale) : tf(dict.fishDetail.freshPrefix, { name });
  const description = item.seoDescription
    ? localize(item.seoDescription, locale)
    : tf(dict.fishDetail.metaDescription, {
        description: localize(item.description, locale),
        price: item.price,
        name,
        phone: business.phoneDisplay,
      });

  return buildMetadata({
    locale,
    siteName: business.name,
    title,
    description,
    path: `/fresh-fish/${item.id}`,
    image: item.image,
  });
}
