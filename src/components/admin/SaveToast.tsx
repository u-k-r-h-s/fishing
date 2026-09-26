"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * A floating confirmation that appears after a form's server action
 * finishes — every admin form used a static inline "Saved." paragraph
 * before this, easy to miss (no animation, nothing drawing the eye to it).
 * Keyed off the pending->settled transition (not the success/error values
 * themselves), so saving the same form twice in a row still shows a fresh
 * toast each time even though the resulting state looks identical.
 *
 * The transition is detected during render (comparing `pending` against
 * its previous value via a separate bit of state), not in an effect —
 * calling setState directly in an effect body just to derive state from
 * props causes an extra render pass and trips this project's
 * set-state-in-effect lint rule. Only the auto-dismiss timer (a real
 * external-timer side effect) uses useEffect.
 */
export function SaveToast({
  success,
  error,
  pending,
}: {
  success: boolean;
  error: string | null;
  pending: boolean;
}) {
  const [toast, setToast] = useState<{ message: string; variant: "success" | "error" } | null>(null);
  const [prevPending, setPrevPending] = useState(pending);

  if (pending !== prevPending) {
    if (prevPending && !pending) {
      if (error) setToast({ message: error, variant: "error" });
      else if (success) setToast({ message: "Saved successfully.", variant: "success" });
    }
    setPrevPending(pending);
  }

  useEffect(() => {
    if (!toast) return;
    const timeout = setTimeout(() => setToast(null), toast.variant === "error" ? 6000 : 3000);
    return () => clearTimeout(timeout);
  }, [toast]);

  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed bottom-6 right-6 z-[100] max-w-sm animate-[toast-in_0.25s_ease-out] rounded-lg px-4 py-3 text-sm font-medium text-white shadow-lg",
        toast.variant === "success" ? "bg-emerald-600" : "bg-red-600"
      )}
    >
      {toast.message}
    </div>
  );
}
