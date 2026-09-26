"use client";

import { useActionState } from "react";
import { saveFreshnessPromiseSectionAction, type HomepageSectionState } from "./actions";
import { TextInput, TextArea } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { SaveToast } from "@/components/admin/SaveToast";

const initialState: HomepageSectionState = { error: null, success: false };

interface Json {
  eyebrow?: { en: string; hi: string };
  heading?: { en: string; hi: string };
  statement?: { en: string; hi: string };
}

export function FreshnessPromiseSectionForm({ content }: { content: Json }) {
  const [state, formAction, isPending] = useActionState(saveFreshnessPromiseSectionAction, initialState);

  return (
    <form action={formAction} className="space-y-3">
      <SaveToast success={state.success} error={state.error} pending={isPending} />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <TextInput name="eyebrow_en" placeholder="Eyebrow (English)" defaultValue={content.eyebrow?.en} />
        <TextInput name="eyebrow_hi" placeholder="Eyebrow (Hindi)" defaultValue={content.eyebrow?.hi} />
        <TextInput name="heading_en" placeholder="Heading (English)" defaultValue={content.heading?.en} />
        <TextInput name="heading_hi" placeholder="Heading (Hindi)" defaultValue={content.heading?.hi} />
        <TextArea name="statement_en" placeholder="Statement (English)" rows={3} defaultValue={content.statement?.en} />
        <TextArea name="statement_hi" placeholder="Statement (Hindi)" rows={3} defaultValue={content.statement?.hi} />
      </div>
      <SubmitButton>Save freshness promise</SubmitButton>
    </form>
  );
}
