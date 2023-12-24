import { db } from "@/db/drizzle"
import { respondWithSuccess } from "@/utils/api"
import { generatePasswordResetToken, sendPasswordResetLink } from "@/utils/auth"
import { withErrorHandler, getResult } from "@/utils/errorHandling"
import { getParsedJsonData } from "@/utils/parser"
import { userEmail } from "@/validation-schemas/auth"
import { ApiError } from "@/utils/errorHandling"
import { NextRequest } from "next/server"

export const POST = withErrorHandler(async (request: NextRequest) => {
  const { email } = await getParsedJsonData(request, userEmail)

  const user = await getUser(email)
  const token = await generatePasswordResetToken(user.id)
  await sendPasswordResetLink(email, token)

  return respondWithSuccess()
})

async function getUser(email: string) {
  return await getResult(
    async () => {
      const user = await db.query.user.findFirst({
        where: (user, { eq }) => eq(user.email, email),
      })

      if (!user) throw null

      return user
    },
    new ApiError(400, "User with that email does not exist"),
  )
}
