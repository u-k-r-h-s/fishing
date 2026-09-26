import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { signOutAction } from "./actions";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();

  // The proxy (src/proxy.ts) already redirects signed-out visitors to
  // /admin/login. This is the second, independent check: it also catches a
  // signed-in user who isn't an authorized admin (RLS would still block
  // every mutation for them regardless, but there's no reason to show them
  // the dashboard shell at all).
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen flex-col bg-offwhite md:flex-row">
      <AdminSidebar email={session.email} onSignOut={signOutAction} />
      <div className="flex-1">
        <div className="hidden items-center justify-end border-b border-dark/10 bg-white px-6 py-3 md:flex">
          <form action={signOutAction}>
            <button type="submit" className="text-sm font-medium text-dark/60 hover:text-dark">
              Sign out
            </button>
          </form>
        </div>
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
