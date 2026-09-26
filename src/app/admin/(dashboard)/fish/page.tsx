import Link from "next/link";
import { adminListFish } from "@/lib/data/fish";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteFishAction } from "./actions";

export const metadata = { robots: { index: false, follow: false } };

export default async function AdminFishListPage() {
  const fish = await adminListFish();

  return (
    <div>
      <AdminPageHeader
        title="Fish"
        description="The fresh fish catalogue shown on the public site."
        action={{ label: "+ Add Fish", href: "/admin/fish/new" }}
      />

      <AdminTable
        rows={fish}
        emptyMessage="No fish yet — add your first one."
        columns={[
          { header: "Name", render: (row) => <span className="font-medium text-dark">{row.name_en}</span> },
          { header: "Price", render: (row) => `₹${row.price}/${row.price_unit}` },
          {
            header: "Status",
            render: (row) => (
              <span className={row.availability ? "text-emerald-600" : "text-dark/40"}>
                {row.availability ? "Available" : "Unavailable"}
              </span>
            ),
          },
          { header: "Featured", render: (row) => (row.featured ? "★" : "—") },
          { header: "Order", render: (row) => row.display_order },
          {
            header: "Actions",
            render: (row) => (
              <div className="flex items-center gap-3">
                <Link href={`/admin/fish/${row.id}`} className="text-sm font-semibold text-ocean hover:text-navy">
                  Edit
                </Link>
                <DeleteButton action={deleteFishAction.bind(null, row.id)} confirmMessage={`Delete "${row.name_en}"?`} />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
