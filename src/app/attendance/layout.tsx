import { requireAdminPage } from "@/backend/services/page-auth";
import { AdminShell } from "@/components/dashboard/admin-shell";

export default async function SectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdminPage();
  return <AdminShell>{children}</AdminShell>;
}
