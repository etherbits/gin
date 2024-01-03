import { auth, googleAuth } from "@/lib/lucia"
import { parseCookie } from "lucia/utils"
import { ApiError, getResult, withErrorHandler } from "@/utils/errorHandling"
import { NextRequest } from "next/server"
import { env } from "@/app/env"
import { User } from "lucia"
import { db } from "@/db/drizzle"
import { user as userSchema } from "@/db/schema/user"
import { eq } from "drizzle-orm"

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

async function getUser(code: string) {
  const { getExistingUser, googleUser, createUser, createKey } =
    await googleAuth.validateCallback(code)

  const existingUser = await getExistingUser()
  if (existingUser) return existingUser

  if (!googleUser.email || !googleUser.email_verified) {
    throw new Error("Email not verified")
  }

  const existingDatabaseUserWithEmail = await db.query.user.findFirst({
    where: eq(userSchema.email, googleUser.email),
  })

  if (existingDatabaseUserWithEmail) {
    // transform `UserSchema` to `User`
    const user = auth.transformDatabaseUser(existingDatabaseUserWithEmail)
    await createKey(user.userId)
    return user
  }
  return await createUser({
    attributes: {
      username: googleUser.name,
      email: googleUser.email,
      email_verified: false,
    },
  })
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
