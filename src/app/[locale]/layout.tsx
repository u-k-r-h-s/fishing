import type { Metadata } from "next";
import { getSiteUrl, localizedPath, absoluteUrl } from "@/lib/utils";
import { getLocalBusinessSchema } from "@/lib/structuredData";
import { JsonLd } from "@/components/shared/JsonLd";
import { BusinessConfigProvider } from "@/components/shared/BusinessConfigProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileContactBar } from "@/components/layout/MobileContactBar";
import { locales, localeTags } from "@/i18n/locales";
import { requireLocale } from "@/i18n/requireLocale";
import { getDictionary } from "@/i18n/getDictionary";
import { localize } from "@/i18n/types";
import { getBusinessConfig } from "@/lib/data/business";
import { getServiceAreas } from "@/lib/data/serviceAreas";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = requireLocale((await params).locale);
  const business = await getBusinessConfig();
  const tagline = localize(business.tagline, locale);
  const description = localize(business.description, locale);

  const languages: Record<string, string> = {};
  for (const code of locales) {
    languages[localeTags[code]] = absoluteUrl(localizedPath(code, "/"));
  }
  languages["x-default"] = absoluteUrl(localizedPath("en", "/"));

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: `${business.name} | ${tagline}`,
      template: `%s | ${business.name}`,
    },
    description,
    keywords: ["fresh fish", "seafood", business.city, business.name, "fish delivery"],
    alternates: {
      canonical: absoluteUrl(localizedPath(locale, "/")),
      languages,
    },
    openGraph: {
      type: "website",
      siteName: business.name,
      title: `${business.name} | ${tagline}`,
      description,
      locale: localeTags[locale],
    },
    twitter: {
      card: "summary_large_image",
      title: `${business.name} | ${tagline}`,
      description,
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const locale = requireLocale((await params).locale);
  const dict = getDictionary(locale);
  const [business, serviceAreas] = await Promise.all([getBusinessConfig(), getServiceAreas()]);

  return (
    <BusinessConfigProvider name={business.name} whatsapp={business.whatsapp} phone={business.phone}>
      <JsonLd data={getLocalBusinessSchema(locale, business, serviceAreas)} />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-offwhite"
      >
        {dict.meta.skipToContent}
      </a>
      <Navbar locale={locale} dict={dict} business={business} />
      <main id="main-content" className="flex-1 pb-16 md:pb-0">
        {children}
      </main>
      <Footer locale={locale} dict={dict} business={business} serviceAreas={serviceAreas} />
      <MobileContactBar locale={locale} />
    </BusinessConfigProvider>
  );
}
