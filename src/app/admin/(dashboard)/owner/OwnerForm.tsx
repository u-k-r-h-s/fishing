"use client";

import { useActionState } from "react";
import { saveOwnerAction, type OwnerFormState } from "./actions";
import { FormField, TextInput, TextArea } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { AdminOwnerRow } from "@/lib/data/owner";

const initialState: OwnerFormState = { error: null, success: false };

export function OwnerForm({ owner }: { owner?: AdminOwnerRow }) {
  const [state, formAction] = useActionState(saveOwnerAction, initialState);

  return (
    <form action={formAction} className="max-w-3xl space-y-8">
      {owner && <input type="hidden" name="id" value={owner.id} />}

      {state.error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}
      {state.success && (
        <p role="status" className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          Saved.
        </p>
      )}

      <section className="rounded-xl border border-dark/10 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-dark/50">English</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Name" htmlFor="name_en">
            <TextInput id="name_en" name="name_en" defaultValue={owner?.name_en} required />
          </FormField>
          <FormField label="Role" htmlFor="role_en">
            <TextInput id="role_en" name="role_en" defaultValue={owner?.role_en} placeholder="Founder" />
          </FormField>
          <div className="sm:col-span-2">
            <FormField label="Bio" htmlFor="bio_en">
              <TextArea id="bio_en" name="bio_en" rows={4} defaultValue={owner?.bio_en} />
            </FormField>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-dark/10 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-dark/50">हिन्दी (Hindi)</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Name" htmlFor="name_hi">
            <TextInput id="name_hi" name="name_hi" defaultValue={owner?.name_hi} />
          </FormField>
          <FormField label="Role" htmlFor="role_hi">
            <TextInput id="role_hi" name="role_hi" defaultValue={owner?.role_hi} />
          </FormField>
          <div className="sm:col-span-2">
            <FormField label="Bio" htmlFor="bio_hi">
              <TextArea id="bio_hi" name="bio_hi" rows={4} defaultValue={owner?.bio_hi} />
            </FormField>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-dark/10 bg-white p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ImageUploadField name="image_url" label="Portrait" bucket="owner-images" defaultValue={owner?.image_url} />
          <FormField label="Instagram URL (optional)" htmlFor="instagram_url">
            <TextInput id="instagram_url" name="instagram_url" type="url" defaultValue={owner?.instagram_url} />
          </FormField>
        </div>
      </section>

      <SubmitButton>Save owner profile</SubmitButton>
    </form>
  );
}
