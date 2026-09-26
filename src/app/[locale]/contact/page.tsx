import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { ContactSection } from "@/components/contact/ContactSection";
import { FAQSection } from "@/components/faq/FAQSection";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { JsonLd } from "@/components/shared/JsonLd";
import { getBreadcrumbSchema, getFAQPageSchema } from "@/lib/structuredData";
import { buildMetadata } from "@/lib/seo";
import { getDictionary, tf } from "@/i18n/getDictionary";
import { requireLocale } from "@/i18n/requireLocale";
import { getBusinessConfig } from "@/lib/data/business";
import { getFaqs } from "@/lib/data/faqs";

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
    title: dict.nav.contact,
    description: tf(dict.contactPage.metaDescription, { business: business.name, city: business.city }),
    path: "/contact",
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = requireLocale((await params).locale);
  const dict = getDictionary(locale);
  const [business, faqs] = await Promise.all([getBusinessConfig(), getFaqs()]);

  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema(locale, [
          { name: "Home", path: "/" },
          { name: dict.nav.contact, path: "/contact" },
        ])}
      />
      <JsonLd data={getFAQPageSchema(locale, faqs)} />

      <section className="bg-navy py-16 text-offwhite sm:py-20">
        <Container>
          <ScrollReveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-mint">
              {dict.nav.contact}
            </p>
            <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
              {dict.contactPage.heading}
            </h1>
            <p className="mt-5 max-w-xl text-base text-offwhite/75 sm:text-lg">
              {dict.contactPage.description}
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <ContactSection locale={locale} dict={dict} business={business} showHeading={false} showOwner />
      <FAQSection locale={locale} dict={dict} faqs={faqs} />
    </>
  );
}
