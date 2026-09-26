import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { TestimonialForm } from "../TestimonialForm";

export const metadata = { robots: { index: false, follow: false } };

export default function NewTestimonialPage() {
  return (
    <div>
      <AdminPageHeader title="Add Testimonial" />
      <TestimonialForm />
    </div>
  );
}
