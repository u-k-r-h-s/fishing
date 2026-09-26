import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { OfferForm } from "../OfferForm";

export const metadata = { robots: { index: false, follow: false } };

export default function NewOfferPage() {
  return (
    <div>
      <AdminPageHeader title="Add Offer" />
      <OfferForm />
    </div>
  );
}
