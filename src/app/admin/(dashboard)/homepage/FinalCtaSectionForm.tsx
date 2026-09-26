"use client";

import { useActionState } from "react";
import { saveFinalCtaSectionAction, type HomepageSectionState } from "./actions";
import { TextInput, TextArea } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";

const initialState: HomepageSectionState = { error: null, success: false };

interface Json {
  heading?: { en: string; hi: string };
  description?: { en: string; hi: string };
}

export function FinalCtaSectionForm({ content }: { content: Json }) {
  const [state, formAction] = useActionState(saveFinalCtaSectionAction, initialState);

  return (
    <form action={formAction} className="space-y-3">
      {state.error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>}
      {state.success && <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">Saved.</p>}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <TextInput name="heading_en" placeholder="Heading (English)" defaultValue={content.heading?.en} />
        <TextInput name="heading_hi" placeholder="Heading (Hindi)" defaultValue={content.heading?.hi} />
        <TextArea
          name="description_en"
          placeholder="Description (English) — use {business} for the business name"
          rows={2}
          defaultValue={content.description?.en}
        />
        <TextArea
          name="description_hi"
          placeholder="Description (Hindi) — use {business} for the business name"
          rows={2}
          defaultValue={content.description?.hi}
        />
      </div>
      <SubmitButton>Save final CTA</SubmitButton>
    </form>
  );
}
