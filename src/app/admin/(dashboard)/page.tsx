import Link from "next/link";
import { adminListFish } from "@/lib/data/fish";
import { adminListOffers } from "@/lib/data/offers";
import { adminListVideos } from "@/lib/data/videos";
import { adminListReels } from "@/lib/data/social";
import { adminListFaqs } from "@/lib/data/faqs";
import { adminListTestimonials } from "@/lib/data/testimonials";
import { adminListServiceAreas } from "@/lib/data/serviceAreas";

export const metadata = { robots: { index: false, follow: false } };

const quickActions = [
  { label: "+ Add Fish", href: "/admin/fish/new" },
  { label: "+ Add Offer", href: "/admin/offers/new" },
  { label: "+ Add Video", href: "/admin/videos/new" },
  { label: "+ Add Reel", href: "/admin/reels/new" },
  { label: "Update Owner", href: "/admin/owner" },
  { label: "Business Settings", href: "/admin/settings" },
];

export default async function AdminDashboardPage() {
  const [fish, offers, videos, reels, faqs, testimonials, serviceAreas] = await Promise.all([
    adminListFish(),
    adminListOffers(),
    adminListVideos(),
    adminListReels(),
    adminListFaqs(),
    adminListTestimonials(),
    adminListServiceAreas(),
  ]);

  const stats = [
    { label: "Total Fish", value: fish.length },
    { label: "Active Fish", value: fish.filter((f) => f.availability).length },
    { label: "Active Offers", value: offers.filter((o) => o.active).length },
    { label: "Videos", value: videos.length },
    { label: "Reels", value: reels.length },
    { label: "FAQs", value: faqs.length },
    { label: "Testimonials", value: testimonials.length },
    { label: "Service Areas", value: serviceAreas.length },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold text-dark">Dashboard</h1>
      <p className="mt-1 text-sm text-dark/60">An overview of the site&apos;s current content.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-dark/10 bg-white p-4">
            <p className="text-2xl font-bold text-navy">{stat.value}</p>
            <p className="mt-1 text-xs font-medium text-dark/50">{stat.label}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-dark/50">
        Quick Actions
      </h2>
      <div className="mt-3 flex flex-wrap gap-3">
        {quickActions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="rounded-full border border-dark/15 bg-white px-4 py-2 text-sm font-semibold text-dark hover:border-ocean hover:text-ocean"
          >
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
