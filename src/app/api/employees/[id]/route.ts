import { NextResponse } from "next/server";
import { requireAdmin } from "@/backend/services/auth";
import { readDb, writeDb } from "@/backend/services/database";
import { employeeUpdateSchema } from "@/backend/utils/validation";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Params) {
  await requireAdmin();
  const { id } = await params;
  const parsed = employeeUpdateSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid data" }, { status: 400 });
  const db = await readDb();
  const index = db.users.findIndex((employee) => employee.id === id);
  if (index === -1) return NextResponse.json({ error: "Employee not found" }, { status: 404 });
  db.users[index] = { ...db.users[index], ...parsed.data };
  await writeDb(db);
  return NextResponse.json({ employee: db.users[index] });
}

export async function DELETE(_request: Request, { params }: Params) {
  await requireAdmin();
  const { id } = await params;
  const db = await readDb();
  const employee = db.users.find((item) => item.id === id);
  if (!employee) return NextResponse.json({ error: "Employee not found" }, { status: 404 });
  db.users = db.users.filter((item) => item.id !== id);
  db.attendance = db.attendance.filter((record) => record.employeeId !== employee.employeeId);
  await writeDb(db);
  return NextResponse.json({ ok: true });
}
