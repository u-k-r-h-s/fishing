import Link from "next/link";
import { adminListFaqs } from "@/lib/data/faqs";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteFaqAction } from "./actions";

export const metadata = { robots: { index: false, follow: false } };

export default async function AdminFaqsListPage() {
  const faqs = await adminListFaqs();

  return (
    <div>
      <AdminPageHeader
        title="FAQs"
        description="Questions shown in the FAQ accordion."
        action={{ label: "+ Add FAQ", href: "/admin/faqs/new" }}
      />

      <AdminTable
        rows={faqs}
        emptyMessage="No FAQs yet — add your first one."
        columns={[
          { header: "Question", render: (row) => <span className="font-medium text-dark">{row.question_en}</span> },
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
                <Link href={`/admin/faqs/${row.id}`} className="text-sm font-semibold text-ocean hover:text-navy">
                  Edit
                </Link>
                <DeleteButton action={deleteFaqAction.bind(null, row.id)} confirmMessage="Delete this FAQ?" />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
