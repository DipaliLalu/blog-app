// middleware.ts
import { NextResponse } from "next/server";

export function middleware(request) {
  const isAuthenticated = Boolean(request.cookies.get("token")); // Adjust based on auth method

  if (
    request.nextUrl.pathname.startsWith("/dashboard") &&
    !isAuthenticated
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

 
export const config = {
  matcher: ['/dashboard/:path*'],
}