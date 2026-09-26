"use client";

import { useActionState } from "react";
import Link from "next/link";
import { saveFaqAction, type FaqFormState } from "./actions";
import { FormField, TextInput, TextArea, Checkbox } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import type { AdminFaqRow } from "@/lib/data/faqs";

const initialState: FaqFormState = { error: null };

export function FaqForm({ faq }: { faq?: AdminFaqRow }) {
  const [state, formAction] = useActionState(saveFaqAction, initialState);

  return (
    <form action={formAction} className="max-w-3xl space-y-8">
      {faq && <input type="hidden" name="id" value={faq.id} />}

      {state.error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <section className="rounded-xl border border-dark/10 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-dark/50">English</h2>
        <div className="mt-4 space-y-4">
          <FormField label="Question" htmlFor="question_en">
            <TextInput id="question_en" name="question_en" defaultValue={faq?.question_en} required />
          </FormField>
          <FormField label="Answer" htmlFor="answer_en">
            <TextArea id="answer_en" name="answer_en" rows={3} defaultValue={faq?.answer_en} />
          </FormField>
        </div>
      </section>

      <section className="rounded-xl border border-dark/10 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-dark/50">हिन्दी (Hindi)</h2>
        <div className="mt-4 space-y-4">
          <FormField label="Question" htmlFor="question_hi">
            <TextInput id="question_hi" name="question_hi" defaultValue={faq?.question_hi} />
          </FormField>
          <FormField label="Answer" htmlFor="answer_hi">
            <TextArea id="answer_hi" name="answer_hi" rows={3} defaultValue={faq?.answer_hi} />
          </FormField>
        </div>
      </section>

      <section className="rounded-xl border border-dark/10 bg-white p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Display order" htmlFor="display_order">
            <TextInput id="display_order" name="display_order" type="number" defaultValue={faq?.display_order ?? 0} />
          </FormField>
          <div className="flex items-end pb-2">
            <Checkbox label="Active" name="active" defaultChecked={faq?.active ?? true} />
          </div>
        </div>
      </section>

      <div className="flex items-center gap-3">
        <SubmitButton>{faq ? "Save changes" : "Add FAQ"}</SubmitButton>
        <Link href="/admin/faqs" className="text-sm font-medium text-dark/60 hover:text-dark">
          Cancel
        </Link>
      </div>
    </form>
  );
}
