import { redirect } from "next/navigation";
<<<<<<< HEAD
export default function Home() {
  redirect("/dashboard");
=======
import { getSession } from "@/backend/services/auth";

export default async function Home() {
  const session = await getSession();
  redirect(session ? "/dashboard" : "/login");
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
}
