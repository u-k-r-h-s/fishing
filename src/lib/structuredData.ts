import type { Fish } from "@/data/fish";
import type { FAQ } from "@/data/faqs";
import type { BusinessConfig } from "@/data/business";
import { absoluteUrl, localizedPath } from "@/lib/utils";
import type { Locale } from "@/i18n/locales";
import { localize } from "@/i18n/types";
import type { Localized } from "@/i18n/types";

/**
 * JSON-LD builders. Every value is passed in by the caller (fetched from
 * Supabase via src/lib/data/*) — nothing here is fabricated.
 */

export function getLocalBusinessSchema(
  locale: Locale,
  business: BusinessConfig,
  serviceAreas: Localized<string>[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "@id": absoluteUrl("/#business"),
    name: business.name,
    description: localize(business.description, locale),
    image: absoluteUrl("/images/hero/hero-fish.svg"),
    telephone: business.phone,
    email: business.email,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address,
      addressLocality: business.city,
      addressRegion: business.state,
      postalCode: business.postalCode,
      addressCountry: business.country,
    },
    ...(business.googleMaps ? { hasMap: business.googleMaps } : {}),
    openingHoursSpecification: business.openingHours.map((entry) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: entry.days,
      description: entry.hours,
    })),
    areaServed: serviceAreas.map((area) => localize(area, locale)),
    sameAs: [business.instagram, business.facebook, business.youtube].filter(Boolean),
  };
}

export function getProductSchema(locale: Locale, item: Fish, businessName: string) {
  const priceValue = parseFloat(item.price.replace(/[^\d.]/g, "")) || undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Fresh ${localize(item.name, locale)}`,
    description: localize(item.description, locale),
    image: absoluteUrl(item.image),
    brand: {
      "@type": "Brand",
      name: businessName,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      ...(priceValue ? { price: priceValue } : {}),
      availability: item.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: absoluteUrl(localizedPath(locale, `/fresh-fish/${item.id}`)),
      seller: {
        "@type": "Organization",
        name: businessName,
      },
    },
  };
}

export function getFAQPageSchema(locale: Locale, faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: localize(faq.question, locale),
      acceptedAnswer: {
        "@type": "Answer",
        text: localize(faq.answer, locale),
      },
    })),
  };
}

export function getBreadcrumbSchema(locale: Locale, items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(localizedPath(locale, item.path)),
    })),
  };
}
