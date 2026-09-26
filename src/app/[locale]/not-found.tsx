import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { getDictionary } from "@/i18n/getDictionary";
import { defaultLocale } from "@/i18n/locales";
import { localizedPath } from "@/lib/utils";

/**
 * Note: Next.js renders `not-found.tsx` without resolving the dynamic
 * `[locale]` segment's params, so this always renders in the default
 * locale. This still sits inside the `[locale]/layout.tsx` chrome
 * (navbar/footer), which does resolve the real locale.
 */
export default function NotFound() {
  const locale = defaultLocale;
  const dict = getDictionary(locale);

  return (
    <section className="flex min-h-[60vh] items-center py-20">
      <Container className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ocean">
          {dict.notFound.eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-dark sm:text-4xl">
          {dict.notFound.heading}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-dark/60">{dict.notFound.description}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={localizedPath(locale, "/fresh-fish")}
            className="inline-flex items-center justify-center rounded-full bg-navy px-6 py-3 text-sm font-semibold text-offwhite hover:bg-ocean"
          >
            {dict.notFound.browse}
          </Link>
          <WhatsAppButton locale={locale} variant="outline" />
        </div>
      </Container>
    </section>
  );
}
