import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center py-20">
      <Container className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ocean">404</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-dark sm:text-4xl">
          We couldn&apos;t find that page
        </h1>
        <p className="mx-auto mt-4 max-w-md text-dark/60">
          The fish or page you&apos;re looking for may have moved. Browse our full fresh fish
          catalogue or message us directly.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/fresh-fish"
            className="inline-flex items-center justify-center rounded-full bg-navy px-6 py-3 text-sm font-semibold text-offwhite hover:bg-ocean"
          >
            Browse Fresh Fish
          </Link>
          <WhatsAppButton variant="outline" />
        </div>
      </Container>
    </section>
  );
}
