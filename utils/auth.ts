import { auth } from "@/lib/lucia";
import { cache } from "react";
import * as context from "next/headers";
import { db } from "@/db/drizzle";
import { generateRandomString, isWithinExpiration } from "lucia/utils";
import { emailVerification } from "@/db/schema";
import { eq } from "drizzle-orm";

const EMAIL_VERIFICATION_EXPIRY = 1000 * 60 * 60 * 2;

export const getPageSession = cache(() => {
  const authRequest = auth.handleRequest("GET", context);
  return authRequest.validate();
});

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

    if (!storedToken) throw new Error("Invalid token");

    await trx
      .delete(emailVerification)
      .where(eq(emailVerification.userId, storedToken.userId));

    return storedToken;
  });

  const tokenExpiry = Number(storedToken.expires);
  if (!isWithinExpiration(tokenExpiry)) {
    throw new Error("Token expired");
  }

  return storedToken.userId;
};
