import "server-only";
import { createClient } from "@/lib/supabase/server";
import { localizedField, logDataError } from "@/lib/data/shared";
import type { VideoItem } from "@/data/videos";
import type { Database } from "@/lib/supabase/database.types";

type VideoRow = Database["public"]["Tables"]["videos"]["Row"];

function mapRow(row: VideoRow): VideoItem {
  return {
    id: row.id,
    title: localizedField(row.title_en, row.title_hi),
    description: localizedField(row.description_en, row.description_hi),
    video: row.video_url,
    poster: row.poster_url || "/images/videos/placeholder.svg",
    featured: row.featured,
  };
}

export async function getVideos(): Promise<VideoItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .eq("active", true)
    .order("display_order", { ascending: true });

  if (error) {
    logDataError("videos.getVideos", error);
    return [];
  }
  return (data ?? []).map(mapRow);
}

export async function getFeaturedVideo(): Promise<VideoItem | null> {
  const videos = await getVideos();
  return videos.find((v) => v.featured) ?? videos[0] ?? null;
}

export async function getSupportingVideos(): Promise<VideoItem[]> {
  const videos = await getVideos();
  const featured = videos.find((v) => v.featured) ?? videos[0];
  return videos.filter((v) => v.id !== featured?.id);
}

// ================================================================
// Admin
// ================================================================
export type AdminVideoRow = VideoRow;

export async function adminListVideos(): Promise<AdminVideoRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) {
    logDataError("videos.adminListVideos", error);
    return [];
  }
  return data ?? [];
}

export async function adminGetVideo(id: string): Promise<AdminVideoRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("videos").select("*").eq("id", id).maybeSingle();
  if (error) {
    logDataError("videos.adminGetVideo", error);
    return null;
  }
  return data;
}

export async function adminUpsertVideo(
  values: Database["public"]["Tables"]["videos"]["Insert"] & { id?: string }
): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase.from("videos").upsert(values);
  if (error) {
    logDataError("videos.adminUpsertVideo", error);
    return { error: error.message };
  }
  return { error: null };
}

export async function adminDeleteVideo(id: string): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase.from("videos").delete().eq("id", id);
  if (error) {
    logDataError("videos.adminDeleteVideo", error);
    return { error: error.message };
  }
  return { error: null };
}
