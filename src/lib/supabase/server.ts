import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseEnv } from "@/lib/supabase/env";
import type { Database } from "@/lib/supabase/database.types";

/**
 * Supabase client for Server Components, Server Actions, and Route
 * Handlers. Reads/writes the session via Next's cookie store. Still
 * uses only the public publishable (anon) key — admin authorization
 * comes from the caller's own authenticated session plus RLS
 * (`public.is_admin()`), never from an elevated key.
 *
 * Must be created fresh per request (it closes over `cookies()`), so
 * call this at the top of each Server Component/Action rather than
 * caching the client.
 */
export async function createClient() {
  const cookieStore = await cookies();
  const { url, publishableKey } = getSupabaseEnv();

  return createServerClient<Database>(url, publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Called from a Server Component render, where cookies can't be
          // written. Harmless: the proxy's session refresh (src/proxy.ts)
          // already keeps the session cookie current on every request.
        }
      },
    },
  });
}
