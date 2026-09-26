"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminUpsertTestimonial, adminDeleteTestimonial } from "@/lib/data/testimonials";

export interface TestimonialFormState {
  error: string | null;
}

export async function saveTestimonialAction(
  _prevState: TestimonialFormState,
  formData: FormData
): Promise<TestimonialFormState> {
  const id = String(formData.get("id") ?? "").trim();
  const customerName = String(formData.get("customer_name") ?? "").trim();
  if (!customerName) return { error: "Customer name is required." };

  const rating = Number.parseInt(String(formData.get("rating") ?? "5"), 10);

  const { error } = await adminUpsertTestimonial({
    ...(id ? { id } : {}),
    customer_name: customerName,
    role_en: String(formData.get("role_en") ?? ""),
    role_hi: String(formData.get("role_hi") ?? ""),
    content_en: String(formData.get("content_en") ?? ""),
    content_hi: String(formData.get("content_hi") ?? ""),
    rating: Math.min(5, Math.max(1, Number.isFinite(rating) ? rating : 5)),
    image_url: String(formData.get("image_url") ?? ""),
    active: formData.get("active") === "on",
    display_order: Number.parseInt(String(formData.get("display_order") ?? "0"), 10) || 0,
  });

  if (error) return { error };

  revalidatePath("/", "layout");
  redirect("/admin/testimonials");
}

export async function deleteTestimonialAction(id: string) {
  const result = await adminDeleteTestimonial(id);
  if (!result.error) revalidatePath("/", "layout");
  return result;
}
