import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { TodaysCatchSection } from "@/components/fish/TodaysCatchSection";
import { FreshnessPromiseSection } from "@/components/sections/FreshnessPromiseSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { VideoShowcaseSection } from "@/components/video/VideoShowcaseSection";
import { OffersSection } from "@/components/offers/OffersSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { OwnerSection } from "@/components/sections/OwnerSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { SocialShowcaseSection } from "@/components/social/SocialShowcaseSection";
import { ServiceAreasSection } from "@/components/sections/ServiceAreasSection";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { FAQSection } from "@/components/faq/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { ContactSection } from "@/components/contact/ContactSection";
import { JsonLd } from "@/components/shared/JsonLd";
import { getFAQPageSchema } from "@/lib/structuredData";
import { buildMetadata } from "@/lib/seo";
import { getDictionary } from "@/i18n/getDictionary";
import { localize } from "@/i18n/types";
import { requireLocale } from "@/i18n/requireLocale";

import { getBusinessConfig } from "@/lib/data/business";
import { getFeaturedFish } from "@/lib/data/fish";
import {
  getHeroContent,
  getFreshnessPromiseContent,
  getProcessContent,
  getAboutContent,
  getWhyChooseUsContent,
  getFinalCtaContent,
} from "@/lib/data/homepage";
import { getVideos } from "@/lib/data/videos";
import { getActiveOffers } from "@/lib/data/offers";
import { getOwner } from "@/lib/data/owner";
import { getReels } from "@/lib/data/social";
import { getServiceAreas } from "@/lib/data/serviceAreas";
import { getTestimonials } from "@/lib/data/testimonials";
import { getFaqs } from "@/lib/data/faqs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = requireLocale((await params).locale);
  const business = await getBusinessConfig();
  const tagline = localize(business.tagline, locale);
  const description = localize(business.description, locale);

  return buildMetadata({
    locale,
    siteName: business.name,
    title: `${business.name} | ${tagline}`,
    description,
    path: "/",
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = requireLocale((await params).locale);
  const dict = getDictionary(locale);

  const [
    business,
    featuredFish,
    heroContent,
    freshnessPromiseContent,
    processContent,
    videos,
    activeOffers,
    aboutContent,
    owner,
    whyChooseUsContent,
    reels,
    serviceAreas,
    testimonials,
    faqs,
    finalCtaContent,
  ] = await Promise.all([
    getBusinessConfig(),
    getFeaturedFish(),
    getHeroContent(),
    getFreshnessPromiseContent(),
    getProcessContent(),
    getVideos(),
    getActiveOffers(),
    getAboutContent(),
    getOwner(),
    getWhyChooseUsContent(),
    getReels(),
    getServiceAreas(),
    getTestimonials(),
    getFaqs(),
    getFinalCtaContent(),
  ]);

  const featuredVideo = videos.find((v) => v.featured) ?? videos[0] ?? null;
  const supportingVideos = videos.filter((v) => v.id !== featuredVideo?.id);

  return (
    <>
      <JsonLd data={getFAQPageSchema(locale, faqs)} />
      <Hero locale={locale} business={business} content={heroContent} />
      <TodaysCatchSection locale={locale} dict={dict} featured={featuredFish} />
      <FreshnessPromiseSection locale={locale} content={freshnessPromiseContent} />
      <ProcessSection locale={locale} content={processContent} />
      <VideoShowcaseSection locale={locale} dict={dict} featured={featuredVideo} supporting={supportingVideos} />
      <OffersSection locale={locale} dict={dict} offers={activeOffers} />
      <AboutSection locale={locale} dict={dict} content={aboutContent} />
      <OwnerSection locale={locale} dict={dict} owner={owner} />
      <WhyChooseUsSection locale={locale} content={whyChooseUsContent} />
      <SocialShowcaseSection locale={locale} dict={dict} posts={reels} />
      <ServiceAreasSection locale={locale} dict={dict} serviceAreas={serviceAreas} />
      <TestimonialsSection locale={locale} dict={dict} testimonials={testimonials} />
      <FAQSection locale={locale} dict={dict} faqs={faqs} />
      <CTASection
        locale={locale}
        dict={dict}
        businessName={business.name}
        title={localize(finalCtaContent.heading, locale) || undefined}
        description={localize(finalCtaContent.description, locale)?.replace("{business}", business.name) || undefined}
      />
      <ContactSection locale={locale} dict={dict} business={business} showOwner />
    </>
  );
}
