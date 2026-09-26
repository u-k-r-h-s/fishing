"use client";

import { getWhatsAppLink } from "@/lib/whatsapp";
import { useBusinessContact } from "@/components/shared/BusinessConfigProvider";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/getDictionary";

const variantClasses = {
  primary: "bg-[#25D366] text-white hover:bg-[#1ebe5b]",
  outline: "border border-dark/15 text-dark hover:border-aqua hover:text-ocean",
  light: "bg-offwhite text-navy hover:bg-mint",
};

export function WhatsAppButton({
  locale,
  fishName,
  label,
  variant = "primary",
  className,
}: {
  locale: Locale;
  fishName?: string;
  label?: string;
  variant?: keyof typeof variantClasses;
  className?: string;
}) {
  const dict = getDictionary(locale);
  const { whatsapp, name } = useBusinessContact();

  return (
    <a
      href={getWhatsAppLink(locale, whatsapp, name, fishName)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label ?? (fishName ? `WhatsApp us about ${fishName}` : dict.common.whatsappUs)}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200",
        variantClasses[variant],
        className
      )}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.29-1.39a9.9 9.9 0 0 0 4.7 1.2h.01c5.46 0 9.9-4.45 9.9-9.9C21.96 6.45 17.5 2 12.04 2Zm5.8 14.03c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.11.11-1.79-.11-.41-.13-.94-.3-1.62-.6-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.55-1.16-2.96 0-1.41.74-2.1 1-2.39.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.58.81 2 .88 2.14.07.14.12.31.02.5-.1.19-.15.3-.29.46-.15.16-.3.36-.43.48-.14.14-.29.29-.12.57.17.28.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.33 1.45.28.14.44.12.61-.07.17-.19.71-.83.9-1.11.19-.28.38-.24.63-.14.26.1 1.65.78 1.93.92.28.14.47.21.53.33.07.12.07.68-.17 1.36Z" />
      </svg>
      {label ?? dict.common.whatsappUs}
    </a>
  );
}
