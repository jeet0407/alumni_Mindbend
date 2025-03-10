import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET 
  });
  
  const response = NextResponse.next();
  
  // CORS Headers
  response.headers.set("Access-Control-Allow-Origin", "*"); // Set to your domain in production
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PATCH, DELETE");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  // Handle CORS Preflight Requests
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: response.headers });
  }
  
  const pathname = request.nextUrl.pathname;
  
  // Public routes - always accessible
  if (
    pathname === "/" || 
    pathname === "/login" || 
    pathname === "/register" || 
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/gallery")
  ) {
    return response;
  }
  
  // Authentication check - redirect to login if not authenticated
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  // Role-based access control
  if (pathname.startsWith("/admin")) {
    // Check if user has admin role
    const userRoles = token.roles as string[] || [];
    if (!userRoles.includes("ADMIN")) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }
  
  if (pathname.startsWith("/alumni")) {
    // Check if user is an alumni
    if (token.isAlumni !== true) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }
  
  if (pathname.startsWith("/committee")) {
    // Check if user is a current committee member
    const userRoles = token.roles as string[] || [];
    if (!userRoles.includes("COMMITTEE_MEMBER")) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }
  
  if (pathname.startsWith("/faculty")) {
    // Check if user is a faculty member
    const userRoles = token.roles as string[] || [];
    if (!userRoles.includes("FACULTY")) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }
  
  // User profile access - ensure users can only access their own profiles
  if (pathname.startsWith("/profile/") && !pathname.startsWith("/profile/edit")) {
    const profileId = pathname.split("/")[2];
    // Allow admin to access any profile
    const userRoles = token.roles as string[] || [];
    if (profileId !== token.id && !userRoles.includes("ADMIN")) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }
  
  return response;
}

// Apply middleware to protected routes
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};