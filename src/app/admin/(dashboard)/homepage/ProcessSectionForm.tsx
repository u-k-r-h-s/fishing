"use client";

import { useActionState } from "react";
import { saveProcessSectionAction, type HomepageSectionState } from "./actions";
import { TextInput, TextArea } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { SaveToast } from "@/components/admin/SaveToast";
import { IconedListEditor } from "./IconedListEditor";

const initialState: HomepageSectionState = { error: null, success: false };

interface Json {
  eyebrow?: { en: string; hi: string };
  heading?: { en: string; hi: string };
  description?: { en: string; hi: string };
  steps?: Array<{ icon: string; title: { en: string; hi: string }; description: { en: string; hi: string } }>;
}

export function ProcessSectionForm({ content }: { content: Json }) {
  const [state, formAction, isPending] = useActionState(saveProcessSectionAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <SaveToast success={state.success} error={state.error} pending={isPending} />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <TextInput name="eyebrow_en" placeholder="Eyebrow (English)" defaultValue={content.eyebrow?.en} />
        <TextInput name="eyebrow_hi" placeholder="Eyebrow (Hindi)" defaultValue={content.eyebrow?.hi} />
        <TextInput name="heading_en" placeholder="Heading (English)" defaultValue={content.heading?.en} />
        <TextInput name="heading_hi" placeholder="Heading (Hindi)" defaultValue={content.heading?.hi} />
        <TextArea name="description_en" placeholder="Description (English)" rows={2} defaultValue={content.description?.en} />
        <TextArea name="description_hi" placeholder="Description (Hindi)" rows={2} defaultValue={content.description?.hi} />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-dark">Steps</p>
        <IconedListEditor fieldName="steps_json" defaultValue={content.steps ?? []} />
      </div>

      <SubmitButton>Save process section</SubmitButton>
    </form>
  );
}
