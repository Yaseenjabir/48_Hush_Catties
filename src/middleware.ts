import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("authToken");
  const adminAuthToken = request.cookies.get("adminAuth");

  // Redirect logic for /auth and /my-account
  if (request.nextUrl.pathname === "/auth" && authToken) {
    return NextResponse.redirect(new URL("/my-account", request.url));
  }

  if (request.nextUrl.pathname === "/my-account" && !authToken) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // Redirect logic for /adminAuth and /dashboard routes
  if (request.nextUrl.pathname === "/adminAuth" && adminAuthToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/dashboard") && !adminAuthToken) {
    return NextResponse.redirect(new URL("/adminAuth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/my-account", "/auth", "/dashboard/:path*", "/adminAuth"],
};
