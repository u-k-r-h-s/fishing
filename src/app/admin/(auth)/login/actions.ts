"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export interface LoginState {
  error: string | null;
}

export async function signInAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  if (!email || !password) {
    return { error: "Enter both email and password." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    return { error: "Invalid email or password." };
  }

  const { data: adminRow } = await supabase
    .from("admin_users")
    .select("id")
    .eq("user_id", data.user.id)
    .eq("active", true)
    .maybeSingle();

  if (!adminRow) {
    await supabase.auth.signOut();
    return { error: "This account is not an authorized admin." };
  }

  redirect(next.startsWith("/admin") ? next : "/admin");
}
