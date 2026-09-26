"use server";

import { revalidatePath } from "next/cache";
import { adminUpsertOwner } from "@/lib/data/owner";

export interface OwnerFormState {
  error: string | null;
  success: boolean;
}

export async function saveOwnerAction(
  _prevState: OwnerFormState,
  formData: FormData
): Promise<OwnerFormState> {
  const id = String(formData.get("id") ?? "").trim();
  const nameEn = String(formData.get("name_en") ?? "").trim();
  if (!nameEn) return { error: "Name is required.", success: false };

  const { error } = await adminUpsertOwner({
    ...(id ? { id } : {}),
    name_en: nameEn,
    name_hi: String(formData.get("name_hi") ?? ""),
    role_en: String(formData.get("role_en") ?? ""),
    role_hi: String(formData.get("role_hi") ?? ""),
    bio_en: String(formData.get("bio_en") ?? ""),
    bio_hi: String(formData.get("bio_hi") ?? ""),
    image_url: String(formData.get("image_url") ?? ""),
    instagram_url: String(formData.get("instagram_url") ?? ""),
    active: true,
  });

  if (error) return { error, success: false };

  revalidatePath("/", "layout");
  return { error: null, success: true };
}
