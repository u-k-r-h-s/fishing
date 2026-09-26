import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ServiceAreaForm } from "../ServiceAreaForm";

export const metadata = { robots: { index: false, follow: false } };

export default function NewServiceAreaPage() {
  return (
    <div>
      <AdminPageHeader title="Add Service Area" />
      <ServiceAreaForm />
    </div>
  );
}
