import type { Locale } from "./locales";
import en, { type Dictionary } from "./dictionaries/en";
import hi from "./dictionaries/hi";

const dictionaries: Record<Locale, Dictionary> = { en, hi };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}

export type { Dictionary };

/** Replaces `{key}` placeholders in a dictionary string, e.g. tf(d.common.whatsappAbout, { name: "Rohu" }). */
export function tf(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => values[key] ?? match);
}
