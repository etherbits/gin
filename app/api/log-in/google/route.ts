import { googleAuth } from "@/lib/lucia"
import { withErrorHandler } from "@/utils/errorHandling"
import * as context from "next/headers"
import { NextResponse, type NextRequest } from "next/server"

export const GET = withErrorHandler(async (request: NextRequest) => {
  const [url, state] = await googleAuth.getAuthorizationUrl()

  context.cookies().set("google_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60,
  })

  return new NextResponse(null, {
    status: 302,
    headers: {
      Location: url.toString(),
    },
  })
})
