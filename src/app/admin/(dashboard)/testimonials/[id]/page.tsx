import { notFound } from "next/navigation";
import { adminGetTestimonial } from "@/lib/data/testimonials";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { TestimonialForm } from "../TestimonialForm";

export const metadata = { robots: { index: false, follow: false } };

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const testimonial = await adminGetTestimonial(id);
  if (!testimonial) notFound();

  return (
    <div>
      <AdminPageHeader title={`Edit testimonial — ${testimonial.customer_name}`} />
      <TestimonialForm testimonial={testimonial} />
    </div>
  );
}
