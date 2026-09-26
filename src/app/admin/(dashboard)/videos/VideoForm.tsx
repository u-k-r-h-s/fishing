"use client";

import { useActionState } from "react";
import Link from "next/link";
import { saveVideoAction, type VideoFormState } from "./actions";
import { FormField, TextInput, TextArea, Checkbox } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { VideoUploadField } from "@/components/admin/VideoUploadField";
import type { AdminVideoRow } from "@/lib/data/videos";

const initialState: VideoFormState = { error: null };

export function VideoForm({ video }: { video?: AdminVideoRow }) {
  const [state, formAction] = useActionState(saveVideoAction, initialState);

  return (
    <form action={formAction} className="max-w-3xl space-y-8">
      {video && <input type="hidden" name="id" value={video.id} />}

      {state.error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <section className="rounded-xl border border-dark/10 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-dark/50">English</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Title" htmlFor="title_en">
            <TextInput id="title_en" name="title_en" defaultValue={video?.title_en} required />
          </FormField>
          <div />
          <div className="sm:col-span-2">
            <FormField label="Description" htmlFor="description_en">
              <TextArea id="description_en" name="description_en" rows={2} defaultValue={video?.description_en} />
            </FormField>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-dark/10 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-dark/50">हिन्दी (Hindi)</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Title" htmlFor="title_hi">
            <TextInput id="title_hi" name="title_hi" defaultValue={video?.title_hi} />
          </FormField>
          <div />
          <div className="sm:col-span-2">
            <FormField label="Description" htmlFor="description_hi">
              <TextArea id="description_hi" name="description_hi" rows={2} defaultValue={video?.description_hi} />
            </FormField>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-dark/10 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-dark/50">Video &amp; Visibility</h2>
        <div className="mt-4 grid grid-cols-1 gap-4">
          <VideoUploadField name="video_url" label="Video URL" bucket="video-uploads" defaultValue={video?.video_url} />
          <ImageUploadField name="poster_url" label="Poster image" bucket="video-posters" defaultValue={video?.poster_url} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Display order" htmlFor="display_order">
              <TextInput id="display_order" name="display_order" type="number" defaultValue={video?.display_order ?? 0} />
            </FormField>
            <div className="flex items-end gap-6 pb-2">
              <Checkbox label="Active" name="active" defaultChecked={video?.active ?? true} />
              <Checkbox label="Featured (main video)" name="featured" defaultChecked={video?.featured ?? false} />
            </div>
          </div>
        </div>
      </section>

      <div className="flex items-center gap-3">
        <SubmitButton>{video ? "Save changes" : "Add video"}</SubmitButton>
        <Link href="/admin/videos" className="text-sm font-medium text-dark/60 hover:text-dark">
          Cancel
        </Link>
      </div>
    </form>
  );
}
