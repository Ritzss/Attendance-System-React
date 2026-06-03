import { NextResponse } from "next/server";
import { requireAdminRequest } from "@/backend/middleware/require-admin-request";
import { readDb, writeDb } from "@/backend/services/database";

type Params = { params: Promise<{ id: string }> };

export async function DELETE(_request: Request, { params }: Params) {
  const auth = await requireAdminRequest();
  if (auth.response) return auth.response;
  const { id } = await params;
  const db = await readDb();
  db.attendance = db.attendance.filter((record) => record.id !== id);
  await writeDb(db);
  return NextResponse.json({ ok: true });
}
