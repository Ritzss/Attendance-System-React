import bcrypt from "bcryptjs";
import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { readDb } from "./database";

export const SESSION_COOKIE = "attendance_admin_session";

const JWT_SECRET = process.env.JWT_SECRET ?? "dev-attendance-admin-secret-change-me";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: "admin";
  exp?: number;
};

const base64UrlEncode = (value: string) => Buffer.from(value).toString("base64url");
const sign = (value: string) => createHmac("sha256", JWT_SECRET).update(value).digest("base64url");

function safeStringCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

async function authenticateEnvAdmin(email: string, password: string): Promise<SessionUser | null> {
  const envEmail = process.env.ADMIN_EMAIL;
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  const plainPassword = process.env.ADMIN_PASSWORD;

  if (!envEmail || envEmail.toLowerCase() !== email.toLowerCase()) return null;

  const passwordMatches = passwordHash
    ? await bcrypt.compare(password, passwordHash)
    : Boolean(plainPassword && safeStringCompare(password, plainPassword));

  if (!passwordMatches) return null;

  return {
    id: process.env.ADMIN_ID ?? "env-admin",
    email: envEmail,
    name: process.env.ADMIN_NAME ?? "System Administrator",
    role: "admin",
  };
}

export async function authenticateAdmin(email: string, password: string) {
  const db = await readDb();
  const admin = db.admins.find((item) => item.email.toLowerCase() === email.toLowerCase());

  if (admin && (await bcrypt.compare(password, admin.passwordHash))) {
    return { id: admin.id, email: admin.email, name: admin.name, role: admin.role } satisfies SessionUser;
  }

  return authenticateEnvAdmin(email, password);
}

export function signSession(user: SessionUser) {
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = base64UrlEncode(
    JSON.stringify({ ...user, exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS }),
  );

  return `${header}.${payload}.${sign(`${header}.${payload}`)}`;
}

export function verifySession(token?: string): SessionUser | null {
  try {
    if (!token) return null;

    const [header, payload, signature] = token.split(".");
    const expectedSignature = sign(`${header}.${payload}`);

    if (!safeStringCompare(signature, expectedSignature)) return null;

    const session = JSON.parse(Buffer.from(payload, "base64url").toString()) as SessionUser;
    return session.role === "admin" && (session.exp ?? 0) > Math.floor(Date.now() / 1000) ? session : null;
  } catch {
    return null;
  }
}
export async function getSession() {
  const cookieStore = await cookies();
  return verifySession(cookieStore.get(SESSION_COOKIE)?.value);
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/",
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
