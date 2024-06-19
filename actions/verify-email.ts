"use server";

import { db } from "@/db";
import { emailVerificationCodes, users } from "@/db/schemas/user";
import { lucia } from "@/lib/auth";
import { setupAdditionalUserData } from "@/utils/setup";
import {
  ActionResult,
  generateServerErrors,
  validateFormData,
} from "@/utils/validation";
import { otpCodeSchema } from "@/validation-schemas/auth";
import { eq } from "drizzle-orm";
import { User } from "lucia";
import { cookies } from "next/headers";
import { isWithinExpirationDate } from "oslo";

export async function verifyEmail(
  _prevState: ActionResult<unknown>,
  formData: FormData,
): Promise<ActionResult<unknown>> {
  "use server";
  const sessionId = cookies().get(lucia.sessionCookieName);
  if (sessionId === undefined) {
    return { status: "error", error: { formError: "No session cookie found" } };
  }

  const { user } = await lucia.validateSession(sessionId.value);
  if (!user) {
    return { status: "error", error: { formError: "No user found" } };
  }

  const parsedData = await validateFormData(formData, otpCodeSchema);

  if (!parsedData.success) {
    return { status: "error", error: generateServerErrors(parsedData.error) };
  }

  const { code } = parsedData.data;

  const validCode = await verifyEmailCode(user, code);
  if (!validCode) {
    return {
      status: "error",
      error: { formError: "Code is invalid or expired" },
    };
  }

  await lucia.invalidateUserSessions(user.id);

  await db
    .update(users)
    .set({ email_verified: 1 })
    .where(eq(users.id, user.id));

  const setupRes = await setupAdditionalUserData(user.id);

  if (setupRes.status === "error") {
    return setupRes;
  }

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return { status: "success" };
}

async function verifyEmailCode(user: User, code: string) {
  const dbCode = await db.transaction(async (tx) => {
    const dbCode = await tx.query.emailVerificationCodes.findFirst({
      where: (code, { eq }) => eq(code.userId, user.id),
    });

    if (!dbCode || dbCode.code !== code) {
      return;
    }

    await tx
      .delete(emailVerificationCodes)
      .where(eq(emailVerificationCodes.id, dbCode.id));

    return dbCode;
  });

  if (!dbCode) {
    return false;
  }

  const codeExpirationDate = new Date(dbCode.expiresAt);

  if (
    !isWithinExpirationDate(codeExpirationDate) ||
    dbCode.email !== user.email
  ) {
    return false;
  }

  return true;
}
