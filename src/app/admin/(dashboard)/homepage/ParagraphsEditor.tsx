"use client";

import { useState } from "react";
import { TextArea } from "@/components/admin/FormField";

interface Paragraph {
  en: string;
  hi: string;
}

export function ParagraphsEditor({
  fieldName,
  defaultValue,
}: {
  fieldName: string;
  defaultValue: Paragraph[];
}) {
  const [paragraphs, setParagraphs] = useState<Paragraph[]>(
    defaultValue.length > 0 ? defaultValue : [{ en: "", hi: "" }]
  );

  function update(index: number, lang: "en" | "hi", value: string) {
    setParagraphs((prev) => prev.map((p, i) => (i === index ? { ...p, [lang]: value } : p)));
  }

  return (
    <div>
      <div className="space-y-3">
        {paragraphs.map((p, index) => (
          <div key={index} className="rounded-lg border border-dark/10 p-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-dark/50">
                Paragraph {index + 1}
              </p>
              <button
                type="button"
                onClick={() => setParagraphs((prev) => prev.filter((_, i) => i !== index))}
                className="text-xs font-semibold text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <TextArea placeholder="English" rows={3} value={p.en} onChange={(e) => update(index, "en", e.target.value)} />
              <TextArea placeholder="Hindi" rows={3} value={p.hi} onChange={(e) => update(index, "hi", e.target.value)} />
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setParagraphs((prev) => [...prev, { en: "", hi: "" }])}
        className="mt-2 text-sm font-semibold text-ocean hover:text-navy"
      >
        + Add paragraph
      </button>
      <input type="hidden" name={fieldName} value={JSON.stringify(paragraphs)} />
    </div>
  );
}
