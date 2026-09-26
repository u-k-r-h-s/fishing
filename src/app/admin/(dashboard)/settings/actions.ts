"use server";

import { revalidatePath } from "next/cache";
import { adminUpsertBusinessSettings, adminGetBusinessSettings } from "@/lib/data/business";

export interface SettingsFormState {
  error: string | null;
  success: boolean;
}

export async function saveSettingsAction(
  _prevState: SettingsFormState,
  formData: FormData
): Promise<SettingsFormState> {
  const businessName = String(formData.get("business_name") ?? "").trim();
  if (!businessName) return { error: "Business name is required.", success: false };

  const existing = await adminGetBusinessSettings();

  let openingHours: Array<{ days: string; hours: string }> = [];
  try {
    openingHours = JSON.parse(String(formData.get("opening_hours_json") ?? "[]"));
  } catch {
    return { error: "Opening hours were malformed — please try again.", success: false };
  }

  const { error } = await adminUpsertBusinessSettings({
    ...(existing ? { id: existing.id } : {}),
    business_name: businessName,
    tagline_en: String(formData.get("tagline_en") ?? ""),
    tagline_hi: String(formData.get("tagline_hi") ?? ""),
    description_en: String(formData.get("description_en") ?? ""),
    description_hi: String(formData.get("description_hi") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    whatsapp_number: String(formData.get("whatsapp_number") ?? ""),
    email: String(formData.get("email") ?? ""),
    address: String(formData.get("address") ?? ""),
    city: String(formData.get("city") ?? ""),
    state: String(formData.get("state") ?? ""),
    postal_code: String(formData.get("postal_code") ?? ""),
    country: String(formData.get("country") ?? ""),
    currency_symbol: String(formData.get("currency_symbol") ?? "₹"),
    opening_hours: openingHours,
    google_maps_url: String(formData.get("google_maps_url") ?? ""),
    instagram_url: String(formData.get("instagram_url") ?? ""),
    facebook_url: String(formData.get("facebook_url") ?? ""),
    youtube_url: String(formData.get("youtube_url") ?? ""),
    logo_url: String(formData.get("logo_url") ?? ""),
    favicon_url: String(formData.get("favicon_url") ?? ""),
    default_language: formData.get("default_language") === "hi" ? "hi" : "en",
  });

  if (error) return { error, success: false };

  revalidatePath("/", "layout");
  return { error: null, success: true };
}
