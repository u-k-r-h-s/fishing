import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { VideoForm } from "../VideoForm";

export const metadata = { robots: { index: false, follow: false } };

export default function NewVideoPage() {
  return (
    <div>
      <AdminPageHeader title="Add Video" />
      <VideoForm />
    </div>
  );
}
