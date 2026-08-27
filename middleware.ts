import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export default auth((req) => {
  const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/signup");
  const isDashboardPage = req.nextUrl.pathname.startsWith("/dashboard");

  if (isDashboardPage && !req.auth) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAuthPage && req.auth) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
