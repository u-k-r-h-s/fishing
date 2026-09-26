import { business } from "@/data/business";
import type { Fish } from "@/data/fish";
import { faqs } from "@/data/faqs";
import { serviceAreas } from "@/data/serviceAreas";
import { absoluteUrl } from "@/lib/utils";

/**
 * JSON-LD builders. Every value is pulled from the real business
 * configuration — nothing here is fabricated.
 */

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "@id": absoluteUrl("/#business"),
    name: business.name,
    description: business.description,
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
    areaServed: serviceAreas,
    sameAs: [business.instagram, business.facebook, business.youtube].filter(Boolean),
  };
}

export function getProductSchema(item: Fish) {
  const priceValue = parseFloat(item.price.replace(/[^\d.]/g, "")) || undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Fresh ${item.name}`,
    description: item.description,
    image: absoluteUrl(item.image),
    brand: {
      "@type": "Brand",
      name: business.name,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      ...(priceValue ? { price: priceValue } : {}),
      availability: item.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: absoluteUrl(`/fresh-fish/${item.id}`),
      seller: {
        "@type": "Organization",
        name: business.name,
      },
    },
  };
}

export function getFAQPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
