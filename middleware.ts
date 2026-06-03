import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/employees",
  "/attendance",
  "/reports",
  "/analytics",
  "/settings",
];
const sessionCookie = "attendance_admin_session";

export function middleware(request: NextRequest) {
  const hasSession = Boolean(request.cookies.get(sessionCookie)?.value);
  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );
  if (isProtected && !hasSession)
    return NextResponse.redirect(new URL("/login", request.url));
  if (request.nextUrl.pathname === "/login" && hasSession)
    return NextResponse.redirect(new URL("/dashboard", request.url));
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/employees/:path*",
    "/attendance/:path*",
    "/reports/:path*",
    "/analytics/:path*",
    "/settings/:path*",
    "/login",
  ],
};
