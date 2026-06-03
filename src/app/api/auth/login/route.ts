import { NextResponse } from "next/server";
import {
  authenticateAdmin,
  setSessionCookie,
  signSession,
} from "@/backend/services/auth";
import { loginSchema } from "@/backend/utils/validation";

export async function POST(request: Request) {
  const parsed = loginSchema.safeParse(await request.json());
  if (!parsed.success)
    return NextResponse.json(
      { error: "Invalid credentials." },
      { status: 400 },
    );
  const admin = await authenticateAdmin(
    parsed.data.email,
    parsed.data.password,
  );
  if (!admin)
    return NextResponse.json(
      { error: "Invalid email or password." },
      { status: 401 },
    );
  await setSessionCookie(signSession(admin));
  return NextResponse.json({ admin });
}
