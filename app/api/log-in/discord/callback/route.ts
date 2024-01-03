import { auth, discordAuth } from "@/lib/lucia"
import { parseCookie } from "lucia/utils"
import { OAuthRequestError } from "@lucia-auth/oauth"
import { ApiError, withErrorHandler } from "@/utils/errorHandling"
import { NextRequest } from "next/server"
import { env } from "@/app/env"
import { db } from "@/db/drizzle"
import { eq } from "drizzle-orm"
import { user as userSchema } from "@/db/schema"

export const GET = withErrorHandler(async (request: NextRequest) => {
  const cookies = parseCookie(request.headers.get("Cookie") ?? "")
  const storedState = cookies.discord_oauth_state
  const url = new URL(request.url)
  const state = url.searchParams.get("state")
  const code = url.searchParams.get("code")
  // validate state
  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, {
      status: 400,
    })
  }
  try {
    const { getExistingUser, discordUser, createUser, createKey } =
      await discordAuth.validateCallback(code)

    const getUser = async () => {
      const existingUser = await getExistingUser()
      if (existingUser) return existingUser
      if (!discordUser.verified) {
        throw new Error("Email not verified")
      }
      const existingDatabaseUserWithEmail = await db.query.user.findFirst({ where: eq(userSchema.email, discordUser.email) })
      if (existingDatabaseUserWithEmail) {

        // transform `UserSchema` to `User`
        const user = auth.transformDatabaseUser(existingDatabaseUserWithEmail);
        await createKey(user.userId);
        return user;
      }
    }

    return await createUser({
      attributes: {
        username: discordUser.username,
        email: discordUser.email!,
        email_verified: false
      }
    });
  }

const user = await getUser()
  nst session = await auth.createSession({
    userId: user.userId,
    attributes: {},
  })
  const sessionCookie = auth.createSessionCookie(session)
// redirect to profile page
  turn new Response(null, {
    aders: {
      Location: env.DEFAULT_PATH,
      "Set-Cookie": sessionCookie.serialize(), // store session cookie
    },
    status: 302,
  })
  catch (e) {
    (e instanceof OAuthRequestError) {
    // invalid code
      turn new Response(null, {
      status: 400,
    })
    }
    console.error("err: ", e)
    turn new Response(null, {
      status: 500,
    })
  }
})
        existingDatabaseUserWithEmail.email_verified = true
