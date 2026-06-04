import { redirect } from "next/navigation";
import { getSession } from "@/backend/services/auth";

export default async function Home() {
  const session = await getSession();
  redirect(session ? "/dashboard" : "/login");
}
