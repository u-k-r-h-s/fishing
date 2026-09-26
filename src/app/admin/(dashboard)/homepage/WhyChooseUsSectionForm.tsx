"use client";

import { useActionState } from "react";
import { saveWhyChooseUsSectionAction, type HomepageSectionState } from "./actions";
import { TextInput } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { IconedListEditor } from "./IconedListEditor";

const initialState: HomepageSectionState = { error: null, success: false };

interface Json {
  eyebrow?: { en: string; hi: string };
  heading?: { en: string; hi: string };
  items?: Array<{ icon: string; title: { en: string; hi: string }; description: { en: string; hi: string } }>;
}

export function WhyChooseUsSectionForm({ content }: { content: Json }) {
  const [state, formAction] = useActionState(saveWhyChooseUsSectionAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      {state.error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>}
      {state.success && <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">Saved.</p>}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <TextInput name="eyebrow_en" placeholder="Eyebrow (English)" defaultValue={content.eyebrow?.en} />
        <TextInput name="eyebrow_hi" placeholder="Eyebrow (Hindi)" defaultValue={content.eyebrow?.hi} />
        <TextInput name="heading_en" placeholder="Heading (English)" defaultValue={content.heading?.en} />
        <TextInput name="heading_hi" placeholder="Heading (Hindi)" defaultValue={content.heading?.hi} />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-dark">Items</p>
        <IconedListEditor fieldName="items_json" defaultValue={content.items ?? []} />
      </div>

      <SubmitButton>Save why-choose-us</SubmitButton>
    </form>
  );
}
