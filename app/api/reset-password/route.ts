import { env } from "@/app/env"
import { auth } from "@/lib/lucia"
import { validatePasswordResetToken } from "@/utils/auth"
import { ApiError, getResult, withErrorHandler } from "@/utils/errorHandling"
import { getParsedJsonData } from "@/utils/parser"
import { passwordResetSchema } from "@/validation-schemas/auth"
import { User } from "lucia"
import { NextRequest } from "next/server"

export const POST = withErrorHandler(async (request: NextRequest) => {
  const { password } = await getParsedJsonData(request, passwordResetSchema)
  const token = request.nextUrl.searchParams.get("token")

  if (!token) {
    throw new ApiError(400, "Token is required")
  }

  const userId = await validatePasswordResetToken(token)
  const user = await updateUserPassword(userId, password)
  const sessionCookie = await createNewSession(user)

  return new Response(null, {
    status: 302,
    headers: {
      Location: env.DEFAULT_PATH,
      "Set-Cookie": sessionCookie.serialize(),
    },
  })
})

async function updateUserPassword(userId: string, password: string) {
  return await getResult(
    async () => {
      let user = await auth.getUser(userId)
      await auth.invalidateAllUserSessions(user.userId)
      await auth.updateKeyPassword("email", user.email, password)

      if (!user.email_verified) {
        user = await auth.updateUserAttributes(user.userId, {
          email_verified: true,
        })
      }

      return user
    },
    new ApiError(500, "Something went wrong with updating your password"),
  )
}

async function createNewSession(user: User) {
  return await getResult(
    async () => {
      const session = await auth.createSession({
        userId: user.userId,
        attributes: {},
      })

      return auth.createSessionCookie(session)
    },
    new ApiError(500, "Something went wrong with create a new session"),
  )
}
