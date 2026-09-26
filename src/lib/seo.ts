import type { Metadata } from "next";
import { business } from "@/data/business";
import type { Fish } from "@/data/fish";
import { absoluteUrl } from "@/lib/utils";

const SITE_NAME = business.name;

export function buildMetadata(options: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const { title, description, path, image } = options;
  const url = absoluteUrl(path);
  const ogImage = image ? absoluteUrl(image) : absoluteUrl("/images/hero/hero-fish.svg");

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: ogImage }],
      type: "website",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function buildFishMetadata(item: Fish): Metadata {
  // Plain segment title — the root layout's title template appends
  // " | {site name}" automatically, so it isn't repeated here.
  const title = item.seoTitle ?? `Fresh ${item.name}`;
  const description =
    item.seoDescription ??
    `${item.description} Available at ${item.price}. Order fresh ${item.name} today via WhatsApp or call ${business.phoneDisplay}.`;

  return buildMetadata({
    title,
    description,
    path: `/fresh-fish/${item.id}`,
    image: item.image,
  });
}
