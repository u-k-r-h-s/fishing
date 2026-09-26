import { notFound } from "next/navigation";
import { adminGetReel } from "@/lib/data/social";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ReelForm } from "../ReelForm";

export const metadata = { robots: { index: false, follow: false } };

export default async function EditReelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const reel = await adminGetReel(id);
  if (!reel) notFound();

  return (
    <div>
      <AdminPageHeader title={`Edit ${reel.title_en}`} />
      <ReelForm reel={reel} />
    </div>
  );
}
