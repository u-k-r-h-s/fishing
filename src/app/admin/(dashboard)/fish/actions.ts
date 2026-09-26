"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminUpsertFish, adminDeleteFish } from "@/lib/data/fish";

export interface FishFormState {
  error: string | null;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const MIN_GALLERY_IMAGES = 4;

function parseGalleryJson(formData: FormData): string[] {
  try {
    const raw = String(formData.get("gallery_json") ?? "[]");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((url): url is string => typeof url === "string" && url.length > 0) : [];
  } catch {
    return [];
  }
}

export async function saveFishAction(
  _prevState: FishFormState,
  formData: FormData
): Promise<FishFormState> {
  const id = String(formData.get("id") ?? "").trim();
  const nameEn = String(formData.get("name_en") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();

  if (!nameEn) {
    return { error: "English name is required." };
  }

  const slug = slugify(slugInput || nameEn);
  if (!slug) {
    return { error: "Couldn't derive a valid URL slug from that name." };
  }

  const price = Number.parseFloat(String(formData.get("price") ?? "0"));
  const weight = String(formData.get("weight") ?? "").trim();
  if (!weight) {
    return { error: "Weight is required." };
  }

  const gallery = parseGalleryJson(formData);
  if (gallery.length < MIN_GALLERY_IMAGES) {
    return { error: `Please upload at least ${MIN_GALLERY_IMAGES} photos (${gallery.length}/${MIN_GALLERY_IMAGES} so far).` };
  }

  const { error } = await adminUpsertFish({
    ...(id ? { id } : {}),
    slug,
    name_en: nameEn,
    name_hi: String(formData.get("name_hi") ?? ""),
    short_description_en: String(formData.get("short_description_en") ?? ""),
    short_description_hi: String(formData.get("short_description_hi") ?? ""),
    description_en: String(formData.get("description_en") ?? ""),
    description_hi: String(formData.get("description_hi") ?? ""),
    freshness_note_en: String(formData.get("freshness_note_en") ?? ""),
    freshness_note_hi: String(formData.get("freshness_note_hi") ?? ""),
    price: Number.isFinite(price) ? price : 0,
    price_unit: String(formData.get("price_unit") ?? "kg"),
    weight,
    image_url: String(formData.get("image_url") ?? ""),
    gallery,
    availability: formData.get("availability") === "on",
    featured: formData.get("featured") === "on",
    display_order: Number.parseInt(String(formData.get("display_order") ?? "0"), 10) || 0,
    seo_title_en: String(formData.get("seo_title_en") ?? ""),
    seo_title_hi: String(formData.get("seo_title_hi") ?? ""),
    seo_description_en: String(formData.get("seo_description_en") ?? ""),
    seo_description_hi: String(formData.get("seo_description_hi") ?? ""),
  });

  if (error) {
    return { error };
  }

  revalidatePath("/", "layout");
  redirect("/admin/fish");
}

export async function deleteFishAction(id: string) {
  const result = await adminDeleteFish(id);
  if (!result.error) {
    revalidatePath("/", "layout");
  }
  return result;
}
