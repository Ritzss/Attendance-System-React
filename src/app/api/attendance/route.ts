import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
<<<<<<< HEAD
import { requireAdmin } from "@/backend/services/auth";
=======
import { requireAdminRequest } from "@/backend/middleware/require-admin-request";
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
import { readDb, writeDb } from "@/backend/services/database";
import { attendanceSchema } from "@/backend/utils/validation";

export async function GET(request: Request) {
<<<<<<< HEAD
  await requireAdmin();
=======
  const auth = await requireAdminRequest();
  if (auth.response) return auth.response;
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
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
<<<<<<< HEAD
  await requireAdmin();
  const parsed = attendanceSchema.safeParse(await request.json());
  if (!parsed.success)
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid data" },
      { status: 400 },
    );
  const db = await readDb();
  const record = {
    id: randomUUID(),
    timestamp: parsed.data.timestamp ?? new Date().toISOString(),
    employeeId: parsed.data.employeeId,
    status: parsed.data.status,
    synced: parsed.data.synced ?? true,
  };
=======
  const auth = await requireAdminRequest();
  if (auth.response) return auth.response;
  const parsed = attendanceSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid data" }, { status: 400 });
  const db = await readDb();
  const record = { id: randomUUID(), timestamp: parsed.data.timestamp ?? new Date().toISOString(), employeeId: parsed.data.employeeId, status: parsed.data.status, synced: parsed.data.synced ?? true };
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
  db.attendance.unshift(record);
  await writeDb(db);
  return NextResponse.json({ record }, { status: 201 });
}
