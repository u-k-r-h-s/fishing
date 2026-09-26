import Image from "next/image";
import Link from "next/link";
import { aboutContent } from "@/data/content";
import { Container } from "@/components/shared/Container";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ImageReveal } from "@/components/animations/ImageReveal";

export function AboutSection() {
  return (
    <section className="py-20 sm:py-24">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <ImageReveal className="relative order-1 aspect-[4/3] w-full rounded-[1.75rem] shadow-lg lg:order-none">
          <Image
            src={aboutContent.image}
            alt={aboutContent.imageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </ImageReveal>

        <ScrollReveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-ocean">
            {aboutContent.eyebrow}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">
            {aboutContent.heading}
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-dark/70">
            {aboutContent.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <Link
            href="/about"
            className="mt-7 inline-flex items-center text-sm font-semibold text-ocean hover:text-navy"
          >
            Learn more about us &rarr;
          </Link>
        </ScrollReveal>
      </Container>
    </section>
  );
}
