import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/backend/services/auth";
import { readDb, writeDb } from "@/backend/services/database";
import { attendanceSchema } from "@/backend/utils/validation";

export async function GET(request: Request) {
  await requireAdmin();
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date") ?? "";
  const employeeId = searchParams.get("employeeId") ?? "";
  const db = await readDb();
  const records = db.attendance.filter((record) => {
    const matchesDate = !date || record.timestamp.startsWith(date);
    const matchesEmployee = !employeeId || record.employeeId === employeeId;
    return matchesDate && matchesEmployee;
  });
  return NextResponse.json({ records, employees: db.users });
}

export async function POST(request: Request) {
  await requireAdmin();
  const parsed = attendanceSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid data" }, { status: 400 });
  const db = await readDb();
  const record = { id: randomUUID(), timestamp: parsed.data.timestamp ?? new Date().toISOString(), employeeId: parsed.data.employeeId, status: parsed.data.status, synced: parsed.data.synced ?? true };
  db.attendance.unshift(record);
  await writeDb(db);
  return NextResponse.json({ record }, { status: 201 });
}
