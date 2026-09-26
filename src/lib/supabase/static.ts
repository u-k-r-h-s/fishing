import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "@/lib/supabase/env";
import type { Database } from "@/lib/supabase/database.types";

/**
 * A cookie-free Supabase client for contexts that run outside any HTTP
 * request — namely `generateStaticParams`, which executes at build time
 * before a request exists, so `next/headers`' `cookies()` (used by
 * lib/supabase/server.ts) throws there. Only ever used for public,
 * unauthenticated reads (e.g. listing fish slugs to pre-render).
 */
export function createStaticClient() {
  const { url, publishableKey } = getSupabaseEnv();
  return createSupabaseClient<Database>(url, publishableKey);
}
