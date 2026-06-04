import { NextResponse } from "next/server";
import { requireAdminRequest } from "@/backend/middleware/require-admin-request";
import { readDb, writeDb } from "@/backend/services/database";
import { settingsSchema } from "@/backend/utils/validation";

export async function GET() {
  const auth = await requireAdminRequest();
  if (auth.response) return auth.response;
  const db = await readDb();
  return NextResponse.json({ settings: db.settings });
}

export async function PUT(request: Request) {
  const auth = await requireAdminRequest();
  if (auth.response) return auth.response;
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
