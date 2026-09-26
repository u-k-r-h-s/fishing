import type { MetadataRoute } from "next";
import { getSiteUrl, localizedPath } from "@/lib/utils";
import { locales, localeTags } from "@/i18n/locales";
import { getAllFishSlugs } from "@/lib/data/fish";

function languageAlternates(path: string) {
  const base = getSiteUrl().replace(/\/$/, "");
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[localeTags[locale]] = `${base}${localizedPath(locale, path)}`;
  }
  return languages;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl().replace(/\/$/, "");
  const now = new Date();
  const fishSlugs = await getAllFishSlugs();

  const staticPaths: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }> = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/fresh-fish", changeFrequency: "daily", priority: 0.9 },
    { path: "/offers", changeFrequency: "weekly", priority: 0.7 },
    { path: "/about", changeFrequency: "monthly", priority: 0.5 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const { path, changeFrequency, priority } of staticPaths) {
      entries.push({
        url: `${base}${localizedPath(locale, path)}`,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: { languages: languageAlternates(path) },
      });
    }

    for (const slug of fishSlugs) {
      const path = `/fresh-fish/${slug}`;
      entries.push({
        url: `${base}${localizedPath(locale, path)}`,
        lastModified: now,
        changeFrequency: "daily",
        priority: 0.8,
        alternates: { languages: languageAlternates(path) },
      });
    }
  }

  return entries;
}
