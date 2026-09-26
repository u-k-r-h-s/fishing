"use client";

import { useTransition } from "react";

export function DeleteButton({
  action,
  confirmMessage = "Delete this item? This can't be undone.",
  label = "Delete",
}: {
  action: () => Promise<{ error: string | null }>;
  confirmMessage?: string;
  label?: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!window.confirm(confirmMessage)) return;
        startTransition(async () => {
          const result = await action();
          if (result.error) {
            window.alert(`Couldn't delete: ${result.error}`);
          }
        });
      }}
      className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
    >
      {pending ? "Deleting…" : label}
    </button>
  );
}
