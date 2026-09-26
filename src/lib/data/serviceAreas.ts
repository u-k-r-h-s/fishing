import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { localizedField, logDataError } from "@/lib/data/shared";
import type { Localized } from "@/i18n/types";
import type { Database } from "@/lib/supabase/database.types";

type ServiceAreaRow = Database["public"]["Tables"]["service_areas"]["Row"];

export const getServiceAreas = cache(async (): Promise<Localized<string>[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("service_areas")
    .select("*")
    .eq("active", true)
    .order("display_order", { ascending: true });

  if (error) {
    logDataError("serviceAreas.getServiceAreas", error);
    return [];
  }
  return (data ?? []).map((row) => localizedField(row.name_en, row.name_hi));
});

// ================================================================
// Admin
// ================================================================
export type AdminServiceAreaRow = ServiceAreaRow;

export async function adminListServiceAreas(): Promise<AdminServiceAreaRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("service_areas")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) {
    logDataError("serviceAreas.adminListServiceAreas", error);
    return [];
  }
  return data ?? [];
}

export async function adminGetServiceArea(id: string): Promise<AdminServiceAreaRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("service_areas").select("*").eq("id", id).maybeSingle();
  if (error) {
    logDataError("serviceAreas.adminGetServiceArea", error);
    return null;
  }
  return data;
}

export async function adminUpsertServiceArea(
  values: Database["public"]["Tables"]["service_areas"]["Insert"] & { id?: string }
): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase.from("service_areas").upsert(values);
  if (error) {
    logDataError("serviceAreas.adminUpsertServiceArea", error);
    return { error: error.message };
  }
  return { error: null };
}

export async function adminDeleteServiceArea(id: string): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase.from("service_areas").delete().eq("id", id);
  if (error) {
    logDataError("serviceAreas.adminDeleteServiceArea", error);
    return { error: error.message };
  }
  return { error: null };
}
