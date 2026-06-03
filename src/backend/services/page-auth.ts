import { redirect } from "next/navigation";
import { getSession } from "./auth";

export async function requireAdminPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  return session;
}
