"use client";

import { useState } from "react";
import { TextInput, Select } from "@/components/admin/FormField";

interface Item {
  icon: string;
  title: { en: string; hi: string };
  description: { en: string; hi: string };
}

const ICONS = ["fresh", "quality", "selected", "contact"];

export function IconedListEditor({
  fieldName,
  defaultValue,
}: {
  fieldName: string;
  defaultValue: Item[];
}) {
  const [items, setItems] = useState<Item[]>(
    defaultValue.length > 0
      ? defaultValue
      : [{ icon: "fresh", title: { en: "", hi: "" }, description: { en: "", hi: "" } }]
  );

  function update(index: number, path: string, value: string) {
    setItems((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;
        if (path === "icon") return { ...item, icon: value };
        const [field, lang] = path.split(".") as ["title" | "description", "en" | "hi"];
        return { ...item, [field]: { ...item[field], [lang]: value } };
      })
    );
  }

  return (
    <div>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="rounded-lg border border-dark/10 p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-dark/50">
                Item {index + 1}
              </p>
              <button
                type="button"
                onClick={() => setItems((prev) => prev.filter((_, i) => i !== index))}
                className="text-xs font-semibold text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Select value={item.icon} onChange={(e) => update(index, "icon", e.target.value)}>
                {ICONS.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </Select>
              <div />
              <TextInput
                placeholder="Title (English)"
                value={item.title.en}
                onChange={(e) => update(index, "title.en", e.target.value)}
              />
              <TextInput
                placeholder="Title (Hindi)"
                value={item.title.hi}
                onChange={(e) => update(index, "title.hi", e.target.value)}
              />
              <TextInput
                placeholder="Description (English)"
                value={item.description.en}
                onChange={(e) => update(index, "description.en", e.target.value)}
              />
              <TextInput
                placeholder="Description (Hindi)"
                value={item.description.hi}
                onChange={(e) => update(index, "description.hi", e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() =>
          setItems((prev) => [
            ...prev,
            { icon: "fresh", title: { en: "", hi: "" }, description: { en: "", hi: "" } },
          ])
        }
        className="mt-3 text-sm font-semibold text-ocean hover:text-navy"
      >
        + Add item
      </button>
      <input type="hidden" name={fieldName} value={JSON.stringify(items)} />
    </div>
  );
}
