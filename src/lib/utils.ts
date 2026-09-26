/** Joins class names, filtering out falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Absolute site URL, used for canonical links, sitemap, and structured data. */
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://oceanfresh-fish.example.com";
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl().replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
