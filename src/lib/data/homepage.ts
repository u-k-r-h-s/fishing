import "server-only";
import { createClient } from "@/lib/supabase/server";
import { logDataError } from "@/lib/data/shared";
import type { Localized } from "@/i18n/types";
import type { AboutContent, WhyChooseUsItem, ProcessStep, FreshnessPromiseContent } from "@/data/content";
import type { Database } from "@/lib/supabase/database.types";

type HomepageContentRow = Database["public"]["Tables"]["homepage_content"]["Row"];

const EMPTY: Localized<string> = { en: "", hi: "" };

/** Reads a `{en, hi}`-shaped value out of an untyped jsonb blob, tolerating a missing/malformed key. */
function readLocalized(source: unknown, key: string): Localized<string> {
  if (!source || typeof source !== "object") return EMPTY;
  const value = (source as Record<string, unknown>)[key];
  if (!value || typeof value !== "object") return EMPTY;
  const { en, hi } = value as Record<string, unknown>;
  return {
    en: typeof en === "string" ? en : "",
    hi: typeof hi === "string" ? hi : typeof en === "string" ? en : "",
  };
}

function readLocalizedArray(source: unknown, key: string): Localized<string[]> {
  if (!source || typeof source !== "object") return { en: [], hi: [] };
  const value = (source as Record<string, unknown>)[key];
  if (!value || typeof value !== "object") return { en: [], hi: [] };
  const { en, hi } = value as Record<string, unknown>;
  const enArr = Array.isArray(en) ? en.filter((v): v is string => typeof v === "string") : [];
  const hiArr = Array.isArray(hi) ? hi.filter((v): v is string => typeof v === "string") : [];
  return { en: enArr, hi: hiArr.length > 0 ? hiArr : enArr };
}

function readString(source: unknown, key: string, fallback = ""): string {
  if (!source || typeof source !== "object") return fallback;
  const value = (source as Record<string, unknown>)[key];
  return typeof value === "string" ? value : fallback;
}

async function getSection(key: string): Promise<unknown> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("homepage_content")
    .select("content")
    .eq("section_key", key)
    .maybeSingle();

  if (error) {
    logDataError(`homepage.getSection(${key})`, error);
    return null;
  }
  return data?.content ?? null;
}

export interface HeroContent {
  eyebrow: Localized<string>;
  headlineLine1: Localized<string>;
  headlineLine2: Localized<string>;
  subheading: Localized<string>;
  ctaPrimaryLabel: Localized<string>;
  ctaSecondaryLabel: Localized<string>;
}

export async function getHeroContent(): Promise<HeroContent> {
  const content = await getSection("hero");
  return {
    eyebrow: readLocalized(content, "eyebrow"),
    headlineLine1: readLocalized(content, "headline_line1"),
    headlineLine2: readLocalized(content, "headline_line2"),
    subheading: readLocalized(content, "subheading"),
    ctaPrimaryLabel: readLocalized(content, "cta_primary_label"),
    ctaSecondaryLabel: readLocalized(content, "cta_secondary_label"),
  };
}

export interface FreshnessPromiseFull extends FreshnessPromiseContent {
  eyebrow: Localized<string>;
  heading: Localized<string>;
}

export async function getFreshnessPromiseContent(): Promise<FreshnessPromiseFull> {
  const content = await getSection("freshness_promise");
  return {
    eyebrow: readLocalized(content, "eyebrow"),
    heading: readLocalized(content, "heading"),
    statement: readLocalized(content, "statement"),
  };
}

export interface ProcessContent {
  eyebrow: Localized<string>;
  heading: Localized<string>;
  description: Localized<string>;
  steps: ProcessStep[];
}

export async function getProcessContent(): Promise<ProcessContent> {
  const content = await getSection("process");
  const rawSteps =
    content && typeof content === "object" && Array.isArray((content as Record<string, unknown>).steps)
      ? ((content as Record<string, unknown>).steps as unknown[])
      : [];

  const steps: ProcessStep[] = rawSteps.map((step, index) => ({
    id: `step-${index}`,
    icon: (readString(step, "icon", "selected") as ProcessStep["icon"]) ?? "selected",
    title: readLocalized(step, "title"),
    description: readLocalized(step, "description"),
  }));

  return {
    eyebrow: readLocalized(content, "eyebrow"),
    heading: readLocalized(content, "heading"),
    description: readLocalized(content, "description"),
    steps,
  };
}

export async function getAboutContent(): Promise<AboutContent> {
  const content = await getSection("about");
  return {
    heading: readLocalized(content, "heading"),
    paragraphs: readLocalizedArray(content, "paragraphs"),
    image: readString(content, "image_url", "/images/about/placeholder.svg"),
    imageAlt: readString(content, "image_alt", "Fresh fish being prepared"),
  };
}

export interface WhyChooseUsContent {
  eyebrow: Localized<string>;
  heading: Localized<string>;
  items: WhyChooseUsItem[];
}

export async function getWhyChooseUsContent(): Promise<WhyChooseUsContent> {
  const content = await getSection("why_choose_us");
  const rawItems =
    content && typeof content === "object" && Array.isArray((content as Record<string, unknown>).items)
      ? ((content as Record<string, unknown>).items as unknown[])
      : [];

  const items: WhyChooseUsItem[] = rawItems.map((item, index) => ({
    id: `item-${index}`,
    icon: (readString(item, "icon", "fresh") as WhyChooseUsItem["icon"]) ?? "fresh",
    title: readLocalized(item, "title"),
    description: readLocalized(item, "description"),
  }));

  return {
    eyebrow: readLocalized(content, "eyebrow"),
    heading: readLocalized(content, "heading"),
    items,
  };
}

export interface FinalCtaContent {
  heading: Localized<string>;
  description: Localized<string>;
}

export async function getFinalCtaContent(): Promise<FinalCtaContent> {
  const content = await getSection("final_cta");
  return {
    heading: readLocalized(content, "heading"),
    description: readLocalized(content, "description"),
  };
}

// ================================================================
// Admin
// ================================================================
export type AdminHomepageContentRow = HomepageContentRow;

export async function adminListHomepageContent(): Promise<AdminHomepageContentRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("homepage_content").select("*").order("section_key");
  if (error) {
    logDataError("homepage.adminListHomepageContent", error);
    return [];
  }
  return data ?? [];
}

export async function adminUpsertHomepageContent(
  sectionKey: string,
  content: Record<string, unknown>
): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("homepage_content")
    .upsert({ section_key: sectionKey, content: content as Database["public"]["Tables"]["homepage_content"]["Row"]["content"] }, { onConflict: "section_key" });
  if (error) {
    logDataError("homepage.adminUpsertHomepageContent", error);
    return { error: error.message };
  }
  return { error: null };
}
