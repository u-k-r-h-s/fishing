import Link from "next/link";
import { adminListTestimonials } from "@/lib/data/testimonials";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteTestimonialAction } from "./actions";

export const metadata = { robots: { index: false, follow: false } };

export default async function AdminTestimonialsListPage() {
  const testimonials = await adminListTestimonials();

  return (
    <div>
      <AdminPageHeader
        title="Testimonials"
        description="Demo placeholder quotes — replace with real, permissioned reviews."
        action={{ label: "+ Add Testimonial", href: "/admin/testimonials/new" }}
      />

      <AdminTable
        rows={testimonials}
        emptyMessage="No testimonials yet — add your first one."
        columns={[
          { header: "Customer", render: (row) => <span className="font-medium text-dark">{row.customer_name}</span> },
          { header: "Rating", render: (row) => "★".repeat(row.rating) },
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
                <Link href={`/admin/testimonials/${row.id}`} className="text-sm font-semibold text-ocean hover:text-navy">
                  Edit
                </Link>
                <DeleteButton action={deleteTestimonialAction.bind(null, row.id)} confirmMessage={`Delete testimonial from "${row.customer_name}"?`} />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
