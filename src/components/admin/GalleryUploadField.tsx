"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];
const MAX_IMAGES = 10;

/**
 * A variable-length (0-10) list of images, e.g. the About page's land/
 * premises gallery. Each image uploads the same way ImageUploadField does
 * (direct-to-Storage from the admin's own browser session); the resulting
 * URL list is serialized into one hidden JSON input (`fieldName`), matching
 * the pattern ParagraphsEditor uses for its own JSON-list field.
 */
export function GalleryUploadField({
  fieldName,
  bucket,
  defaultValue,
  minImages,
}: {
  fieldName: string;
  bucket: string;
  defaultValue: string[];
  /** When set, shows how many more photos are needed until this component's own hint text is satisfied — the caller (the surrounding form) is still responsible for actually blocking submission. */
  minImages?: number;
}) {
  const [urls, setUrls] = useState<string[]>(defaultValue);
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(files: FileList) {
    setError(null);
    const remaining = MAX_IMAGES - urls.length;
    if (remaining <= 0) {
      setStatus("error");
      setError(`You can have up to ${MAX_IMAGES} images — remove one before adding another.`);
      return;
    }

    const toUpload = Array.from(files).slice(0, remaining);
    setStatus("uploading");
    const supabase = createClient();
    const uploaded: string[] = [];

    for (const file of toUpload) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setStatus("error");
        setError(`"${file.name}" isn't a PNG, JPEG, WebP, or GIF — skipped.`);
        continue;
      }
      if (file.size > MAX_BYTES) {
        setStatus("error");
        setError(`"${file.name}" is larger than 5MB — skipped.`);
        continue;
      }

      const extension = file.name.split(".").pop() ?? "bin";
      const path = `${crypto.randomUUID()}.${extension}`;
      const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });

      if (uploadError) {
        setStatus("error");
        setError(uploadError.message);
        continue;
      }

      const { data } = supabase.storage.from(bucket).getPublicUrl(path);
      uploaded.push(data.publicUrl);
    }

    if (uploaded.length > 0) {
      setUrls((prev) => [...prev, ...uploaded]);
      if (status !== "error") setStatus("idle");
    } else if (status !== "error") {
      setStatus("idle");
    }
  }

  function remove(index: number) {
    setUrls((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
        {urls.map((url, index) => (
          <div key={url} className="group relative aspect-square overflow-hidden rounded-lg border border-dark/10">
            <Image src={url} alt="" fill sizes="120px" className="object-cover" />
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-dark/70 text-xs font-bold text-offwhite opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Remove image"
            >
              ×
            </button>
          </div>
        ))}

        {urls.length < MAX_IMAGES && (
          <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-dark/20 text-dark/50 hover:border-aqua hover:text-ocean">
            <span className="text-2xl leading-none">+</span>
            <span className="text-xs">Add</span>
            <input
              type="file"
              accept={ALLOWED_TYPES.join(",")}
              multiple
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) void handleFiles(e.target.files);
                e.target.value = "";
              }}
            />
          </label>
        )}
      </div>

      <p
        className={cn(
          "mt-2 text-xs",
          status === "error" || (minImages !== undefined && urls.length < minImages)
            ? "text-red-600"
            : "text-dark/50"
        )}
      >
        {status === "uploading"
          ? "Uploading…"
          : error ??
            (minImages !== undefined && urls.length < minImages
              ? `${urls.length}/${MAX_IMAGES} images — at least ${minImages} required (${minImages - urls.length} more needed).`
              : `${urls.length}/${MAX_IMAGES} images — PNG, JPEG, WebP, or GIF, up to 5MB each.`)}
      </p>

      <input type="hidden" name={fieldName} value={JSON.stringify(urls)} readOnly />
    </div>
  );
}
