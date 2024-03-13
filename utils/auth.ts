import { db } from "@/db";
import { emailVerificationCodes, passwordResetTokens } from "@/db/schemas/user";
import { lucia } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { Session, User, generateId } from "lucia";
import { cookies } from "next/headers";
import { TimeSpan, createDate } from "oslo";
import { alphabet, generateRandomString } from "oslo/crypto";
import { cache } from "react";

export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);
    // next.js throws when you attempt to set cookie when rendering page
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
    } catch {}
    return result;
  },
);

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
    expiresAt: createDate(new TimeSpan(5, "m")).getTime(), // 5 minutes
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
    expiresAt: createDate(new TimeSpan(2, "h")).getTime(), // 2 hours
  });

  return tokenId;
}
