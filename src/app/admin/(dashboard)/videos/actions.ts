"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminUpsertVideo, adminDeleteVideo } from "@/lib/data/videos";

export interface VideoFormState {
  error: string | null;
}

export async function saveVideoAction(
  _prevState: VideoFormState,
  formData: FormData
): Promise<VideoFormState> {
  const id = String(formData.get("id") ?? "").trim();
  const titleEn = String(formData.get("title_en") ?? "").trim();
  const videoUrl = String(formData.get("video_url") ?? "").trim();

  if (!titleEn) return { error: "English title is required." };
  if (!videoUrl) return { error: "A video URL (uploaded or external) is required." };

  const { error } = await adminUpsertVideo({
    ...(id ? { id } : {}),
    title_en: titleEn,
    title_hi: String(formData.get("title_hi") ?? ""),
    description_en: String(formData.get("description_en") ?? ""),
    description_hi: String(formData.get("description_hi") ?? ""),
    video_url: videoUrl,
    poster_url: String(formData.get("poster_url") ?? ""),
    video_type: videoUrl.includes("supabase.co") ? "uploaded" : "external",
    active: formData.get("active") === "on",
    featured: formData.get("featured") === "on",
    display_order: Number.parseInt(String(formData.get("display_order") ?? "0"), 10) || 0,
  });

  if (error) return { error };

  revalidatePath("/", "layout");
  redirect("/admin/videos");
}

export async function deleteVideoAction(id: string) {
  const result = await adminDeleteVideo(id);
  if (!result.error) revalidatePath("/", "layout");
  return result;
}
