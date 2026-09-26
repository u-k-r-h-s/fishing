import "server-only";
import { createClient } from "@/lib/supabase/server";

export interface AdminSession {
  userId: string;
  email: string;
}

/**
 * Returns the current session's admin info, or null if not signed in or not
 * an active admin. This is a UX convenience (so the dashboard can greet the
 * user / hide itself) — the real security boundary is Postgres RLS's
 * `public.is_admin()`, checked independently on every table operation.
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: adminRow } = await supabase
    .from("admin_users")
    .select("user_id, email")
    .eq("user_id", user.id)
    .eq("active", true)
    .maybeSingle();

  if (!adminRow) return null;

  return { userId: adminRow.user_id, email: adminRow.email };
}
