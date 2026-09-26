import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { FishGrid } from "@/components/fish/FishGrid";
import { CTASection } from "@/components/sections/CTASection";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { JsonLd } from "@/components/shared/JsonLd";
import { getBreadcrumbSchema } from "@/lib/structuredData";
import { buildMetadata } from "@/lib/seo";
import { getDictionary, tf } from "@/i18n/getDictionary";
import { requireLocale } from "@/i18n/requireLocale";
import { getBusinessConfig } from "@/lib/data/business";
import { getFish } from "@/lib/data/fish";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = requireLocale((await params).locale);
  const dict = getDictionary(locale);
  const business = await getBusinessConfig();

  return buildMetadata({
    locale,
    siteName: business.name,
    title: dict.freshFishPage.heading,
    description: tf(dict.freshFishPage.metaDescription, { business: business.name }),
    path: "/fresh-fish",
  });
}

export default async function FreshFishPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = requireLocale((await params).locale);
  const dict = getDictionary(locale);
  const [fish, business] = await Promise.all([getFish(), getBusinessConfig()]);

  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema(locale, [
          { name: "Home", path: "/" },
          { name: dict.nav.freshFish, path: "/fresh-fish" },
        ])}
      />

      <section className="bg-navy py-16 text-offwhite sm:py-20">
        <Container>
          <ScrollReveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-mint">
              {dict.freshFishPage.eyebrow}
            </p>
            <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
              {dict.freshFishPage.heading}
            </h1>
            <p className="mt-5 max-w-xl text-base text-offwhite/75 sm:text-lg">
              {dict.freshFishPage.description}
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <FishGrid items={fish} locale={locale} dict={dict} />
        </Container>
      </section>

      <CTASection locale={locale} dict={dict} businessName={business.name} />
    </>
  );
}
