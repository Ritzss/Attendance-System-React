import bcrypt from "bcryptjs";
import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { readDb } from "./database";
import { redirect } from "next/navigation";

export const SESSION_COOKIE = "attendance_admin_session";
const JWT_SECRET =
  process.env.JWT_SECRET ?? "dev-attendance-admin-secret-change-me";
const maxAge = 60 * 60 * 8;
export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: "admin";
  exp?: number;
};
const b64 = (value: string) => Buffer.from(value).toString("base64url");
const sign = (value: string) =>
  createHmac("sha256", JWT_SECRET).update(value).digest("base64url");

export async function authenticateAdmin(email: string, password: string) {
  const db = await readDb();
  const admin = db.admins.find(
    (item) => item.email.toLowerCase() === email.toLowerCase(),
  );
  if (!admin) return null;
  return (await bcrypt.compare(password, admin.passwordHash))
    ? ({
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      } satisfies SessionUser)
    : null;
}
export function signSession(user: SessionUser) {
  const header = b64(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = b64(
    JSON.stringify({ ...user, exp: Math.floor(Date.now() / 1000) + maxAge }),
  );
  return `${header}.${payload}.${sign(`${header}.${payload}`)}`;
}
export function verifySession(token?: string): SessionUser | null {
  try {
    if (!token) return null;
    const [header, payload, signature] = token.split(".");
    const expected = sign(`${header}.${payload}`);
    if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expected)))
      return null;
    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString(),
    ) as SessionUser;
    return session.role === "admin" &&
      (session.exp ?? 0) > Math.floor(Date.now() / 1000)
      ? session
      : null;
  } catch {
    return null;
  }
}
export async function getSession() {
  const cookieStore = await cookies();
  return verifySession(cookieStore.get(SESSION_COOKIE)?.value);
}
// export async function requireAdmin() {
//   const session = await getSession();
//   if (!session) throw new Error("Unauthorized");
//   return session;
// }


export async function requireAdmin() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return session;
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge,
    path: "/",
  });
}
export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
