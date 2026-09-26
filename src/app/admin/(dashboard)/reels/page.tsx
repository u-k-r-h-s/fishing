import Link from "next/link";
import { adminListReels } from "@/lib/data/social";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteReelAction } from "./actions";

export const metadata = { robots: { index: false, follow: false } };

export default async function AdminReelsListPage() {
  const reels = await adminListReels();

  return (
    <div>
      <AdminPageHeader
        title="Reels"
        description="Vertical clips shown in the phone-mockup social section."
        action={{ label: "+ Add Reel", href: "/admin/reels/new" }}
      />

      <AdminTable
        rows={reels}
        emptyMessage="No reels yet — add your first one."
        columns={[
          { header: "Title", render: (row) => <span className="font-medium text-dark">{row.title_en}</span> },
          { header: "Platform", render: (row) => row.platform },
          {
            header: "Status",
            render: (row) => (
              <span className={row.active ? "text-emerald-600" : "text-dark/40"}>
                {row.active ? "Active" : "Inactive"}
              </span>
            ),
          },
          { header: "Order", render: (row) => row.display_order },
          {
            header: "Actions",
            render: (row) => (
              <div className="flex items-center gap-3">
                <Link href={`/admin/reels/${row.id}`} className="text-sm font-semibold text-ocean hover:text-navy">
                  Edit
                </Link>
                <DeleteButton action={deleteReelAction.bind(null, row.id)} confirmMessage={`Delete "${row.title_en}"?`} />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
