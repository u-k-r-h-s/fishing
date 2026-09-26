import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { FishForm } from "../FishForm";

export const metadata = { robots: { index: false, follow: false } };

export default function NewFishPage() {
  return (
    <div>
      <AdminPageHeader title="Add Fish" />
      <FishForm />
    </div>
  );
}
