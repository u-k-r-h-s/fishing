import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { AboutSection } from "@/components/sections/AboutSection";
import { LandGallerySection } from "@/components/sections/LandGallerySection";
import { OwnerSection } from "@/components/sections/OwnerSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { JsonLd } from "@/components/shared/JsonLd";
import { getBreadcrumbSchema } from "@/lib/structuredData";
import { buildMetadata } from "@/lib/seo";
import { getDictionary, tf } from "@/i18n/getDictionary";
import { localize } from "@/i18n/types";
import { requireLocale } from "@/i18n/requireLocale";
import { getBusinessConfig } from "@/lib/data/business";
import { getOwner } from "@/lib/data/owner";
import { getAboutContent, getWhyChooseUsContent } from "@/lib/data/homepage";
import { getTestimonials } from "@/lib/data/testimonials";

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
    title: dict.nav.about,
    description: tf(dict.aboutPage.metaDescription, { business: business.name }),
    path: "/about",
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = requireLocale((await params).locale);
  const dict = getDictionary(locale);
  const [business, owner, aboutContent, whyChooseUsContent, testimonials] = await Promise.all([
    getBusinessConfig(),
    getOwner(),
    getAboutContent(),
    getWhyChooseUsContent(),
    getTestimonials(),
  ]);

  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema(locale, [
          { name: "Home", path: "/" },
          { name: dict.nav.about, path: "/about" },
        ])}
      />

      <section className="bg-navy py-16 text-offwhite sm:py-20">
        <Container>
          <ScrollReveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-mint">
              {dict.nav.about}
            </p>
            <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
              {localize(business.tagline, locale)}
            </h1>
            <p className="mt-5 max-w-xl text-base text-offwhite/75 sm:text-lg">
              {localize(business.description, locale)}
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <AboutSection locale={locale} dict={dict} content={aboutContent} full />
      <LandGallerySection dict={dict} images={aboutContent.galleryImages} />
      <OwnerSection locale={locale} dict={dict} owner={owner} />
      <WhyChooseUsSection locale={locale} content={whyChooseUsContent} />
      <TestimonialsSection locale={locale} dict={dict} testimonials={testimonials} />
      <CTASection locale={locale} dict={dict} businessName={business.name} />
    </>
  );
}
