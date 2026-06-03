import dayjs from "dayjs";
import { NextResponse } from "next/server";
<<<<<<< HEAD
import { requireAdmin } from "@/backend/services/auth";
import { readDb } from "@/backend/services/database";

export async function GET(request: Request) {
  await requireAdmin();
=======
import { requireAdminRequest } from "@/backend/middleware/require-admin-request";
import { readDb } from "@/backend/services/database";

export async function GET(request: Request) {
  const auth = await requireAdminRequest();
  if (auth.response) return auth.response;
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") ?? "daily";
  const now = dayjs();
  const db = await readDb();
  const records = db.attendance.filter((record) => {
    const date = dayjs(record.timestamp);
    if (type === "weekly") return date.isAfter(now.subtract(7, "day"));
    if (type === "monthly") return date.isAfter(now.subtract(30, "day"));
    return date.format("YYYY-MM-DD") === now.format("YYYY-MM-DD");
  });
  return NextResponse.json({ type, records, employees: db.users });
}
