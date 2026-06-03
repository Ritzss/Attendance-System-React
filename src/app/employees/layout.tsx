<<<<<<< HEAD
import { AdminShell } from "@/components/dashboard/admin-shell";
export default function SectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
=======
import { requireAdminPage } from "@/backend/services/page-auth";
import { AdminShell } from "@/components/dashboard/admin-shell";

export default async function SectionLayout({ children }: { children: React.ReactNode }) {
  await requireAdminPage();
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
  return <AdminShell>{children}</AdminShell>;
}
