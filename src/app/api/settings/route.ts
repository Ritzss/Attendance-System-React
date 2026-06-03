import { NextResponse } from "next/server";
import { requireAdmin } from "@/backend/services/auth";
import { readDb, writeDb } from "@/backend/services/database";
import { settingsSchema } from "@/backend/utils/validation";

export async function GET() {
  await requireAdmin();
  const db = await readDb();
  return NextResponse.json({ settings: db.settings });
}

export async function PUT(request: Request) {
  await requireAdmin();
  const parsed = settingsSchema.safeParse(await request.json());
  if (!parsed.success)
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid settings" },
      { status: 400 },
    );
  const db = await readDb();
  db.settings = parsed.data;
  await writeDb(db);
  return NextResponse.json({ settings: db.settings });
}
