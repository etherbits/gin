import { auth } from "@/lib/lucia"
import { cache } from "react"
import * as context from "next/headers"
import { db } from "@/db/drizzle"
import { generateRandomString, isWithinExpiration } from "lucia/utils"
import { emailVerification, passwordReset, user } from "@/db/schema/user"
import { eq } from "drizzle-orm"
import { NextRequest } from "next/server"
import { env } from "@/app/env"
import { ApiError } from "./errorHandling"
import {
  DiscordAuth,
  DiscordUser,
  GithubAuth,
  GithubUser,
  GoogleAuth,
  GoogleUser,
} from "@lucia-auth/oauth/providers"

const EMAIL_VERIFICATION_EXPIRY = 1000 * 60 * 60 * 2
const PASSWORD_VERIFICATION_EXPIRY = EMAIL_VERIFICATION_EXPIRY

export const getPageSession = cache(() => {
  const authRequest = auth.handleRequest("GET", context)
  return authRequest.validate()
})

export const getRouteSession = async (request: NextRequest) => {
  const authRequest = auth.handleRequest(request.method, context)
  const session = await authRequest.validate()

  if (!session) {
    throw new ApiError(401, "You must be logged in to access this route")
  }

  return session
}

export const generateEmailVerificationToken = async (userId: string) => {
  const existingTokens = await db.query.emailVerification.findMany({
    where: (verification, { eq }) => eq(verification.userId, userId),
  })

  if (existingTokens.length > 0) {
    const reusableToken = existingTokens.find((token) =>
      isWithinExpiration(Number(token.expires) - EMAIL_VERIFICATION_EXPIRY / 2),
    )

    if (reusableToken) return reusableToken.id
  }

  const newToken = generateRandomString(64)

  await db.insert(emailVerification).values({
    id: newToken,
    userId,
    expires: new Date().getTime() + EMAIL_VERIFICATION_EXPIRY,
  })

  return newToken
}

export const validateEmailVerificationToken = async (token: string) => {
  const storedToken = await db.transaction(async (trx) => {
    const storedToken = await trx.query.emailVerification.findFirst({
      where: ({ id }, { eq }) => eq(id, token),
    })

    if (!storedToken) {
      throw new ApiError(
        400,
        "Invalid verification token provided, try a different one",
      )
    }

    await trx
      .delete(emailVerification)
      .where(eq(emailVerification.userId, storedToken.userId))

    return storedToken
  })

  const tokenExpiry = Number(storedToken.expires)
  if (!isWithinExpiration(tokenExpiry)) {
    throw new ApiError(400, "Token expired, try a newer one")
  }

  return storedToken.userId
}

export async function sendEmailVerification(userEmail: string, token: string) {
  const baseUrl = env.BASE_URL

  const verificationUrl = `${baseUrl}/api/verify-email?token=${token}`

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Gin <gin@nikaa.online>",
      to: [userEmail],
      subject: "Email Verification",
      html: `<div><h1>Email verification for Gin<h1><a href=${verificationUrl}>verify email</a></div>`,
    }),
  })

  if (!res.ok) {
    throw new ApiError(
      500,
      "Failed to send verification email, please try again later",
    )
  }

  return await res.json()
}

export async function generatePasswordResetToken(userId: string) {
  const existingTokens = await db.query.passwordReset.findMany()

  if (existingTokens.length > 0) {
    const reusableToken = existingTokens.find((token) =>
      isWithinExpiration(
        Number(token.expires) - PASSWORD_VERIFICATION_EXPIRY / 2,
      ),
    )

    if (reusableToken) return reusableToken.id
  }

  const newToken = generateRandomString(64)

  await db.insert(passwordReset).values({
    id: newToken,
    userId,
    expires: new Date().getTime() + PASSWORD_VERIFICATION_EXPIRY,
  })

  return newToken
}

export const validatePasswordResetToken = async (token: string) => {
  const resetToken = await db.transaction(async (trx) => {
    const storedToken = await trx.query.passwordReset.findFirst({
      where: ({ id }, { eq }) => eq(id, token),
    })

    if (!storedToken) {
      throw new ApiError(
        400,
        "Invalid reset token provided, try a different one",
      )
    }

    await trx.delete(passwordReset).where(eq(passwordReset.id, storedToken.id))

    return storedToken
  })

  const tokenExpiry = Number(resetToken.expires)
  if (!isWithinExpiration(tokenExpiry)) {
    throw new ApiError(400, "Token expired, try a newer one")
  }

  return resetToken.userId
}

export async function sendPasswordResetLink(userEmail: string, token: string) {
  const baseUrl = env.BASE_URL

  const resetUrl = `${baseUrl}/api/reset-password?token=${token}`

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Gin <gin@nikaa.online>",
      to: [userEmail],
      subject: "Password Reset",
      html: `<div><h1>Password reset link for Gin<h1><a href=${resetUrl}>reset token</a></div>`,
    }),
  })

  if (!res.ok) {
    throw new ApiError(
      500,
      "Failed to send the password reset link, please try again later",
    )
  }

  return await res.json()
}
