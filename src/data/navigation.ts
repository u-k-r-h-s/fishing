/**
 * ============================================================
 *  NAVIGATION — EDIT MENU LINKS HERE
 * ============================================================
 * Shared by the desktop navbar, mobile menu, and footer.
 * `labelKey` points at a string in the dictionary (src/i18n/
 * dictionaries/en.ts under `nav`) so labels stay translated —
 * edit the wording there, not here. `href` is locale-agnostic;
 * components prefix it with `/{locale}` automatically.
 * ============================================================
 */
import type { Dictionary } from "@/i18n/getDictionary";

export interface NavLink {
  href: string;
  labelKey: keyof Dictionary["nav"] & ("home" | "freshFish" | "offers" | "about" | "contact");
}

export const navLinks: NavLink[] = [
  { href: "/", labelKey: "home" },
  { href: "/fresh-fish", labelKey: "freshFish" },
  { href: "/offers", labelKey: "offers" },
  { href: "/about", labelKey: "about" },
  { href: "/contact", labelKey: "contact" },
];
