import { NextResponse } from "next/server";
import { getSession } from "@/backend/services/auth";

export async function GET() {
  const admin = await getSession();
<<<<<<< HEAD
  return admin
    ? NextResponse.json({ admin })
    : NextResponse.json({ error: "Unauthorized" }, { status: 401 });
=======
  return admin ? NextResponse.json({ admin }) : NextResponse.json({ error: "Unauthorized" }, { status: 401 });
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
}
