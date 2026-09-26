import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/locales";

/**
 * Next's generated route types widen the `[locale]` segment to a plain
 * `string`, so every page/layout under `[locale]` receives
 * `params: Promise<{ locale: string }>`. This narrows it to our `Locale`
 * union, 404-ing for any value outside `locales` (should only happen for
 * an unlisted/invalid segment, since generateStaticParams only emits the
 * real locales).
 */
export function requireLocale(value: string): Locale {
  if (!isLocale(value)) {
    notFound();
  }
  return value;
}
