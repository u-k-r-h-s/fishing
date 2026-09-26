/**
 * ============================================================
 *  NAVIGATION — EDIT MENU LINKS HERE
 * ============================================================
 * Shared by the desktop navbar, mobile menu, and footer.
 * ============================================================
 */

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Fresh Fish", href: "/fresh-fish" },
  { label: "Offers", href: "/offers" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
