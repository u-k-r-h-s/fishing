"use client";

import { useActionState } from "react";
import Link from "next/link";
import { saveTestimonialAction, type TestimonialFormState } from "./actions";
import { FormField, TextInput, TextArea, Checkbox, Select } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { AdminTestimonialRow } from "@/lib/data/testimonials";

const initialState: TestimonialFormState = { error: null };

export function TestimonialForm({ testimonial }: { testimonial?: AdminTestimonialRow }) {
  const [state, formAction] = useActionState(saveTestimonialAction, initialState);

  return (
    <form action={formAction} className="max-w-3xl space-y-8">
      {testimonial && <input type="hidden" name="id" value={testimonial.id} />}

      {state.error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <section className="rounded-xl border border-dark/10 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-dark/50">Customer</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Name" htmlFor="customer_name">
            <TextInput id="customer_name" name="customer_name" defaultValue={testimonial?.customer_name} required />
          </FormField>
          <FormField label="Rating" htmlFor="rating">
            <Select id="rating" name="rating" defaultValue={String(testimonial?.rating ?? 5)}>
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} star{n === 1 ? "" : "s"}
                </option>
              ))}
            </Select>
          </FormField>
        </div>
      </section>

      <section className="rounded-xl border border-dark/10 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-dark/50">English</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Role (e.g. Regular Customer)" htmlFor="role_en">
            <TextInput id="role_en" name="role_en" defaultValue={testimonial?.role_en} />
          </FormField>
          <div />
          <div className="sm:col-span-2">
            <FormField label="Quote" htmlFor="content_en">
              <TextArea id="content_en" name="content_en" rows={3} defaultValue={testimonial?.content_en} />
            </FormField>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-dark/10 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-dark/50">हिन्दी (Hindi)</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Role" htmlFor="role_hi">
            <TextInput id="role_hi" name="role_hi" defaultValue={testimonial?.role_hi} />
          </FormField>
          <div />
          <div className="sm:col-span-2">
            <FormField label="Quote" htmlFor="content_hi">
              <TextArea id="content_hi" name="content_hi" rows={3} defaultValue={testimonial?.content_hi} />
            </FormField>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-dark/10 bg-white p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ImageUploadField name="image_url" label="Photo (optional)" bucket="site-assets" defaultValue={testimonial?.image_url} />
          <div className="grid grid-cols-2 gap-4 sm:col-span-1">
            <FormField label="Display order" htmlFor="display_order">
              <TextInput id="display_order" name="display_order" type="number" defaultValue={testimonial?.display_order ?? 0} />
            </FormField>
            <div className="flex items-end pb-2">
              <Checkbox label="Active" name="active" defaultChecked={testimonial?.active ?? true} />
            </div>
          </div>
        </div>
      </section>

      <div className="flex items-center gap-3">
        <SubmitButton>{testimonial ? "Save changes" : "Add testimonial"}</SubmitButton>
        <Link href="/admin/testimonials" className="text-sm font-medium text-dark/60 hover:text-dark">
          Cancel
        </Link>
      </div>
    </form>
  );
}
