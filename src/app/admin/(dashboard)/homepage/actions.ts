"use server";

import { revalidatePath } from "next/cache";
import { adminUpsertHomepageContent } from "@/lib/data/homepage";

export interface HomepageSectionState {
  error: string | null;
  success: boolean;
}

function localized(formData: FormData, key: string) {
  return {
    en: String(formData.get(`${key}_en`) ?? ""),
    hi: String(formData.get(`${key}_hi`) ?? ""),
  };
}

function parseJsonList(formData: FormData, field: string): unknown[] {
  try {
    const raw = String(formData.get(field) ?? "[]");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveHeroSectionAction(
  _prevState: HomepageSectionState,
  formData: FormData
): Promise<HomepageSectionState> {
  const { error } = await adminUpsertHomepageContent("hero", {
    eyebrow: localized(formData, "eyebrow"),
    headline_line1: localized(formData, "headline_line1"),
    headline_line2: localized(formData, "headline_line2"),
    subheading: localized(formData, "subheading"),
    cta_primary_label: localized(formData, "cta_primary_label"),
    cta_secondary_label: localized(formData, "cta_secondary_label"),
  });
  if (error) return { error, success: false };
  revalidatePath("/", "layout");
  return { error: null, success: true };
}

export async function saveFreshnessPromiseSectionAction(
  _prevState: HomepageSectionState,
  formData: FormData
): Promise<HomepageSectionState> {
  const { error } = await adminUpsertHomepageContent("freshness_promise", {
    eyebrow: localized(formData, "eyebrow"),
    heading: localized(formData, "heading"),
    statement: localized(formData, "statement"),
  });
  if (error) return { error, success: false };
  revalidatePath("/", "layout");
  return { error: null, success: true };
}

export async function saveProcessSectionAction(
  _prevState: HomepageSectionState,
  formData: FormData
): Promise<HomepageSectionState> {
  const { error } = await adminUpsertHomepageContent("process", {
    eyebrow: localized(formData, "eyebrow"),
    heading: localized(formData, "heading"),
    description: localized(formData, "description"),
    steps: parseJsonList(formData, "steps_json"),
  });
  if (error) return { error, success: false };
  revalidatePath("/", "layout");
  return { error: null, success: true };
}

export async function saveAboutSectionAction(
  _prevState: HomepageSectionState,
  formData: FormData
): Promise<HomepageSectionState> {
  const paragraphs = parseJsonList(formData, "paragraphs_json") as Array<{ en: string; hi: string }>;

  const { error } = await adminUpsertHomepageContent("about", {
    heading: localized(formData, "heading"),
    paragraphs: {
      en: paragraphs.map((p) => p.en).filter(Boolean),
      hi: paragraphs.map((p) => p.hi).filter(Boolean),
    },
    image_url: String(formData.get("image_url") ?? ""),
    image_alt: String(formData.get("image_alt") ?? ""),
  });
  if (error) return { error, success: false };
  revalidatePath("/", "layout");
  return { error: null, success: true };
}

export async function saveWhyChooseUsSectionAction(
  _prevState: HomepageSectionState,
  formData: FormData
): Promise<HomepageSectionState> {
  const { error } = await adminUpsertHomepageContent("why_choose_us", {
    eyebrow: localized(formData, "eyebrow"),
    heading: localized(formData, "heading"),
    items: parseJsonList(formData, "items_json"),
  });
  if (error) return { error, success: false };
  revalidatePath("/", "layout");
  return { error: null, success: true };
}

export async function saveFinalCtaSectionAction(
  _prevState: HomepageSectionState,
  formData: FormData
): Promise<HomepageSectionState> {
  const { error } = await adminUpsertHomepageContent("final_cta", {
    heading: localized(formData, "heading"),
    description: localized(formData, "description"),
  });
  if (error) return { error, success: false };
  revalidatePath("/", "layout");
  return { error: null, success: true };
}
