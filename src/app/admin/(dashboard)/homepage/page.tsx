import { adminListHomepageContent } from "@/lib/data/homepage";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { HeroSectionForm } from "./HeroSectionForm";
import { FreshnessPromiseSectionForm } from "./FreshnessPromiseSectionForm";
import { ProcessSectionForm } from "./ProcessSectionForm";
import { AboutSectionForm } from "./AboutSectionForm";
import { WhyChooseUsSectionForm } from "./WhyChooseUsSectionForm";
import { FinalCtaSectionForm } from "./FinalCtaSectionForm";

export const metadata = { robots: { index: false, follow: false } };

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="rounded-xl border border-dark/10 bg-white p-5" open>
      <summary className="cursor-pointer text-sm font-semibold uppercase tracking-wide text-dark/50">
        {title}
      </summary>
      <div className="mt-4">{children}</div>
    </details>
  );
}

export default async function AdminHomepagePage() {
  const rows = await adminListHomepageContent();
  const contentFor = (key: string) => (rows.find((r) => r.section_key === key)?.content ?? {}) as Record<string, unknown>;

  return (
    <div className="max-w-3xl space-y-5">
      <AdminPageHeader
        title="Homepage Content"
        description="Editable copy blocks used across the homepage — each section saves independently."
      />

      <Section title="Hero">
        <HeroSectionForm content={contentFor("hero")} />
      </Section>
      <Section title="Freshness Promise">
        <FreshnessPromiseSectionForm content={contentFor("freshness_promise")} />
      </Section>
      <Section title="Process ('From Catch to Kitchen')">
        <ProcessSectionForm content={contentFor("process")} />
      </Section>
      <Section title="About / Our Story">
        <AboutSectionForm content={contentFor("about")} />
      </Section>
      <Section title="Why Choose Us">
        <WhyChooseUsSectionForm content={contentFor("why_choose_us")} />
      </Section>
      <Section title="Final Call to Action">
        <FinalCtaSectionForm content={contentFor("final_cta")} />
      </Section>
    </div>
  );
}
