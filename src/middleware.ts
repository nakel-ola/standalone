import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// TODO: Implement multi-tenant middleware
// - Extract tenant from subdomain or path
// - Validate tenant access
// - Add tenant context to request

// TODO: Implement role-based access control
// - Check user permissions
// - Validate site access for normal users
// - Allow admin access to all sites

export function middleware(request: NextRequest) {
  // Placeholder middleware - no protection for now
  // This will be implemented later with proper auth and tenant isolation

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
