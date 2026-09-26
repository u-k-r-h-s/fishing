"use client";

import { getCallLink } from "@/lib/whatsapp";
import { useBusinessContact } from "@/components/shared/BusinessConfigProvider";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/getDictionary";

const variantClasses = {
  primary: "bg-navy text-offwhite hover:bg-ocean",
  outline: "border border-dark/15 text-dark hover:border-aqua hover:text-ocean",
  light: "bg-offwhite text-navy hover:bg-mint",
};

export function CallButton({
  locale,
  label,
  variant = "outline",
  className,
}: {
  locale: Locale;
  label?: string;
  variant?: keyof typeof variantClasses;
  className?: string;
}) {
  const dict = getDictionary(locale);
  const { phone } = useBusinessContact();

  return (
    <a
      href={getCallLink(phone)}
      aria-label={label ?? dict.common.callNow}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200",
        variantClasses[variant],
        className
      )}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor" aria-hidden="true">
        <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.4 21 3 13.6 3 4.5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2Z" />
      </svg>
      {label ?? dict.common.callNow}
    </a>
  );
}
