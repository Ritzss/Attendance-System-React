import { AdminShell } from "@/components/dashboard/admin-shell";
export default function SectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
