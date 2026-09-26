"use client";

import { useActionState } from "react";
import Link from "next/link";
import { saveOfferAction, type OfferFormState } from "./actions";
import { FormField, TextInput, TextArea, Checkbox } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { AdminOfferRow } from "@/lib/data/offers";

const initialState: OfferFormState = { error: null };

export function OfferForm({ offer }: { offer?: AdminOfferRow }) {
  const [state, formAction] = useActionState(saveOfferAction, initialState);

  return (
    <form action={formAction} className="max-w-3xl space-y-8">
      {offer && <input type="hidden" name="id" value={offer.id} />}

      {state.error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <section className="rounded-xl border border-dark/10 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-dark/50">English</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Title" htmlFor="title_en">
            <TextInput id="title_en" name="title_en" defaultValue={offer?.title_en} required />
          </FormField>
          <FormField label="Badge text (optional)" htmlFor="discount_text_en">
            <TextInput id="discount_text_en" name="discount_text_en" defaultValue={offer?.discount_text_en} placeholder="This Weekend" />
          </FormField>
          <div className="sm:col-span-2">
            <FormField label="Description" htmlFor="description_en">
              <TextArea id="description_en" name="description_en" rows={3} defaultValue={offer?.description_en} />
            </FormField>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-dark/10 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-dark/50">हिन्दी (Hindi)</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Title" htmlFor="title_hi">
            <TextInput id="title_hi" name="title_hi" defaultValue={offer?.title_hi} />
          </FormField>
          <FormField label="Badge text (optional)" htmlFor="discount_text_hi">
            <TextInput id="discount_text_hi" name="discount_text_hi" defaultValue={offer?.discount_text_hi} />
          </FormField>
          <div className="sm:col-span-2">
            <FormField label="Description" htmlFor="description_hi">
              <TextArea id="description_hi" name="description_hi" rows={3} defaultValue={offer?.description_hi} />
            </FormField>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-dark/10 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-dark/50">Scheduling &amp; Visibility</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Start date (optional)" htmlFor="start_date">
            <TextInput id="start_date" name="start_date" type="date" defaultValue={offer?.start_date ?? ""} />
          </FormField>
          <FormField label="End date (optional)" htmlFor="end_date">
            <TextInput id="end_date" name="end_date" type="date" defaultValue={offer?.end_date ?? ""} />
          </FormField>
          <FormField label="Display order" htmlFor="display_order">
            <TextInput id="display_order" name="display_order" type="number" defaultValue={offer?.display_order ?? 0} />
          </FormField>
          <div className="flex items-end gap-6 pb-2">
            <Checkbox label="Active" name="active" defaultChecked={offer?.active ?? true} />
            <Checkbox label="Featured" name="featured" defaultChecked={offer?.featured ?? false} />
          </div>
          <div className="sm:col-span-2">
            <ImageUploadField name="image_url" label="Banner image (optional)" bucket="offer-images" defaultValue={offer?.image_url} />
          </div>
        </div>
      </section>

      <div className="flex items-center gap-3">
        <SubmitButton>{offer ? "Save changes" : "Add offer"}</SubmitButton>
        <Link href="/admin/offers" className="text-sm font-medium text-dark/60 hover:text-dark">
          Cancel
        </Link>
      </div>
    </form>
  );
}
