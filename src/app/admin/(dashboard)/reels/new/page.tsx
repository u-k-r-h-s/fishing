import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ReelForm } from "../ReelForm";

export const metadata = { robots: { index: false, follow: false } };

export default function NewReelPage() {
  return (
    <div>
      <AdminPageHeader title="Add Reel" />
      <ReelForm />
    </div>
  );
}
