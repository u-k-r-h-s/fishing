"use client";

import { useActionState } from "react";
import { saveHeroSectionAction, type HomepageSectionState } from "./actions";
import { TextInput } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { SaveToast } from "@/components/admin/SaveToast";

const initialState: HomepageSectionState = { error: null, success: false };

interface HeroContentJson {
  eyebrow?: { en: string; hi: string };
  headline_line1?: { en: string; hi: string };
  headline_line2?: { en: string; hi: string };
  subheading?: { en: string; hi: string };
  cta_primary_label?: { en: string; hi: string };
  cta_secondary_label?: { en: string; hi: string };
}

export function HeroSectionForm({ content }: { content: HeroContentJson }) {
  const [state, formAction, isPending] = useActionState(saveHeroSectionAction, initialState);

  return (
    <form action={formAction} className="space-y-3">
      <SaveToast success={state.success} error={state.error} pending={isPending} />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <TextInput name="eyebrow_en" placeholder="Eyebrow (English)" defaultValue={content.eyebrow?.en} />
        <TextInput name="eyebrow_hi" placeholder="Eyebrow (Hindi)" defaultValue={content.eyebrow?.hi} />
        <TextInput name="headline_line1_en" placeholder="Headline line 1 (English)" defaultValue={content.headline_line1?.en} />
        <TextInput name="headline_line1_hi" placeholder="Headline line 1 (Hindi)" defaultValue={content.headline_line1?.hi} />
        <TextInput name="headline_line2_en" placeholder="Headline line 2 (English)" defaultValue={content.headline_line2?.en} />
        <TextInput name="headline_line2_hi" placeholder="Headline line 2 (Hindi)" defaultValue={content.headline_line2?.hi} />
        <TextInput name="subheading_en" placeholder="Subheading (English)" defaultValue={content.subheading?.en} />
        <TextInput name="subheading_hi" placeholder="Subheading (Hindi)" defaultValue={content.subheading?.hi} />
        <TextInput name="cta_primary_label_en" placeholder="Primary CTA label (English)" defaultValue={content.cta_primary_label?.en} />
        <TextInput name="cta_primary_label_hi" placeholder="Primary CTA label (Hindi)" defaultValue={content.cta_primary_label?.hi} />
        <TextInput name="cta_secondary_label_en" placeholder="Secondary CTA label (English)" defaultValue={content.cta_secondary_label?.en} />
        <TextInput name="cta_secondary_label_hi" placeholder="Secondary CTA label (Hindi)" defaultValue={content.cta_secondary_label?.hi} />
      </div>
      <SubmitButton>Save hero</SubmitButton>
    </form>
  );
}
