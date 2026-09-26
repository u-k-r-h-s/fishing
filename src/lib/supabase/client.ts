"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnv } from "@/lib/supabase/env";
import type { Database } from "@/lib/supabase/database.types";

/**
 * Supabase client for Client Components. Uses the publishable
 * (anon) key only — safe to ship to the browser. Every table it
 * can reach is governed by Postgres RLS (see supabase/migrations),
 * so this key alone can never grant write access to CMS content.
 */
export function createClient() {
  const { url, publishableKey } = getSupabaseEnv();
  return createBrowserClient<Database>(url, publishableKey);
}
