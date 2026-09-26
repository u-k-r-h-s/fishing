import type { Localized } from "@/i18n/types";

/** Builds a Localized<string>, falling back to English when Hindi hasn't been filled in yet. */
export function localizedField(en: string, hi: string | null | undefined): Localized<string> {
  return { en, hi: hi && hi.trim().length > 0 ? hi : en };
}

/** Same as localizedField, for string[] (e.g. About page paragraphs). */
export function localizedArray(en: string[], hi: string[] | null | undefined): Localized<string[]> {
  return { en, hi: hi && hi.length > 0 ? hi : en };
}

/** Optional variant — returns undefined when the English source is empty (e.g. seoTitle overrides). */
export function localizedFieldOptional(
  en: string | null | undefined,
  hi: string | null | undefined
): Localized<string> | undefined {
  if (!en || en.trim().length === 0) return undefined;
  return localizedField(en, hi);
}

/**
 * Logs the error server-side and returns a fallback instead of throwing, so
 * one missing/broken CMS record never takes down a whole page. Never expose
 * `error` details to the client — this only reaches server logs.
 */
export function logDataError(context: string, error: unknown): void {
  console.error(`[data:${context}]`, error);
}
