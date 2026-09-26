import "server-only";
import { createClient } from "@/lib/supabase/server";
import { localizedField, logDataError } from "@/lib/data/shared";
import type { Testimonial } from "@/data/testimonials";
import type { Database } from "@/lib/supabase/database.types";

type TestimonialRow = Database["public"]["Tables"]["testimonials"]["Row"];

function mapRow(row: TestimonialRow): Testimonial {
  return {
    id: row.id,
    name: row.customer_name,
    role: localizedField(row.role_en, row.role_hi),
    quote: localizedField(row.content_en, row.content_hi),
    rating: (row.rating >= 1 && row.rating <= 5 ? row.rating : 5) as Testimonial["rating"],
  };
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("active", true)
    .order("display_order", { ascending: true });

  if (error) {
    logDataError("testimonials.getTestimonials", error);
    return [];
  }
  return (data ?? []).map(mapRow);
}

// ================================================================
// Admin
// ================================================================
export type AdminTestimonialRow = TestimonialRow;

export async function adminListTestimonials(): Promise<AdminTestimonialRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) {
    logDataError("testimonials.adminListTestimonials", error);
    return [];
  }
  return data ?? [];
}

export async function adminGetTestimonial(id: string): Promise<AdminTestimonialRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("testimonials").select("*").eq("id", id).maybeSingle();
  if (error) {
    logDataError("testimonials.adminGetTestimonial", error);
    return null;
  }
  return data;
}

export async function adminUpsertTestimonial(
  values: Database["public"]["Tables"]["testimonials"]["Insert"] & { id?: string }
): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").upsert(values);
  if (error) {
    logDataError("testimonials.adminUpsertTestimonial", error);
    return { error: error.message };
  }
  return { error: null };
}

export async function adminDeleteTestimonial(id: string): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) {
    logDataError("testimonials.adminDeleteTestimonial", error);
    return { error: error.message };
  }
  return { error: null };
}
