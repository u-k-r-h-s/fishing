"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];

/**
 * Like ImageUploadField, but for a portrait that's cropped into a circle
 * elsewhere on the site (the owner photo) — plain center-crop cuts off
 * faces that aren't centered in the source photo. Adds a click-to-set
 * focal point on the preview, stored as a CSS object-position string in a
 * second hidden input (`positionName`) alongside the image URL.
 */
export function PortraitUploadField({
  imageName,
  positionName,
  label,
  bucket,
  defaultImage,
  defaultPosition = "50% 50%",
}: {
  imageName: string;
  positionName: string;
  label: string;
  bucket: string;
  defaultImage?: string;
  defaultPosition?: string;
}) {
  const [url, setUrl] = useState(defaultImage ?? "");
  const [position, setPosition] = useState(defaultPosition);
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  async function handleFile(file: File) {
    setError(null);

    if (!ALLOWED_TYPES.includes(file.type)) {
      setStatus("error");
      setError("Please choose a PNG, JPEG, WebP, or GIF image.");
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
    setPosition("50% 50%");
    setStatus("idle");
  }

  function handlePreviewClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = previewRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setPosition(`${Math.min(100, Math.max(0, x))}% ${Math.min(100, Math.max(0, y))}%`);
  }

  const [posX, posY] = position.split(" ");

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-dark">{label}</label>
      <div className="flex items-start gap-4">
        <div
          ref={previewRef}
          onClick={url ? handlePreviewClick : undefined}
          className={cn(
            "relative h-28 w-28 shrink-0 overflow-hidden rounded-full border border-dark/10 bg-mint/10",
            url && "cursor-crosshair"
          )}
        >
          {url ? (
            <Image
              src={url}
              alt=""
              fill
              sizes="112px"
              className="object-cover"
              style={{ objectPosition: position }}
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-xs text-dark/30">None</span>
          )}
          {url && (
            <div
              className="pointer-events-none absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-aqua shadow"
              style={{ left: posX, top: posY }}
            />
          )}
        </div>
        <div className="flex-1">
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
            {status === "uploading" ? "Uploading…" : error ?? "PNG, JPEG, WebP, or GIF — up to 5MB."}
          </p>
          {url && (
            <p className="mt-1 text-xs text-dark/40">
              Click anywhere on the photo to recenter the crop (currently {position}).
            </p>
          )}
        </div>
      </div>
      <input type="hidden" name={imageName} value={url} readOnly />
      <input type="hidden" name={positionName} value={position} readOnly />
    </div>
  );
}
