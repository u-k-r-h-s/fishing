import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n/locales";
import { refreshSupabaseSession } from "@/lib/supabase/middleware";

const LOCALE_COOKIE = "NEXT_LOCALE";

function detectLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && (locales as readonly string[]).includes(cookieLocale)) {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const preferred = acceptLanguage.split(",")[0]?.slice(0, 2).toLowerCase();
  if (preferred && (locales as readonly string[]).includes(preferred)) {
    return preferred;
  }

  return defaultLocale;
}

/**
 * The admin CMS is a single-language internal tool — it deliberately sits
 * outside the /{locale} public-site routing, so it's excluded from the
 * locale redirect below. Auth is enforced here (redirect to /admin/login)
 * *and* by RLS in Postgres (see supabase/migrations); this check is only
 * a UX shortcut, never the real security boundary.
 */
async function handleAdmin(request: NextRequest): Promise<NextResponse> {
  const response = NextResponse.next({ request });
  const { user } = await refreshSupabaseSession(request, response);

  const isLoginPage = request.nextUrl.pathname === "/admin/login";
  if (!user && !isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  if (user && isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return response;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return handleAdmin(request);
  }

  const matchedLocale = locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (matchedLocale) {
    // The root layout (app/layout.tsx) sits above the [locale] segment, so it
    // has no `params.locale` of its own — it reads this header instead to
    // set <html lang> correctly without a client-side flash.
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", matchedLocale);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  const response = NextResponse.redirect(url);
  response.cookies.set(LOCALE_COOKIE, locale, { maxAge: 60 * 60 * 24 * 365, path: "/" });
  return response;
}

export const config = {
  // Skip static files, images, and API/metadata routes.
  matcher: ["/((?!_next|api|favicon.ico|images|videos|sitemap.xml|robots.txt).*)"],
};
