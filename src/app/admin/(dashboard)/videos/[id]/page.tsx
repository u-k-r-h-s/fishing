import { notFound } from "next/navigation";
import { adminGetVideo } from "@/lib/data/videos";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { VideoForm } from "../VideoForm";

export const metadata = { robots: { index: false, follow: false } };

export default async function EditVideoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const video = await adminGetVideo(id);
  if (!video) notFound();

  return (
    <div>
      <AdminPageHeader title={`Edit ${video.title_en}`} />
      <VideoForm video={video} />
    </div>
  );
}
