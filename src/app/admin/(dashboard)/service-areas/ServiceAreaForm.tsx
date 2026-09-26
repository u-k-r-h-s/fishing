"use client";

import { useActionState } from "react";
import Link from "next/link";
import { saveServiceAreaAction, type ServiceAreaFormState } from "./actions";
import { FormField, TextInput, TextArea, Checkbox } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import type { AdminServiceAreaRow } from "@/lib/data/serviceAreas";

const initialState: ServiceAreaFormState = { error: null };

export function ServiceAreaForm({ serviceArea }: { serviceArea?: AdminServiceAreaRow }) {
  const [state, formAction] = useActionState(saveServiceAreaAction, initialState);

  return (
    <form action={formAction} className="max-w-2xl space-y-8">
      {serviceArea && <input type="hidden" name="id" value={serviceArea.id} />}

      {state.error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <section className="rounded-xl border border-dark/10 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-dark/50">English</h2>
        <div className="mt-4 space-y-4">
          <FormField label="Area name" htmlFor="name_en">
            <TextInput id="name_en" name="name_en" defaultValue={serviceArea?.name_en} required />
          </FormField>
          <FormField label="Description (optional)" htmlFor="description_en">
            <TextArea id="description_en" name="description_en" rows={2} defaultValue={serviceArea?.description_en} />
          </FormField>
        </div>
      </section>

      <section className="rounded-xl border border-dark/10 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-dark/50">हिन्दी (Hindi)</h2>
        <div className="mt-4 space-y-4">
          <FormField label="Area name" htmlFor="name_hi">
            <TextInput id="name_hi" name="name_hi" defaultValue={serviceArea?.name_hi} />
          </FormField>
          <FormField label="Description (optional)" htmlFor="description_hi">
            <TextArea id="description_hi" name="description_hi" rows={2} defaultValue={serviceArea?.description_hi} />
          </FormField>
        </div>
      </section>

      <section className="rounded-xl border border-dark/10 bg-white p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Display order" htmlFor="display_order">
            <TextInput id="display_order" name="display_order" type="number" defaultValue={serviceArea?.display_order ?? 0} />
          </FormField>
          <div className="flex items-end pb-2">
            <Checkbox label="Active" name="active" defaultChecked={serviceArea?.active ?? true} />
          </div>
        </div>
      </section>

      <div className="flex items-center gap-3">
        <SubmitButton>{serviceArea ? "Save changes" : "Add area"}</SubmitButton>
        <Link href="/admin/service-areas" className="text-sm font-medium text-dark/60 hover:text-dark">
          Cancel
        </Link>
      </div>
    </form>
  );
}
