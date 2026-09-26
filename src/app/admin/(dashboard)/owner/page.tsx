import { adminListOwners } from "@/lib/data/owner";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { OwnerForm } from "./OwnerForm";

export const metadata = { robots: { index: false, follow: false } };

export default async function AdminOwnerPage() {
  const owners = await adminListOwners();
  const owner = owners.find((o) => o.active) ?? owners[0];

  return (
    <div>
      <AdminPageHeader
        title="Owner"
        description="Shown in the 'Meet the People Behind the Catch' section and on the Contact page."
      />
      <OwnerForm owner={owner} />
    </div>
  );
}
