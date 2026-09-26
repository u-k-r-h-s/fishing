let warned = false;

/**
 * Reads the two public Supabase env vars. If they're missing (e.g. a fresh
 * clone before `.env.local` is set up, or a build running without secrets
 * configured yet), this deliberately does NOT throw — it logs one warning
 * and returns a syntactically-valid placeholder so `createClient()` can
 * still construct successfully. Every actual query against that client then
 * fails at the network layer, which each src/lib/data/* function already
 * catches and turns into an empty/fallback result — so a missing
 * configuration degrades the site to "no content yet" instead of crashing
 * the build or the page.
 */
export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    if (!warned) {
      warned = true;
      console.warn(
        "[supabase] NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY are not set. " +
          "Copy .env.example to .env.local and fill in your Supabase project's values — " +
          "until then, every page renders with empty CMS content instead of crashing."
      );
    }
    return {
      url: url || "https://placeholder.supabase.co",
      publishableKey: publishableKey || "placeholder-anon-key",
    };
  }

  return { url, publishableKey };
}
