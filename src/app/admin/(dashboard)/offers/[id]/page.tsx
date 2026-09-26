import { notFound } from "next/navigation";
import { adminGetOffer } from "@/lib/data/offers";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { OfferForm } from "../OfferForm";

export const metadata = { robots: { index: false, follow: false } };

export default async function EditOfferPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const offer = await adminGetOffer(id);
  if (!offer) notFound();

  return (
    <div>
      <AdminPageHeader title={`Edit ${offer.title_en}`} />
      <OfferForm offer={offer} />
    </div>
  );
}
