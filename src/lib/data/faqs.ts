import "server-only";
import { createClient } from "@/lib/supabase/server";
import { localizedField, logDataError } from "@/lib/data/shared";
import type { FAQ } from "@/data/faqs";
import type { Database } from "@/lib/supabase/database.types";

type FaqRow = Database["public"]["Tables"]["faqs"]["Row"];

function mapRow(row: FaqRow): FAQ {
  return {
    id: row.id,
    question: localizedField(row.question_en, row.question_hi),
    answer: localizedField(row.answer_en, row.answer_hi),
  };
}

export async function getFaqs(): Promise<FAQ[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .eq("active", true)
    .order("display_order", { ascending: true });

  if (error) {
    logDataError("faqs.getFaqs", error);
    return [];
  }
  return (data ?? []).map(mapRow);
}

// ================================================================
// Admin
// ================================================================
export type AdminFaqRow = FaqRow;

export async function adminListFaqs(): Promise<AdminFaqRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) {
    logDataError("faqs.adminListFaqs", error);
    return [];
  }
  return data ?? [];
}

export async function adminGetFaq(id: string): Promise<AdminFaqRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("faqs").select("*").eq("id", id).maybeSingle();
  if (error) {
    logDataError("faqs.adminGetFaq", error);
    return null;
  }
  return data;
}

export async function adminUpsertFaq(
  values: Database["public"]["Tables"]["faqs"]["Insert"] & { id?: string }
): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase.from("faqs").upsert(values);
  if (error) {
    logDataError("faqs.adminUpsertFaq", error);
    return { error: error.message };
  }
  return { error: null };
}

export async function adminDeleteFaq(id: string): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase.from("faqs").delete().eq("id", id);
  if (error) {
    logDataError("faqs.adminDeleteFaq", error);
    return { error: error.message };
  }
  return { error: null };
}
