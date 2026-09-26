"use client";

import { useActionState } from "react";
import { saveAboutSectionAction, type HomepageSectionState } from "./actions";
import { TextInput, TextArea } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { SaveToast } from "@/components/admin/SaveToast";
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
  gallery_heading?: { en: string; hi: string };
  gallery_description?: { en: string; hi: string };
}

export function AboutSectionForm({ content }: { content: Json }) {
  const [state, formAction, isPending] = useActionState(saveAboutSectionAction, initialState);

  const en = content.paragraphs?.en ?? [];
  const hi = content.paragraphs?.hi ?? [];
  const paragraphPairs = en.map((text, i) => ({ en: text, hi: hi[i] ?? "" }));

  return (
    <form action={formAction} className="space-y-4">
      <SaveToast success={state.success} error={state.error} pending={isPending} />

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

      <div className="border-t border-dark/10 pt-4">
        <p className="mb-2 text-sm font-medium text-dark">
          Land / premises gallery (shown as a slider on the About page)
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <TextInput
            name="gallery_heading_en"
            placeholder="Gallery heading (English) — optional, defaults to a generic one"
            defaultValue={content.gallery_heading?.en}
          />
          <TextInput
            name="gallery_heading_hi"
            placeholder="Gallery heading (Hindi)"
            defaultValue={content.gallery_heading?.hi}
          />
          <TextArea
            name="gallery_description_en"
            placeholder="Gallery description (English) — optional, write about your land here"
            rows={3}
            defaultValue={content.gallery_description?.en}
          />
          <TextArea
            name="gallery_description_hi"
            placeholder="Gallery description (Hindi)"
            rows={3}
            defaultValue={content.gallery_description?.hi}
          />
        </div>
        <div className="mt-3">
          <GalleryUploadField
            fieldName="gallery_images_json"
            bucket="site-assets"
            defaultValue={content.gallery_images ?? []}
          />
        </div>
      </div>

      <SubmitButton>Save about section</SubmitButton>
    </form>
  );
}
