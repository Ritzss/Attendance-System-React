import { NextResponse } from "next/server";
<<<<<<< HEAD
import { requireAdmin } from "@/backend/services/auth";
=======
import { requireAdminRequest } from "@/backend/middleware/require-admin-request";
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
import { readDb, writeDb } from "@/backend/services/database";
import { settingsSchema } from "@/backend/utils/validation";

export async function GET() {
<<<<<<< HEAD
  await requireAdmin();
=======
  const auth = await requireAdminRequest();
  if (auth.response) return auth.response;
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
  const db = await readDb();
  return NextResponse.json({ settings: db.settings });
}

export async function PUT(request: Request) {
<<<<<<< HEAD
  await requireAdmin();
  const parsed = settingsSchema.safeParse(await request.json());
  if (!parsed.success)
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid settings" },
      { status: 400 },
    );
=======
  const auth = await requireAdminRequest();
  if (auth.response) return auth.response;
  const parsed = settingsSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid settings" }, { status: 400 });
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
  const db = await readDb();
  db.settings = parsed.data;
  await writeDb(db);
  return NextResponse.json({ settings: db.settings });
}
