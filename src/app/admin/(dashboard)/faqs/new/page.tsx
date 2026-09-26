import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { FaqForm } from "../FaqForm";

export const metadata = { robots: { index: false, follow: false } };

export default function NewFaqPage() {
  return (
    <div>
      <AdminPageHeader title="Add FAQ" />
      <FaqForm />
    </div>
  );
}
