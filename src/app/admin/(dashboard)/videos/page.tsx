import Link from "next/link";
import { adminListVideos } from "@/lib/data/videos";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteVideoAction } from "./actions";

export const metadata = { robots: { index: false, follow: false } };

export default async function AdminVideosListPage() {
  const videos = await adminListVideos();

  return (
    <div>
      <AdminPageHeader
        title="Videos"
        description="The 'See the Freshness' storytelling section."
        action={{ label: "+ Add Video", href: "/admin/videos/new" }}
      />

      <AdminTable
        rows={videos}
        emptyMessage="No videos yet — add your first one."
        columns={[
          { header: "Title", render: (row) => <span className="font-medium text-dark">{row.title_en}</span> },
          { header: "Type", render: (row) => row.video_type },
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
                <Link href={`/admin/videos/${row.id}`} className="text-sm font-semibold text-ocean hover:text-navy">
                  Edit
                </Link>
                <DeleteButton action={deleteVideoAction.bind(null, row.id)} confirmMessage={`Delete "${row.title_en}"?`} />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
