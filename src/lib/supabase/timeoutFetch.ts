import { isSupabaseConfigured } from "@/lib/supabase/env";

const SUPABASE_FETCH_TIMEOUT_MS = 4000;

/**
 * Every public page reads from Supabase during server render — a single
 * homepage request fires a dozen-plus independent data-layer calls in
 * parallel. Two failure modes had to be bounded here:
 *
 * 1. Unconfigured/placeholder env vars: every one of those calls would
 *    otherwise attempt a real DNS lookup for the placeholder host. Each
 *    lookup "fails fast" on its own, but with many in flight at once they
 *    queue behind Node's small libuv DNS thread pool, and the queueing adds
 *    up to several real seconds — this is what blocked the Navbar and Hero
 *    content behind a many-second wait. Skip the network call entirely when
 *    Supabase isn't configured; there's nothing to reach.
 * 2. A genuinely slow/unreachable (but configured) project: bounded with an
 *    abort timeout so one bad request can't hang a page indefinitely.
 *
 * Either way, the data layer's existing try/catch + fallback-content paths
 * take over immediately instead of the request hanging.
 *
 * The "not configured" rejection below is deliberately shaped as an
 * `AbortError` (not a plain `Error`): postgrest-js's `fetchWithRetry`
 * automatically retries any GET request that fails with a generic network
 * error — 3 attempts with 1s/2s/4s backoff, 7s total — which reintroduced
 * the exact multi-second delay this function exists to avoid. It explicitly
 * never retries aborted requests, so an `AbortError` fails instantly.
 */
export function timeoutFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  if (!isSupabaseConfigured()) {
    return Promise.reject(new DOMException("[supabase] not configured — skipping network call", "AbortError"));
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), SUPABASE_FETCH_TIMEOUT_MS);
  return fetch(input, { ...init, signal: controller.signal }).finally(() => clearTimeout(timeout));
}
