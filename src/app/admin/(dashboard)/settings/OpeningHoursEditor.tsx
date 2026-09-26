"use client";

import { useState } from "react";
import { TextInput } from "@/components/admin/FormField";

interface Entry {
  days: string;
  hours: string;
}

export function OpeningHoursEditor({ defaultValue }: { defaultValue: Entry[] }) {
  const [rows, setRows] = useState<Entry[]>(defaultValue.length > 0 ? defaultValue : [{ days: "", hours: "" }]);

  function update(index: number, field: keyof Entry, value: string) {
    setRows((prev) => prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
  }

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-dark">Opening hours</label>
      <div className="space-y-2">
        {rows.map((row, index) => (
          <div key={index} className="flex gap-2">
            <TextInput
              placeholder="Monday – Saturday"
              value={row.days}
              onChange={(e) => update(index, "days", e.target.value)}
            />
            <TextInput
              placeholder="6:00 AM – 8:00 PM"
              value={row.hours}
              onChange={(e) => update(index, "hours", e.target.value)}
            />
            <button
              type="button"
              onClick={() => setRows((prev) => prev.filter((_, i) => i !== index))}
              aria-label="Remove row"
              className="shrink-0 rounded-lg border border-dark/15 px-3 text-sm text-dark/50 hover:text-red-600"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setRows((prev) => [...prev, { days: "", hours: "" }])}
        className="mt-2 text-sm font-semibold text-ocean hover:text-navy"
      >
        + Add row
      </button>
      <input type="hidden" name="opening_hours_json" value={JSON.stringify(rows.filter((r) => r.days || r.hours))} />
    </div>
  );
}
