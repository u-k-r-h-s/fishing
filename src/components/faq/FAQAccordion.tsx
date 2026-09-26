"use client";

import { useState } from "react";
import type { FAQ } from "@/data/faqs";
import { Icon } from "@/components/shared/Icon";
import { cn } from "@/lib/utils";
import { localize } from "@/i18n/types";
import type { Locale } from "@/i18n/locales";

export function FAQAccordion({ items, locale }: { items: FAQ[]; locale: Locale }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  if (items.length === 0) return null;

  return (
    <div className="divide-y divide-dark/10 rounded-2xl bg-white shadow-sm ring-1 ring-dark/5">
      {items.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div key={faq.id}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${faq.id}`}
                id={`faq-trigger-${faq.id}`}
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-semibold text-dark">{localize(faq.question, locale)}</span>
                <Icon
                  name="chevron-down"
                  className={cn(
                    "h-5 w-5 shrink-0 text-ocean transition-transform duration-300",
                    isOpen && "rotate-180"
                  )}
                />
              </button>
            </h3>
            <div
              id={`faq-panel-${faq.id}`}
              role="region"
              aria-labelledby={`faq-trigger-${faq.id}`}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-sm leading-relaxed text-dark/65">
                  {localize(faq.answer, locale)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
