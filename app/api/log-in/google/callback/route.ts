import { auth, googleAuth } from "@/lib/lucia"
import { parseCookie } from "lucia/utils"
import { ApiError, getResult, withErrorHandler } from "@/utils/errorHandling"
import { NextRequest } from "next/server"
import { env } from "@/app/env"
import { User } from "lucia"

export const GET = withErrorHandler(async (request: NextRequest) => {
  const cookies = parseCookie(request.headers.get("Cookie") ?? "")
  const storedState = cookies.google_oauth_state
  const url = new URL(request.url)
  const state = url.searchParams.get("state")
  const code = url.searchParams.get("code")
  // validate state
  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, {
      status: 400,
    })
  }

  const user = await getUser(code)
  console.log("user: ", user)
  return createSession(user)
})

function getUser(code: string) {
  return getResult(
    async () => {
      const { getExistingUser, googleUser, createUser } =
        await googleAuth.validateCallback(code)

      const existingUser = await getExistingUser()
      console.log("existingUser", existingUser)

      if (existingUser) return existingUser

      if (!googleUser.email) {
        throw new ApiError(500, "User email was not found")
      }

      console.log("create user")
      const user = await createUser({
        attributes: {
          username: googleUser.name,
          email: googleUser.email,
          email_verified: !!googleUser.email_verified,
        },
      })

      return user
    },

    new ApiError(500, "User was not found and could not be created"),
  )
}

async function createSession(user: User) {
  return getResult(
    async () => {
      const session = await auth.createSession({
        userId: user.userId,
        attributes: {},
      })

      const sessionCookie = auth.createSessionCookie(session)
      // redirect to profile page
      return new Response(null, {
        headers: {
          Location: env.DEFAULT_PATH,
          "Set-Cookie": sessionCookie.serialize(), // store session cookie
        },
        status: 302,
      })
    },
    new ApiError(500, "Could not create session"),
  )
}
