import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { medusaClient } from "./lib/medusa"

// List of paths that require authentication
const protectedPaths = ["/account"]

// List of paths that are only accessible to non-authenticated users
const authPaths = ["/login", "/signup"]

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Get the session cookie
  const sessionCookie = request.cookies.get("_medusa_session")

  // Check if the path requires authentication
  const isProtectedPath = protectedPaths.some((p) => path.startsWith(p))
  const isAuthPath = authPaths.some((p) => path.startsWith(p))

  try {
    // If there's a session cookie, verify it
    if (sessionCookie) {
      // For auth paths, redirect to account if already logged in
      if (isAuthPath) {
        return NextResponse.redirect(new URL("/account", request.url))
      }
      return NextResponse.next()
    } else {
      // No session cookie
      if (isProtectedPath) {
        // Redirect to login for protected paths
        return NextResponse.redirect(new URL("/login", request.url))
      }
      return NextResponse.next()
    }
  } catch (error) {
    // If session verification fails, clear the cookie and redirect to login
    if (isProtectedPath) {
      const response = NextResponse.redirect(new URL("/login", request.url))
      response.cookies.delete("_medusa_session")
      return response
    }
    return NextResponse.next()
  }
}

// Configure paths that trigger the middleware
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api (API routes)
     * 2. /_next (Next.js internals)
     * 3. /static (static files)
     * 4. .*\\..*$ (files with extensions)
     */
    "/((?!api|_next|static|.*\\..*$).*)",
  ],
} 