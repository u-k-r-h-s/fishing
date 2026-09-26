import { notFound } from "next/navigation";
import { adminGetFaq } from "@/lib/data/faqs";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { FaqForm } from "../FaqForm";

export const metadata = { robots: { index: false, follow: false } };

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const faq = await adminGetFaq(id);
  if (!faq) notFound();

  return (
    <div>
      <AdminPageHeader title="Edit FAQ" />
      <FaqForm faq={faq} />
    </div>
  );
}
