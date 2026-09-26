"use client";

import { useActionState } from "react";
import Link from "next/link";
import { saveReelAction, type ReelFormState } from "./actions";
import { FormField, TextInput, TextArea, Checkbox, Select } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { VideoUploadField } from "@/components/admin/VideoUploadField";
import type { AdminReelRow } from "@/lib/data/social";

const initialState: ReelFormState = { error: null };

export function ReelForm({ reel }: { reel?: AdminReelRow }) {
  const [state, formAction] = useActionState(saveReelAction, initialState);

  return (
    <form action={formAction} className="max-w-3xl space-y-8">
      {reel && <input type="hidden" name="id" value={reel.id} />}

      {state.error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <section className="rounded-xl border border-dark/10 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-dark/50">English</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Title" htmlFor="title_en">
            <TextInput id="title_en" name="title_en" defaultValue={reel?.title_en} required />
          </FormField>
          <div />
          <div className="sm:col-span-2">
            <FormField label="Caption" htmlFor="caption_en">
              <TextArea id="caption_en" name="caption_en" rows={2} defaultValue={reel?.caption_en} />
            </FormField>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-dark/10 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-dark/50">हिन्दी (Hindi)</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Title" htmlFor="title_hi">
            <TextInput id="title_hi" name="title_hi" defaultValue={reel?.title_hi} />
          </FormField>
          <div />
          <div className="sm:col-span-2">
            <FormField label="Caption" htmlFor="caption_hi">
              <TextArea id="caption_hi" name="caption_hi" rows={2} defaultValue={reel?.caption_hi} />
            </FormField>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-dark/10 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-dark/50">Media &amp; Visibility</h2>
        <div className="mt-4 grid grid-cols-1 gap-4">
          <VideoUploadField name="video_url" label="Reel video (9:16 recommended)" bucket="reel-uploads" defaultValue={reel?.video_url} />
          <ImageUploadField name="thumbnail_url" label="Thumbnail" bucket="reel-thumbnails" defaultValue={reel?.thumbnail_url} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Platform" htmlFor="platform">
              <Select id="platform" name="platform" defaultValue={reel?.platform ?? "instagram"}>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="youtube">YouTube</option>
              </Select>
            </FormField>
            <FormField label="Link to the real post (optional)" htmlFor="social_url">
              <TextInput id="social_url" name="social_url" type="url" defaultValue={reel?.social_url} placeholder="https://instagram.com/p/..." />
            </FormField>
            <FormField label="Display order" htmlFor="display_order">
              <TextInput id="display_order" name="display_order" type="number" defaultValue={reel?.display_order ?? 0} />
            </FormField>
            <div className="flex items-end pb-2">
              <Checkbox label="Active" name="active" defaultChecked={reel?.active ?? true} />
            </div>
          </div>
        </div>
      </section>

      <div className="flex items-center gap-3">
        <SubmitButton>{reel ? "Save changes" : "Add reel"}</SubmitButton>
        <Link href="/admin/reels" className="text-sm font-medium text-dark/60 hover:text-dark">
          Cancel
        </Link>
      </div>
    </form>
  );
}
