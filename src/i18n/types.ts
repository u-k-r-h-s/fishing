import type { Locale } from "./locales";

/** A piece of business content authored in both languages, e.g. a fish name or description. */
export type Localized<T = string> = Record<Locale, T>;

/** Picks the value for the current locale out of a Localized field. */
export function localize<T>(value: Localized<T>, locale: Locale): T {
  return value[locale] ?? value.en;
}
