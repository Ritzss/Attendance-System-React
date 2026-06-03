import { NextResponse } from "next/server";
import { requireAdmin } from "@/backend/services/auth";
import { readDb, writeDb } from "@/backend/services/database";

type Params = { params: Promise<{ id: string }> };

export async function DELETE(_request: Request, { params }: Params) {
  await requireAdmin();
  const { id } = await params;
  const db = await readDb();
  db.attendance = db.attendance.filter((record) => record.id !== id);
  await writeDb(db);
  return NextResponse.json({ ok: true });
}
