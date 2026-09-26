import "server-only";
import { createClient } from "@/lib/supabase/server";
import { localizedField, logDataError } from "@/lib/data/shared";
import type { SocialPost } from "@/data/social";
import type { Database } from "@/lib/supabase/database.types";

type ReelRow = Database["public"]["Tables"]["reels"]["Row"];

function mapRow(row: ReelRow): SocialPost {
  return {
    id: row.id,
    platform: row.platform,
    title: localizedField(row.title_en, row.title_hi),
    caption: localizedField(row.caption_en, row.caption_hi),
    video: row.video_url,
    thumbnail: row.thumbnail_url || "/images/social/placeholder.svg",
    url: row.social_url || "",
  };
}

export async function getReels(): Promise<SocialPost[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reels")
    .select("*")
    .eq("active", true)
    .order("display_order", { ascending: true });

  if (error) {
    logDataError("social.getReels", error);
    return [];
  }
  return (data ?? []).map(mapRow);
}

// ================================================================
// Admin
// ================================================================
export type AdminReelRow = ReelRow;

export async function adminListReels(): Promise<AdminReelRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reels")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) {
    logDataError("social.adminListReels", error);
    return [];
  }
  return data ?? [];
}

export async function adminGetReel(id: string): Promise<AdminReelRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("reels").select("*").eq("id", id).maybeSingle();
  if (error) {
    logDataError("social.adminGetReel", error);
    return null;
  }
  return data;
}

export async function adminUpsertReel(
  values: Database["public"]["Tables"]["reels"]["Insert"] & { id?: string }
): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase.from("reels").upsert(values);
  if (error) {
    logDataError("social.adminUpsertReel", error);
    return { error: error.message };
  }
  return { error: null };
}

export async function adminDeleteReel(id: string): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase.from("reels").delete().eq("id", id);
  if (error) {
    logDataError("social.adminDeleteReel", error);
    return { error: error.message };
  }
  return { error: null };
}
