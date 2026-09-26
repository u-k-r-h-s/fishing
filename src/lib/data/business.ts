import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { localizedField, logDataError } from "@/lib/data/shared";
import { getOwner } from "@/lib/data/owner";
import type { BusinessConfig, OpeningHoursEntry } from "@/data/business";
import type { Database } from "@/lib/supabase/database.types";

type BusinessSettingsRow = Database["public"]["Tables"]["business_settings"]["Row"];

const FALLBACK: Omit<BusinessConfig, "owner"> = {
  name: "OceanFresh Fish",
  logo: "",
  tagline: { en: "", hi: "" },
  description: { en: "", hi: "" },
  phone: "",
  phoneDisplay: "",
  whatsapp: "",
  email: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  googleMaps: "",
  instagram: "",
  facebook: "",
  youtube: "",
  openingHours: [],
  currency: "₹",
  founded: "",
};

function mapRow(row: BusinessSettingsRow): Omit<BusinessConfig, "owner"> {
  return {
    name: row.business_name,
    logo: row.logo_url || "",
    tagline: localizedField(row.tagline_en, row.tagline_hi),
    description: localizedField(row.description_en, row.description_hi),
    phone: row.phone,
    phoneDisplay: row.phone,
    whatsapp: row.whatsapp_number,
    email: row.email,
    address: row.address,
    city: row.city,
    state: row.state,
    postalCode: row.postal_code,
    country: row.country,
    googleMaps: row.google_maps_url,
    instagram: row.instagram_url,
    facebook: row.facebook_url,
    youtube: row.youtube_url,
    openingHours: Array.isArray(row.opening_hours) ? (row.opening_hours as unknown as OpeningHoursEntry[]) : [],
    currency: row.currency_symbol,
    founded: "",
  };
}

/**
 * The full business config, shaped exactly like the old static `business`
 * export (src/data/business.ts) — including `owner` — so every component
 * that used to read that object keeps working unchanged once it receives
 * this as a prop instead.
 */
export const getBusinessConfig = cache(async (): Promise<BusinessConfig> => {
  const supabase = await createClient();
  const [{ data, error }, owner] = await Promise.all([
    supabase.from("business_settings").select("*").order("updated_at", { ascending: false }).limit(1).maybeSingle(),
    getOwner(),
  ]);

  if (error) {
    logDataError("business.getBusinessConfig", error);
    return { ...FALLBACK, owner };
  }
  return { ...(data ? mapRow(data) : FALLBACK), owner };
});

// ================================================================
// Admin
// ================================================================
export type AdminBusinessSettingsRow = BusinessSettingsRow;

export async function adminGetBusinessSettings(): Promise<AdminBusinessSettingsRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("business_settings")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) {
    logDataError("business.adminGetBusinessSettings", error);
    return null;
  }
  return data;
}

export async function adminUpsertBusinessSettings(
  values: Database["public"]["Tables"]["business_settings"]["Insert"] & { id?: string }
): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase.from("business_settings").upsert(values);
  if (error) {
    logDataError("business.adminUpsertBusinessSettings", error);
    return { error: error.message };
  }
  return { error: null };
}
