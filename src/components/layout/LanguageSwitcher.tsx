"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeLabels, type Locale } from "@/i18n/locales";
import { cn } from "@/lib/utils";

/** Swaps the locale segment of the current path while keeping the rest of the URL intact. */
function pathForLocale(pathname: string, target: Locale): string {
  const segments = pathname.split("/");
  // segments[0] is "" (leading slash), segments[1] is the current locale.
  segments[1] = target;
  return segments.join("/") || `/${target}`;
}

export function LanguageSwitcher({
  locale,
  ariaLabel,
  variant = "light",
  className,
}: {
  locale: Locale;
  ariaLabel: string;
  variant?: "light" | "dark";
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center rounded-full border p-0.5 text-xs font-semibold",
        variant === "light" ? "border-dark/15 text-dark/70" : "border-offwhite/25 text-offwhite/80",
        className
      )}
    >
      {locales.map((code) => {
        const active = code === locale;
        return (
          <Link
            key={code}
            href={pathForLocale(pathname, code)}
            aria-current={active ? "true" : undefined}
            className={cn(
              "rounded-full px-3 py-1.5 transition-colors",
              active
                ? variant === "light"
                  ? "bg-navy text-offwhite"
                  : "bg-offwhite text-navy"
                : "hover:opacity-80"
            )}
          >
            {localeLabels[code]}
          </Link>
        );
      })}
    </div>
  );
}
