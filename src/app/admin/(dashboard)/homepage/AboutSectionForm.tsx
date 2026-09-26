"use client";

import { useActionState } from "react";
import { saveAboutSectionAction, type HomepageSectionState } from "./actions";
import { TextInput } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { GalleryUploadField } from "@/components/admin/GalleryUploadField";
import { ParagraphsEditor } from "./ParagraphsEditor";

const initialState: HomepageSectionState = { error: null, success: false };

interface Json {
  heading?: { en: string; hi: string };
  paragraphs?: { en?: string[]; hi?: string[] };
  image_url?: string;
  image_alt?: string;
  gallery_images?: string[];
}

export function AboutSectionForm({ content }: { content: Json }) {
  const [state, formAction] = useActionState(saveAboutSectionAction, initialState);

  const en = content.paragraphs?.en ?? [];
  const hi = content.paragraphs?.hi ?? [];
  const paragraphPairs = en.map((text, i) => ({ en: text, hi: hi[i] ?? "" }));

  return (
    <form action={formAction} className="space-y-4">
      {state.error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>}
      {state.success && <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">Saved.</p>}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <TextInput name="heading_en" placeholder="Heading (English)" defaultValue={content.heading?.en} />
        <TextInput name="heading_hi" placeholder="Heading (Hindi)" defaultValue={content.heading?.hi} />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-dark">Story paragraphs</p>
        <ParagraphsEditor fieldName="paragraphs_json" defaultValue={paragraphPairs} />
      </div>

      <ImageUploadField name="image_url" label="Image" bucket="site-assets" defaultValue={content.image_url} />
      <TextInput name="image_alt" placeholder="Image alt text" defaultValue={content.image_alt} />

      <div>
        <p className="mb-2 text-sm font-medium text-dark">
          Land / premises gallery (shown as a slider on the About page)
        </p>
        <GalleryUploadField
          fieldName="gallery_images_json"
          bucket="site-assets"
          defaultValue={content.gallery_images ?? []}
        />
      </div>

      <SubmitButton>Save about section</SubmitButton>
    </form>
  );
}
