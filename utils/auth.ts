import { auth } from "@/lib/lucia";
import { cache } from "react";
import * as context from "next/headers";
import { db } from "@/db/drizzle";
import { generateRandomString, isWithinExpiration } from "lucia/utils";
import { emailVerification } from "@/db/schema/user";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import { env } from "@/app/env";
import { ApiError } from "./errorHandling";

const EMAIL_VERIFICATION_EXPIRY = 1000 * 60 * 60 * 2;

export const getPageSession = cache(() => {
  const authRequest = auth.handleRequest("GET", context);
  return authRequest.validate();
});

export const getRouteSession = async (request: NextRequest) => {
  const authRequest = auth.handleRequest(request.method, context);
  const session = await authRequest.validate();

  if (!session) {
    throw new ApiError(401, "You must be logged in to access this route");
  }

  return session;
};

export const generateEmailVerificationToken = async (userId: string) => {
  let newToken;

  const existingTokens = await db.query.emailVerification.findMany({
    where: (verification, { eq }) => eq(verification.userId, userId),
  });

  if (existingTokens.length > 0) {
    newToken = existingTokens.find((token) =>
      isWithinExpiration(Number(token.expires) - EMAIL_VERIFICATION_EXPIRY / 2),
    );
  }

  if (newToken) return newToken.id;

  newToken = generateRandomString(64);

  await db.insert(emailVerification).values({
    id: newToken,
    userId,
    expires: new Date().getTime() + EMAIL_VERIFICATION_EXPIRY,
  });

  return newToken;
};

export const validateEmailVerificationToken = async (token: string) => {
  const storedToken = await db.transaction(async (trx) => {
    const storedToken = await trx.query.emailVerification.findFirst({
      where: ({ id }, { eq }) => eq(id, token),
    });

    if (!storedToken) {
      throw new ApiError(
        400,
        "Invalid verification token provided, try a different one",
      );
    }

    await trx
      .delete(emailVerification)
      .where(eq(emailVerification.userId, storedToken.userId));

    return storedToken;
  });

  const tokenExpiry = Number(storedToken.expires);
  if (!isWithinExpiration(tokenExpiry)) {
    throw new ApiError(400, "Token expired, try a newer one");
  }

  return storedToken.userId;
};

export async function sendEmailVerification(userEmail: string, token: string) {
  const url =
    env.NEXT_PUBLIC_VERCEL_ENV === "development"
      ? "http://localhost:3000"
      : "https://gin.nikaa.online";

  const verificationUrl = `${url}/api/verify-email?token=${token}`;

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
      html: `<div><h1>Email Verification for Gin<h1><a href=${verificationUrl}>verify email</a></div>`,
    }),
  });

  if (!res.ok) {
    throw new ApiError(
      500,
      "Failed to send verification email, please try again later",
    );
  }

  return await res.json();
}

export async function generatePasswordResetToken(userId: string) {
  // const storedUserTokens = await db.query

}
