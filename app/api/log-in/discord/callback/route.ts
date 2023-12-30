import { auth, discordAuth } from "@/lib/lucia"
import { parseCookie } from "lucia/utils"
import { OAuthRequestError } from "@lucia-auth/oauth"
import { ApiError, withErrorHandler } from "@/utils/errorHandling"
import { NextRequest } from "next/server"
import { env } from "@/app/env"

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
    const { getExistingUser, discordUser, createUser } =
      await discordAuth.validateCallback(code)

    const getUser = async () => {
      const existingUser = await getExistingUser()
      if (existingUser) return existingUser

      if (!discordUser.email) {
				 throw new ApiError(500, 'No email found')
			}

      const user = await createUser({
        attributes: {
          username: discordUser.username,
          email: discordUser.email ?? "",
          email_verified: true,
        },
      })
      return user
    }

    const user = await getUser()
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
  } catch (e) {
    if (e instanceof OAuthRequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      })
    }
    console.error('err: ', e)
    return new Response(null, {
      status: 500,
    })
  }
})
