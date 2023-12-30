import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/lib/lucia"
import { env } from "@/app/env"
import { AuthRequest, Session } from "lucia"

const publicRegex = /^\/$/ // exactly '/'
const authenticationRegex = /^(\/log-in|\/register).*$/ // starts with '/log-in' or '/register'

export async function middleware(request: NextRequest) {
  if (isPublic(request)) {
    return NextResponse.next()
  }

  const authRequest = auth.handleRequest(request)
  const session = await authRequest.validate()

  // redirect to login page if not authenticated and NOT accessing any authentication paths
  if (shouldAuthenticate(request, session)) {
    return new NextResponse("Please log in to access the page", {
      status: 303,
      headers: {
        Location: new URL(env.AUTH_GUARD_PATH, request.url).href,
      },
    })
  }

  // redirect to default page if already authenticated and accessing any authentication paths
  if (isAlreadyAuthenticated(request, session)) {
    return new NextResponse("User already authenticated", {
      status: 303,
      headers: {
        Location: new URL(env.DEFAULT_PATH, request.url).href,
      },
    })
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
}

function isPublic(request: NextRequest) {
  const parsedUrl = new URL(request.url)
  return publicRegex.test(parsedUrl.pathname)
}

function shouldAuthenticate(request: NextRequest, session: Session | null) {
  const parsedUrl = new URL(request.url)
  return !session && !authenticationRegex.test(parsedUrl.pathname)
}

function isAlreadyAuthenticated(request: NextRequest, session: Session | null) {
  const parsedUrl = new URL(request.url)
  return session && authenticationRegex.test(parsedUrl.pathname)
}
