import { Plus_Jakarta_Sans, Noto_Sans_Devanagari } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { isLocale, localeTags, defaultLocale } from "@/i18n/locales";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-noto-devanagari",
  display: "swap",
});

/**
 * The true root layout — required by Next.js to hold the only <html>/<body>
 * in the tree, so it also covers /admin (which sits outside the public
 * [locale] site). `x-locale` is set by src/proxy.ts from the matched
 * `[locale]` segment; it's absent for /admin, which falls back to "en".
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rawLocale = (await headers()).get("x-locale");
  const locale = rawLocale && isLocale(rawLocale) ? rawLocale : defaultLocale;

  return (
    <html lang={localeTags[locale]} className={`${plusJakarta.variable} ${notoDevanagari.variable}`}>
      <body className="flex min-h-screen flex-col bg-offwhite font-sans text-dark antialiased">
        {children}
      </body>
    </html>
  );
}
