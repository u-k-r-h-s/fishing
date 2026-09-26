import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { CallButton } from "@/components/shared/CallButton";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { FishGrid } from "@/components/fish/FishGrid";
import { JsonLd } from "@/components/shared/JsonLd";
import { getBreadcrumbSchema, getProductSchema } from "@/lib/structuredData";
import { buildFishMetadata } from "@/lib/seo";
import { cn, localizedPath } from "@/lib/utils";
import { getDictionary, tf } from "@/i18n/getDictionary";
import { localize } from "@/i18n/types";
import { locales } from "@/i18n/locales";
import { requireLocale } from "@/i18n/requireLocale";
import { getAllFishSlugs, getFish, getFishBySlug } from "@/lib/data/fish";
import { getBusinessConfig } from "@/lib/data/business";

export async function generateStaticParams() {
  const slugs = await getAllFishSlugs();
  return locales.flatMap((locale) => slugs.map((id) => ({ locale, id })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, id } = await params;
  const locale = requireLocale(rawLocale);
  const [item, business] = await Promise.all([getFishBySlug(id), getBusinessConfig()]);
  if (!item) return {};
  return buildFishMetadata(locale, item, business);
}

export default async function FishDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale: rawLocale, id } = await params;
  const locale = requireLocale(rawLocale);
  const [item, allFish, business] = await Promise.all([
    getFishBySlug(id),
    getFish(),
    getBusinessConfig(),
  ]);

  if (!item) {
    notFound();
  }

  const dict = getDictionary(locale);
  const name = localize(item.name, locale);
  const related = allFish.filter((entry) => entry.id !== item.id).slice(0, 4);

  return (
    <>
      <JsonLd data={getProductSchema(locale, item, business.name)} />
      <JsonLd
        data={getBreadcrumbSchema(locale, [
          { name: "Home", path: "/" },
          { name: dict.nav.freshFish, path: "/fresh-fish" },
          { name, path: `/fresh-fish/${item.id}` },
        ])}
      />

      <section className="py-12 sm:py-16">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-dark/50">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href={localizedPath(locale, "/")} className="hover:text-ocean">
                  {dict.nav.home}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={localizedPath(locale, "/fresh-fish")} className="hover:text-ocean">
                  {dict.nav.freshFish}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-medium text-dark">
                {name}
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <ImageReveal className="relative aspect-square w-full rounded-[1.75rem] bg-mint/20 shadow-lg">
              <Image
                src={item.image}
                alt={name}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <span
                className={cn(
                  "absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold shadow-sm",
                  item.available ? "bg-aqua text-navy" : "bg-dark/70 text-offwhite"
                )}
              >
                {item.available ? dict.common.availableToday : dict.common.currentlyUnavailable}
              </span>
            </ImageReveal>

            <ScrollReveal>
              <p className="text-xs font-bold uppercase tracking-widest text-ocean">
                {dict.fishDetail.catalogue}
              </p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-dark sm:text-4xl">
                {name}
              </h1>
              <p className="mt-4 text-2xl font-bold text-navy">{item.price}</p>
              <p className="mt-5 text-base leading-relaxed text-dark/70">
                {localize(item.longDescription, locale)}
              </p>

              <div className="mt-6 rounded-xl bg-mint/25 p-4 text-sm text-navy">
                <strong className="font-semibold">{dict.fishDetail.freshnessPrep}:</strong>{" "}
                {localize(item.freshnessNote, locale)}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <WhatsAppButton
                  locale={locale}
                  fishName={name}
                  label={tf(dict.common.whatsappAbout, { name })}
                />
                <CallButton locale={locale} />
              </div>

              <p className="mt-8 text-xs text-dark/45">
                {tf(dict.fishDetail.priceNotice, { phone: business.phoneDisplay })}
              </p>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="bg-mint/10 py-16 sm:py-20">
          <Container>
            <h2 className="text-2xl font-bold tracking-tight text-dark sm:text-3xl">
              {dict.fishDetail.alsoLike}
            </h2>
            <div className="mt-8">
              <FishGrid items={related} locale={locale} dict={dict} />
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
