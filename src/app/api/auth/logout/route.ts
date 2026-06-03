import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/backend/services/auth";

export async function POST() {
  await clearSessionCookie();
  return NextResponse.json({ ok: true });
}
