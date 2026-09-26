import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { localizedField, logDataError } from "@/lib/data/shared";
import type { Owner } from "@/data/business";
import type { Database } from "@/lib/supabase/database.types";

type OwnerRow = Database["public"]["Tables"]["owner"]["Row"];

const FALLBACK_OWNER: Owner = {
  name: "",
  role: "",
  image: "/images/owner/placeholder.svg",
  imagePosition: "50% 50%",
  bio: { en: "", hi: "" },
  instagram: "",
};

function mapRow(row: OwnerRow): Owner {
  return {
    name: row.name_en,
    role: row.role_en,
    image: row.image_url || "/images/owner/placeholder.svg",
    imagePosition: row.image_position || "50% 50%",
    bio: localizedField(row.bio_en, row.bio_hi),
    instagram: row.instagram_url || "",
  };
}

/** The single active owner profile, or a safe empty fallback if none is set yet. */
export const getOwner = cache(async (): Promise<Owner> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("owner")
    .select("*")
    .eq("active", true)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    logDataError("owner.getOwner", error);
    return FALLBACK_OWNER;
  }
  return data ? mapRow(data) : FALLBACK_OWNER;
});

// ================================================================
// Admin
// ================================================================
export type AdminOwnerRow = OwnerRow;

export async function adminListOwners(): Promise<AdminOwnerRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("owner")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) {
    logDataError("owner.adminListOwners", error);
    return [];
  }
  return data ?? [];
}

export async function adminUpsertOwner(
  values: Database["public"]["Tables"]["owner"]["Insert"] & { id?: string }
): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase.from("owner").upsert(values);
  if (error) {
    logDataError("owner.adminUpsertOwner", error);
    return { error: error.message };
  }
  return { error: null };
}

export async function adminDeleteOwner(id: string): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase.from("owner").delete().eq("id", id);
  if (error) {
    logDataError("owner.adminDeleteOwner", error);
    return { error: error.message };
  }
  return { error: null };
}
