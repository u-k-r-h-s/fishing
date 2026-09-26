import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { createStaticClient } from "@/lib/supabase/static";
import { localizedField, localizedFieldOptional, logDataError } from "@/lib/data/shared";
import type { Fish } from "@/data/fish";
import type { Database } from "@/lib/supabase/database.types";

type FishRow = Database["public"]["Tables"]["fish"]["Row"];

function mapRow(row: FishRow): Fish {
  return {
    id: row.slug,
    name: localizedField(row.name_en, row.name_hi),
    image: row.image_url || "/images/fish/placeholder.svg",
    description: localizedField(row.short_description_en, row.short_description_hi),
    longDescription: localizedField(row.description_en, row.description_hi),
    price: row.price_unit ? `₹${row.price}/${row.price_unit}` : `₹${row.price}`,
    available: row.availability,
    featured: row.featured,
    freshnessNote: localizedField(row.freshness_note_en, row.freshness_note_hi),
    seoTitle: localizedFieldOptional(row.seo_title_en, row.seo_title_hi),
    seoDescription: localizedFieldOptional(row.seo_description_en, row.seo_description_hi),
  };
}

/** All fish visible to the public (RLS already hides unavailable rows from anon, but we don't rely on that alone). */
export const getFish = cache(async (): Promise<Fish[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("fish")
    .select("*")
    .eq("availability", true)
    .order("display_order", { ascending: true });

  if (error) {
    logDataError("fish.getFish", error);
    return [];
  }
  return (data ?? []).map(mapRow);
});

export async function getFeaturedFish(): Promise<Fish[]> {
  const fish = await getFish();
  return fish.filter((item) => item.featured);
}

export const getFishBySlug = cache(async (slug: string): Promise<Fish | null> => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("fish").select("*").eq("slug", slug).maybeSingle();

  if (error) {
    logDataError("fish.getFishBySlug", error);
    return null;
  }
  if (!data || !data.availability) return null;
  return mapRow(data);
});

/**
 * Every fish slug — used by generateStaticParams, which runs at build time
 * with no HTTP request (so the cookie-based client from server.ts can't be
 * used here). Falls back to an empty list so a build never hard-fails for
 * this alone; any slug missed here still renders fine on-demand at request
 * time via the page's own dynamic rendering.
 */
export async function getAllFishSlugs(): Promise<string[]> {
  try {
    const supabase = createStaticClient();
    const { data, error } = await supabase.from("fish").select("slug").eq("availability", true);

    if (error) {
      logDataError("fish.getAllFishSlugs", error);
      return [];
    }
    return (data ?? []).map((row) => row.slug);
  } catch (error) {
    logDataError("fish.getAllFishSlugs", error);
    return [];
  }
}

// ================================================================
// Admin (authenticated + is_admin() via RLS enforces the real
// boundary — these just add the extra rows/columns admins need).
// ================================================================

export type AdminFishRow = FishRow;

export async function adminListFish(): Promise<AdminFishRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("fish")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    logDataError("fish.adminListFish", error);
    return [];
  }
  return data ?? [];
}

export async function adminGetFish(id: string): Promise<AdminFishRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("fish").select("*").eq("id", id).maybeSingle();

  if (error) {
    logDataError("fish.adminGetFish", error);
    return null;
  }
  return data;
}

export async function adminUpsertFish(
  values: Database["public"]["Tables"]["fish"]["Insert"] & { id?: string }
): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase.from("fish").upsert(values);

  if (error) {
    logDataError("fish.adminUpsertFish", error);
    return { error: error.message };
  }
  return { error: null };
}

export async function adminDeleteFish(id: string): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase.from("fish").delete().eq("id", id);

  if (error) {
    logDataError("fish.adminDeleteFish", error);
    return { error: error.message };
  }
  return { error: null };
}
