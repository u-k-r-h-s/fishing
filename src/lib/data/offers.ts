import "server-only";
import { createClient } from "@/lib/supabase/server";
import { localizedField, logDataError } from "@/lib/data/shared";
import type { Offer } from "@/data/offers";
import type { Database } from "@/lib/supabase/database.types";

type OfferRow = Database["public"]["Tables"]["offers"]["Row"];

function mapRow(row: OfferRow): Offer {
  return {
    id: row.id,
    title: localizedField(row.title_en, row.title_hi),
    description: localizedField(row.description_en, row.description_hi),
    badge:
      row.discount_text_en || row.discount_text_hi
        ? localizedField(row.discount_text_en, row.discount_text_hi)
        : undefined,
    image: row.image_url || undefined,
    active: row.active,
  };
}

export async function getActiveOffers(): Promise<Offer[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("offers")
    .select("*")
    .eq("active", true)
    .order("display_order", { ascending: true });

  if (error) {
    logDataError("offers.getActiveOffers", error);
    return [];
  }
  return (data ?? []).map(mapRow);
}

// ================================================================
// Admin
// ================================================================
export type AdminOfferRow = OfferRow;

export async function adminListOffers(): Promise<AdminOfferRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("offers")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    logDataError("offers.adminListOffers", error);
    return [];
  }
  return data ?? [];
}

export async function adminGetOffer(id: string): Promise<AdminOfferRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("offers").select("*").eq("id", id).maybeSingle();
  if (error) {
    logDataError("offers.adminGetOffer", error);
    return null;
  }
  return data;
}

export async function adminUpsertOffer(
  values: Database["public"]["Tables"]["offers"]["Insert"] & { id?: string }
): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase.from("offers").upsert(values);
  if (error) {
    logDataError("offers.adminUpsertOffer", error);
    return { error: error.message };
  }
  return { error: null };
}

export async function adminDeleteOffer(id: string): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase.from("offers").delete().eq("id", id);
  if (error) {
    logDataError("offers.adminDeleteOffer", error);
    return { error: error.message };
  }
  return { error: null };
}
