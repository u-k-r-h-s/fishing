"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminUpsertServiceArea, adminDeleteServiceArea } from "@/lib/data/serviceAreas";

export interface ServiceAreaFormState {
  error: string | null;
}

export async function saveServiceAreaAction(
  _prevState: ServiceAreaFormState,
  formData: FormData
): Promise<ServiceAreaFormState> {
  const id = String(formData.get("id") ?? "").trim();
  const nameEn = String(formData.get("name_en") ?? "").trim();
  if (!nameEn) return { error: "English name is required." };

  const { error } = await adminUpsertServiceArea({
    ...(id ? { id } : {}),
    name_en: nameEn,
    name_hi: String(formData.get("name_hi") ?? ""),
    description_en: String(formData.get("description_en") ?? ""),
    description_hi: String(formData.get("description_hi") ?? ""),
    active: formData.get("active") === "on",
    display_order: Number.parseInt(String(formData.get("display_order") ?? "0"), 10) || 0,
  });

  if (error) return { error };

  revalidatePath("/", "layout");
  redirect("/admin/service-areas");
}

export async function deleteServiceAreaAction(id: string) {
  const result = await adminDeleteServiceArea(id);
  if (!result.error) revalidatePath("/", "layout");
  return result;
}
