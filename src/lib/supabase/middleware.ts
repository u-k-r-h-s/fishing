import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseEnv } from "@/lib/supabase/env";

/**
 * Refreshes the Supabase auth session on a request/response pair, per the
 * current @supabase/ssr proxy/middleware pattern. Called from src/proxy.ts
 * for /admin routes (public routes don't need a session).
 *
 * IMPORTANT: `supabase.auth.getUser()` must be called (not skipped) on every
 * matched request — it's what actually refreshes an expiring session token
 * and writes the new cookie onto `response`. Do not remove this call.
 */
export async function refreshSupabaseSession(request: NextRequest, response: NextResponse) {
  const { url, publishableKey } = getSupabaseEnv();

  const supabase = createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { user, response };
}
