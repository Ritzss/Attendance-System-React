import dayjs from "dayjs";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/backend/services/auth";
import { readDb } from "@/backend/services/database";

export async function GET(request: Request) {
  await requireAdmin();
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
