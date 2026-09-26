"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavItems } from "@/app/admin/(dashboard)/navConfig";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebar({
  email,
  onSignOut,
}: {
  email: string;
  onSignOut: () => void;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between border-b border-dark/10 bg-white px-4 py-3 md:hidden">
        <span className="text-sm font-bold text-navy">OceanFresh Admin</span>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-dark/15"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      <aside
        className={cn(
          "w-64 shrink-0 border-r border-dark/10 bg-white md:block",
          open ? "block" : "hidden"
        )}
      >
        <div className="hidden px-5 py-5 md:block">
          <p className="text-sm font-bold text-navy">OceanFresh Admin</p>
          <p className="mt-0.5 truncate text-xs text-dark/50">{email}</p>
        </div>
        <nav aria-label="Admin" className="flex flex-col gap-1 p-3">
          {adminNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive(pathname, item.href)
                  ? "bg-navy text-offwhite"
                  : "text-dark/70 hover:bg-mint/30 hover:text-dark"
              )}
            >
              {item.label}
            </Link>
          ))}
          <form action={onSignOut} className="mt-2 border-t border-dark/10 pt-3 md:hidden">
            <button type="submit" className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-dark/60 hover:bg-mint/30">
              Sign out
            </button>
          </form>
        </nav>
      </aside>
    </>
  );
}
