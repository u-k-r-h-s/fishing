import Link from "next/link";
import { adminListOffers } from "@/lib/data/offers";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteOfferAction } from "./actions";

export const metadata = { robots: { index: false, follow: false } };

export default async function AdminOffersListPage() {
  const offers = await adminListOffers();

  return (
    <div>
      <AdminPageHeader
        title="Offers"
        description="Promotions shown on the homepage and /offers page."
        action={{ label: "+ Add Offer", href: "/admin/offers/new" }}
      />

      <AdminTable
        rows={offers}
        emptyMessage="No offers yet — add your first one."
        columns={[
          { header: "Title", render: (row) => <span className="font-medium text-dark">{row.title_en}</span> },
          {
            header: "Status",
            render: (row) => (
              <span className={row.active ? "text-emerald-600" : "text-dark/40"}>
                {row.active ? "Active" : "Inactive"}
              </span>
            ),
          },
          { header: "Featured", render: (row) => (row.featured ? "★" : "—") },
          { header: "Order", render: (row) => row.display_order },
          {
            header: "Actions",
            render: (row) => (
              <div className="flex items-center gap-3">
                <Link href={`/admin/offers/${row.id}`} className="text-sm font-semibold text-ocean hover:text-navy">
                  Edit
                </Link>
                <DeleteButton action={deleteOfferAction.bind(null, row.id)} confirmMessage={`Delete "${row.title_en}"?`} />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
