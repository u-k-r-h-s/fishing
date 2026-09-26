"use client";

import { useActionState } from "react";
import Link from "next/link";
import { saveFishAction, type FishFormState } from "./actions";
import { FormField, TextInput, TextArea, Checkbox } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { AdminFishRow } from "@/lib/data/fish";

const initialState: FishFormState = { error: null };

export function FishForm({ fish }: { fish?: AdminFishRow }) {
  const [state, formAction] = useActionState(saveFishAction, initialState);

  return (
    <form action={formAction} className="max-w-3xl space-y-8">
      {fish && <input type="hidden" name="id" value={fish.id} />}

      {state.error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <section className="rounded-xl border border-dark/10 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-dark/50">English</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Name" htmlFor="name_en">
            <TextInput id="name_en" name="name_en" defaultValue={fish?.name_en} required />
          </FormField>
          <FormField label="URL slug" htmlFor="slug" hint="Leave blank to generate from the name.">
            <TextInput id="slug" name="slug" defaultValue={fish?.slug} placeholder="rohu" />
          </FormField>
          <div className="sm:col-span-2">
            <FormField label="Short description (catalogue card)" htmlFor="short_description_en">
              <TextArea id="short_description_en" name="short_description_en" rows={2} defaultValue={fish?.short_description_en} />
            </FormField>
          </div>
          <div className="sm:col-span-2">
            <FormField label="Full description (detail page)" htmlFor="description_en">
              <TextArea id="description_en" name="description_en" rows={4} defaultValue={fish?.description_en} />
            </FormField>
          </div>
          <div className="sm:col-span-2">
            <FormField label="Freshness & prep note" htmlFor="freshness_note_en">
              <TextArea id="freshness_note_en" name="freshness_note_en" rows={2} defaultValue={fish?.freshness_note_en} />
            </FormField>
          </div>
          <FormField label="SEO title (optional)" htmlFor="seo_title_en">
            <TextInput id="seo_title_en" name="seo_title_en" defaultValue={fish?.seo_title_en} />
          </FormField>
          <FormField label="SEO description (optional)" htmlFor="seo_description_en">
            <TextInput id="seo_description_en" name="seo_description_en" defaultValue={fish?.seo_description_en} />
          </FormField>
        </div>
      </section>

      <section className="rounded-xl border border-dark/10 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-dark/50">हिन्दी (Hindi)</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Name" htmlFor="name_hi">
            <TextInput id="name_hi" name="name_hi" defaultValue={fish?.name_hi} />
          </FormField>
          <div />
          <div className="sm:col-span-2">
            <FormField label="Short description" htmlFor="short_description_hi">
              <TextArea id="short_description_hi" name="short_description_hi" rows={2} defaultValue={fish?.short_description_hi} />
            </FormField>
          </div>
          <div className="sm:col-span-2">
            <FormField label="Full description" htmlFor="description_hi">
              <TextArea id="description_hi" name="description_hi" rows={4} defaultValue={fish?.description_hi} />
            </FormField>
          </div>
          <div className="sm:col-span-2">
            <FormField label="Freshness & prep note" htmlFor="freshness_note_hi">
              <TextArea id="freshness_note_hi" name="freshness_note_hi" rows={2} defaultValue={fish?.freshness_note_hi} />
            </FormField>
          </div>
          <FormField label="SEO title (optional)" htmlFor="seo_title_hi">
            <TextInput id="seo_title_hi" name="seo_title_hi" defaultValue={fish?.seo_title_hi} />
          </FormField>
          <FormField label="SEO description (optional)" htmlFor="seo_description_hi">
            <TextInput id="seo_description_hi" name="seo_description_hi" defaultValue={fish?.seo_description_hi} />
          </FormField>
        </div>
      </section>

      <section className="rounded-xl border border-dark/10 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-dark/50">
          Price, Image &amp; Visibility
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Price" htmlFor="price">
            <TextInput id="price" name="price" type="number" step="0.01" min="0" defaultValue={fish?.price} required />
          </FormField>
          <FormField label="Unit" htmlFor="price_unit">
            <TextInput id="price_unit" name="price_unit" defaultValue={fish?.price_unit ?? "kg"} />
          </FormField>
          <FormField label="Display order" htmlFor="display_order" hint="Lower numbers show first.">
            <TextInput id="display_order" name="display_order" type="number" defaultValue={fish?.display_order ?? 0} />
          </FormField>
          <div className="flex items-end gap-6 pb-2">
            <Checkbox label="Available" name="availability" defaultChecked={fish?.availability ?? true} />
            <Checkbox label="Featured on homepage" name="featured" defaultChecked={fish?.featured ?? false} />
          </div>
          <div className="sm:col-span-2">
            <ImageUploadField name="image_url" label="Photo" bucket="fish-images" defaultValue={fish?.image_url} />
          </div>
        </div>
      </section>

      <div className="flex items-center gap-3">
        <SubmitButton>{fish ? "Save changes" : "Add fish"}</SubmitButton>
        <Link href="/admin/fish" className="text-sm font-medium text-dark/60 hover:text-dark">
          Cancel
        </Link>
      </div>
    </form>
  );
}
