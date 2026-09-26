import { adminGetBusinessSettings } from "@/lib/data/business";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { SettingsForm } from "./SettingsForm";

export const metadata = { robots: { index: false, follow: false } };

export default async function AdminSettingsPage() {
  const settings = await adminGetBusinessSettings();

  return (
    <div>
      <AdminPageHeader title="Business Settings" description="Contact details, hours, and social links used across the site." />
      <SettingsForm settings={settings} />
    </div>
  );
}
