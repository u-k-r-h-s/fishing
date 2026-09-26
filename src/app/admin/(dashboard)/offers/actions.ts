"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminUpsertOffer, adminDeleteOffer } from "@/lib/data/offers";

export interface OfferFormState {
  error: string | null;
}

export async function saveOfferAction(
  _prevState: OfferFormState,
  formData: FormData
): Promise<OfferFormState> {
  const id = String(formData.get("id") ?? "").trim();
  const titleEn = String(formData.get("title_en") ?? "").trim();
  if (!titleEn) return { error: "English title is required." };

  const startDate = String(formData.get("start_date") ?? "");
  const endDate = String(formData.get("end_date") ?? "");

  const { error } = await adminUpsertOffer({
    ...(id ? { id } : {}),
    title_en: titleEn,
    title_hi: String(formData.get("title_hi") ?? ""),
    description_en: String(formData.get("description_en") ?? ""),
    description_hi: String(formData.get("description_hi") ?? ""),
    discount_text_en: String(formData.get("discount_text_en") ?? ""),
    discount_text_hi: String(formData.get("discount_text_hi") ?? ""),
    image_url: String(formData.get("image_url") ?? ""),
    start_date: startDate || null,
    end_date: endDate || null,
    active: formData.get("active") === "on",
    featured: formData.get("featured") === "on",
    display_order: Number.parseInt(String(formData.get("display_order") ?? "0"), 10) || 0,
  });

  if (error) return { error };

  revalidatePath("/", "layout");
  redirect("/admin/offers");
}

export async function deleteOfferAction(id: string) {
  const result = await adminDeleteOffer(id);
  if (!result.error) revalidatePath("/", "layout");
  return result;
}
