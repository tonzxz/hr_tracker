import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect to /login if accessing the root path
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow all other routes (e.g., /dashboard, /login)
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
};