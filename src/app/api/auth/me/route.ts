import { NextResponse } from "next/server";
import { getSession } from "@/backend/services/auth";

export async function GET() {
  const admin = await getSession();
  return admin
    ? NextResponse.json({ admin })
    : NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
