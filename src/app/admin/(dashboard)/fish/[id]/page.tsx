import { notFound } from "next/navigation";
import { adminGetFish } from "@/lib/data/fish";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { FishForm } from "../FishForm";

export const metadata = { robots: { index: false, follow: false } };

export default async function EditFishPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const fish = await adminGetFish(id);
  if (!fish) notFound();

  return (
    <div>
      <AdminPageHeader title={`Edit ${fish.name_en}`} />
      <FishForm fish={fish} />
    </div>
  );
}
