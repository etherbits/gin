"use server";

import { emailVerificationExpiry, passwordResetExpiry } from "./timing";
import { db } from "@/db";
import { emailVerificationCodes, passwordResetTokens } from "@/db/schemas/user";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { createDate } from "oslo";
import { alphabet, generateRandomString } from "oslo/crypto";

export async function generateEmailVerificationCode(
  userId: string,
  email: string,
): Promise<string> {
  await db
    .delete(emailVerificationCodes)
    .where(eq(emailVerificationCodes.userId, userId));

  const id = generateId(15);
  const code = generateRandomString(8, alphabet("0-9"));

  await db.insert(emailVerificationCodes).values({
    id,
    userId: userId,
    email,
    code,
    expiresAt: createDate(emailVerificationExpiry).getTime(), // 5 minutes
  });

  return code;
}

export async function createPasswordResetToken(
  userId: string,
): Promise<string> {
  // optionally invalidate all existing tokens
  await db
    .delete(passwordResetTokens)
    .where(eq(passwordResetTokens.userId, userId));

  const tokenId = generateId(40);

  await db.insert(passwordResetTokens).values({
    id: tokenId,
    userId,
    expiresAt: createDate(passwordResetExpiry).getTime(), // 2 hours
  });

  return tokenId;
}
