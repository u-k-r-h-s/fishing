import { notFound } from "next/navigation";
import { adminGetServiceArea } from "@/lib/data/serviceAreas";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ServiceAreaForm } from "../ServiceAreaForm";

export const metadata = { robots: { index: false, follow: false } };

export default async function EditServiceAreaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const serviceArea = await adminGetServiceArea(id);
  if (!serviceArea) notFound();

  return (
    <div>
      <AdminPageHeader title={`Edit ${serviceArea.name_en}`} />
      <ServiceAreaForm serviceArea={serviceArea} />
    </div>
  );
}
