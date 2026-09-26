"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const MAX_BYTES = 5 * 1024 * 1024; // 5MB — images only; large video files should use an external URL instead.
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml", "image/gif"];

/**
 * Uploads directly to Supabase Storage from the browser using the signed-in
 * admin's own session — the `admin_write_site_media` storage policy (see
 * supabase/migrations) is what actually authorizes this, not anything in
 * this component. Writes the resulting public URL into a hidden input
 * (`name`) so it submits with the surrounding <form> as plain text.
 */
export function ImageUploadField({
  name,
  label,
  bucket,
  defaultValue,
  hint,
}: {
  name: string;
  label: string;
  bucket: string;
  defaultValue?: string;
  hint?: string;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setError(null);

    if (!ALLOWED_TYPES.includes(file.type)) {
      setStatus("error");
      setError("Please choose a PNG, JPEG, WebP, GIF, or SVG image.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setStatus("error");
      setError("That file is larger than 5MB — please use a smaller image.");
      return;
    }

    setStatus("uploading");
    const supabase = createClient();
    const extension = file.name.split(".").pop() ?? "bin";
    const path = `${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

    if (uploadError) {
      setStatus("error");
      setError(uploadError.message);
      return;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    setUrl(data.publicUrl);
    setStatus("idle");
  }

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-dark">{label}</label>
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-dark/10 bg-mint/10">
          {url ? (
            <Image src={url} alt="" fill sizes="64px" className="object-cover" />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-xs text-dark/30">
              None
            </span>
          )}
        </div>
        <div className="flex-1">
          <input
            ref={inputRef}
            type="file"
            accept={ALLOWED_TYPES.join(",")}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleFile(file);
            }}
            className="block w-full text-xs text-dark/70 file:mr-3 file:rounded-full file:border-0 file:bg-navy file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-offwhite"
          />
          <p
            className={cn(
              "mt-1 text-xs",
              status === "error" ? "text-red-600" : "text-dark/50"
            )}
          >
            {status === "uploading" ? "Uploading…" : error ?? hint ?? "PNG, JPEG, WebP, GIF, or SVG — up to 5MB."}
          </p>
        </div>
      </div>
      <input type="hidden" name={name} value={url} readOnly />
    </div>
  );
}
