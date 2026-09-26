"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Client-only wrapper that toggles a "scrolled" state so the navbar can
 * subtly shrink and gain a soft backdrop once the user scrolls — the
 * actual nav content (children) is still authored/rendered by the
 * server component parent.
 */
export function NavbarShrinkWrapper({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300",
        scrolled
          ? "border-dark/5 bg-offwhite/90 shadow-sm backdrop-blur-md"
          : "border-transparent bg-offwhite/40"
      )}
    >
      <div className={cn("transition-[padding] duration-300", scrolled ? "py-2" : "py-4")}>
        {children}
      </div>
    </header>
  );
}
