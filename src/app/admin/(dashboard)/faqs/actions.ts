"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminUpsertFaq, adminDeleteFaq } from "@/lib/data/faqs";

export interface FaqFormState {
  error: string | null;
}

export async function saveFaqAction(
  _prevState: FaqFormState,
  formData: FormData
): Promise<FaqFormState> {
  const id = String(formData.get("id") ?? "").trim();
  const questionEn = String(formData.get("question_en") ?? "").trim();
  if (!questionEn) return { error: "English question is required." };

  const { error } = await adminUpsertFaq({
    ...(id ? { id } : {}),
    question_en: questionEn,
    question_hi: String(formData.get("question_hi") ?? ""),
    answer_en: String(formData.get("answer_en") ?? ""),
    answer_hi: String(formData.get("answer_hi") ?? ""),
    active: formData.get("active") === "on",
    display_order: Number.parseInt(String(formData.get("display_order") ?? "0"), 10) || 0,
  });

  if (error) return { error };

  revalidatePath("/", "layout");
  redirect("/admin/faqs");
}

export async function deleteFaqAction(id: string) {
  const result = await adminDeleteFaq(id);
  if (!result.error) revalidatePath("/", "layout");
  return result;
}
