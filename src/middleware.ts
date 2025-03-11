import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("authToken");

  if (request.nextUrl.pathname === "/auth" && authToken) {
    return NextResponse.redirect(new URL("/my-account", request.url));
  }

  if (request.nextUrl.pathname === "/my-account" && !authToken) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/my-account", "/auth"],
};
