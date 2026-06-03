import { NextResponse } from "next/server";
<<<<<<< HEAD
import { requireAdmin } from "@/backend/services/auth";
=======
import { requireAdminRequest } from "@/backend/middleware/require-admin-request";
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
import { readDb, writeDb } from "@/backend/services/database";

type Params = { params: Promise<{ id: string }> };

export async function DELETE(_request: Request, { params }: Params) {
<<<<<<< HEAD
  await requireAdmin();
=======
  const auth = await requireAdminRequest();
  if (auth.response) return auth.response;
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
  const { id } = await params;
  const db = await readDb();
  db.attendance = db.attendance.filter((record) => record.id !== id);
  await writeDb(db);
  return NextResponse.json({ ok: true });
}
