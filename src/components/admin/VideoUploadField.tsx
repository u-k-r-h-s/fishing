"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const MAX_BYTES = 50 * 1024 * 1024; // 50MB — for anything larger, use an external URL (YouTube, Vimeo, a CDN) instead.
const ALLOWED_TYPES = ["video/mp4", "video/webm", "video/quicktime"];

/**
 * A plain URL field (works with any external video host) plus an optional
 * direct upload to Supabase Storage for shorter clips. Mirrors
 * ImageUploadField's upload mechanics — see that file for the security
 * note (this is authorized by the `admin_write_site_media` storage policy,
 * not by anything client-side).
 */
export function VideoUploadField({
  name,
  label,
  bucket,
  defaultValue,
}: {
  name: string;
  label: string;
  bucket: string;
  defaultValue?: string;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);

    if (!ALLOWED_TYPES.includes(file.type)) {
      setStatus("error");
      setError("Please choose an MP4, WebM, or MOV file.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setStatus("error");
      setError("That file is larger than 50MB — paste an external URL (YouTube, Vimeo, a CDN) instead.");
      return;
    }

    setStatus("uploading");
    const supabase = createClient();
    const extension = file.name.split(".").pop() ?? "mp4";
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
      <label htmlFor={`${name}-url`} className="mb-1 block text-sm font-medium text-dark">
        {label}
      </label>
      <input
        id={`${name}-url`}
        name={name}
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://... (or upload a short clip below)"
        className="w-full rounded-lg border border-dark/15 px-3 py-2 text-sm outline-none focus:border-ocean"
      />

      {url && (
        <video src={url} controls className="mt-2 h-32 rounded-lg bg-dark/5" preload="metadata" />
      )}

      <div className="mt-2">
        <input
          type="file"
          accept={ALLOWED_TYPES.join(",")}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleFile(file);
          }}
          className="block w-full text-xs text-dark/70 file:mr-3 file:rounded-full file:border-0 file:bg-navy file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-offwhite"
        />
        <p className={cn("mt-1 text-xs", status === "error" ? "text-red-600" : "text-dark/50")}>
          {status === "uploading"
            ? "Uploading…"
            : error ?? "Optional: upload a short MP4/WebM/MOV (up to 50MB) instead of pasting a URL."}
        </p>
      </div>
    </div>
  );
}
