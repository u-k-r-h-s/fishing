import Link from "next/link";
import { adminListServiceAreas } from "@/lib/data/serviceAreas";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteServiceAreaAction } from "./actions";

export const metadata = { robots: { index: false, follow: false } };

export default async function AdminServiceAreasListPage() {
  const areas = await adminListServiceAreas();

  return (
    <div>
      <AdminPageHeader
        title="Service Areas"
        description="Areas shown in the footer and the Service Areas section."
        action={{ label: "+ Add Area", href: "/admin/service-areas/new" }}
      />

      <AdminTable
        rows={areas}
        emptyMessage="No service areas yet — add your first one."
        columns={[
          { header: "Name", render: (row) => <span className="font-medium text-dark">{row.name_en}</span> },
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
                <Link href={`/admin/service-areas/${row.id}`} className="text-sm font-semibold text-ocean hover:text-navy">
                  Edit
                </Link>
                <DeleteButton action={deleteServiceAreaAction.bind(null, row.id)} confirmMessage={`Delete "${row.name_en}"?`} />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
