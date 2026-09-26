export interface AdminNavItem {
  href: string;
  label: string;
}

export const adminNavItems: AdminNavItem[] = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/fish", label: "Fish" },
  { href: "/admin/offers", label: "Offers" },
  { href: "/admin/videos", label: "Videos" },
  { href: "/admin/reels", label: "Reels" },
  { href: "/admin/owner", label: "Owner" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/faqs", label: "FAQs" },
  { href: "/admin/service-areas", label: "Service Areas" },
  { href: "/admin/homepage", label: "Homepage Content" },
  { href: "/admin/settings", label: "Business Settings" },
];
