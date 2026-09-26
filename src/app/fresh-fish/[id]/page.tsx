import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { fish, getFishById } from "@/data/fish";
import { business } from "@/data/business";
import { Container } from "@/components/shared/Container";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { CallButton } from "@/components/shared/CallButton";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { FishGrid } from "@/components/fish/FishGrid";
import { JsonLd } from "@/components/shared/JsonLd";
import { getBreadcrumbSchema, getProductSchema } from "@/lib/structuredData";
import { buildFishMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return fish.map((item) => ({ id: item.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = getFishById(id);
  if (!item) return {};
  return buildFishMetadata(item);
}

export default async function FishDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = getFishById(id);

  if (!item) {
    notFound();
  }

  const related = fish.filter((entry) => entry.id !== item.id).slice(0, 4);

  return (
    <>
      <JsonLd data={getProductSchema(item)} />
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Fresh Fish", path: "/fresh-fish" },
          { name: item.name, path: `/fresh-fish/${item.id}` },
        ])}
      />

      <section className="py-12 sm:py-16">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-dark/50">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-ocean">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/fresh-fish" className="hover:text-ocean">
                  Fresh Fish
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-medium text-dark">
                {item.name}
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <ImageReveal className="relative aspect-square w-full rounded-[1.75rem] bg-mint/20 shadow-lg">
              <Image
                src={item.image}
                alt={`Fresh ${item.name}`}
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
                {item.available ? "Available Today" : "Currently Unavailable"}
              </span>
            </ImageReveal>

            <ScrollReveal>
              <p className="text-xs font-bold uppercase tracking-widest text-ocean">
                Fresh Fish
              </p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-dark sm:text-4xl">
                {item.name}
              </h1>
              <p className="mt-4 text-2xl font-bold text-navy">{item.price}</p>
              <p className="mt-5 text-base leading-relaxed text-dark/70">
                {item.longDescription}
              </p>

              <div className="mt-6 rounded-xl bg-mint/25 p-4 text-sm text-navy">
                <strong className="font-semibold">Freshness &amp; Prep:</strong>{" "}
                {item.freshnessNote}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <WhatsAppButton fishName={item.name} label={`WhatsApp About ${item.name}`} />
                <CallButton />
              </div>

              <p className="mt-8 text-xs text-dark/45">
                Prices may vary slightly day to day. Message us on WhatsApp or call{" "}
                {business.phoneDisplay} to confirm today&apos;s price before visiting.
              </p>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="bg-mint/10 py-16 sm:py-20">
          <Container>
            <h2 className="text-2xl font-bold tracking-tight text-dark sm:text-3xl">
              You May Also Like
            </h2>
            <div className="mt-8">
              <FishGrid items={related} />
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
