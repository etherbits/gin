import { auth } from "@/lib/lucia"
import { respondWithSuccess } from "@/utils/api"
import {
  generateEmailVerificationToken,
  sendEmailVerification,
} from "@/utils/auth"
import { ApiError, getResult, withErrorHandler } from "@/utils/errorHandling"
import { getParsedJsonData } from "@/utils/parser"
import { RegistrationData, registrationSchema } from "@/validation-schemas/auth"
import { Session, User } from "lucia"
import * as context from "next/headers"
import { type NextRequest } from "next/server"

export const POST = withErrorHandler(async (request: NextRequest) => {
  const registrationData = await getParsedJsonData(request, registrationSchema)

  const authData = await handleUserCreation(registrationData)
  await handleEmailVerification(authData.user)
  await handleSessionSet(authData.session)

  return respondWithSuccess()
})

async function handleUserCreation(registrationData: RegistrationData) {
  const { username, email, password } = registrationData

  return await getResult(
    async () => {
      const user = await auth.createUser({
        key: {
          providerId: "email",
          providerUserId: email.toLowerCase(),
          password: password,
        },
        attributes: {
          username,
          email: email.toLowerCase(),
          email_verified: false,
        },
      })

      const session = await auth.createSession({
        userId: user.userId,
        attributes: {},
      })

      return { user, session }
    },
    new ApiError(
      400,
      "Something went wrong with creating your account, check your email and password",
    ),
  )
}

async function handleEmailVerification(user: User) {
  return await getResult(
    async () => {
      const token = await generateEmailVerificationToken(user.userId)
      return await sendEmailVerification(user.email, token)
    },
    new ApiError(
      500,
      "Something went wrong with sending your verification email, try again later or with a different email",
    ),
  )
}

async function handleSessionSet(session: Session) {
  return await getResult(
    async () => {
      const authRequest = auth.handleRequest("POST", context)

      authRequest.setSession(session)
    },
    new ApiError(
      500,
      "Something went wrong with setting your session, try again later",
    ),
  )
}
