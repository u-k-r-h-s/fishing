"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminUpsertReel, adminDeleteReel } from "@/lib/data/social";

export interface ReelFormState {
  error: string | null;
}

const PLATFORMS = ["instagram", "facebook", "youtube"] as const;

export async function saveReelAction(
  _prevState: ReelFormState,
  formData: FormData
): Promise<ReelFormState> {
  const id = String(formData.get("id") ?? "").trim();
  const titleEn = String(formData.get("title_en") ?? "").trim();
  const videoUrl = String(formData.get("video_url") ?? "").trim();

  if (!titleEn) return { error: "English title is required." };
  if (!videoUrl) return { error: "A video URL is required." };

  const platformInput = String(formData.get("platform") ?? "instagram");
  const platform = (PLATFORMS as readonly string[]).includes(platformInput)
    ? (platformInput as (typeof PLATFORMS)[number])
    : "instagram";

  const { error } = await adminUpsertReel({
    ...(id ? { id } : {}),
    title_en: titleEn,
    title_hi: String(formData.get("title_hi") ?? ""),
    caption_en: String(formData.get("caption_en") ?? ""),
    caption_hi: String(formData.get("caption_hi") ?? ""),
    video_url: videoUrl,
    thumbnail_url: String(formData.get("thumbnail_url") ?? ""),
    platform,
    social_url: String(formData.get("social_url") ?? ""),
    active: formData.get("active") === "on",
    display_order: Number.parseInt(String(formData.get("display_order") ?? "0"), 10) || 0,
  });

  if (error) return { error };

  revalidatePath("/", "layout");
  redirect("/admin/reels");
}

export async function deleteReelAction(id: string) {
  const result = await adminDeleteReel(id);
  if (!result.error) revalidatePath("/", "layout");
  return result;
}
