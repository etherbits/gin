"use server";

import { db } from "@/db";
import { passwordResetTokens, users } from "@/db/schemas/user";
import { lucia } from "@/lib/auth";
import {
  ActionResult,
  generateServerErrors,
  validateFormData,
} from "@/utils/validation";
import { changePasswordSchema } from "@/validation-schemas/auth";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isWithinExpirationDate } from "oslo";
import { Argon2id } from "oslo/password";

export async function changePassword(
  _prevState: ActionResult<null>,
  formData: FormData,
): Promise<ActionResult<null>> {
  const parsedData = await validateFormData(formData, changePasswordSchema);

  if (!parsedData.success) {
    return { status: "error", error: generateServerErrors(parsedData.error) };
  }

  const { verificationToken, password: newPassword } = parsedData.data;

  const token = await db.transaction(async (tx) => {
    const token = await tx.query.passwordResetTokens.findFirst({
      where: (token, { eq }) => eq(token.id, verificationToken),
    });

    if (token) {
      await tx
        .delete(passwordResetTokens)
        .where(eq(passwordResetTokens.id, token.id));
    }

    return token;
  });

  if (!token) {
    return { status: "error", error: { formError: "Invalid token" } };
  }

  const tokenExpirationDate = new Date(token.expiresAt);

  if (!isWithinExpirationDate(tokenExpirationDate)) {
    return { status: "error", error: { formError: "Token has expired" } };
  }

  const user = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.id, token.userId),
  });

  if (!user) {
    return {
      status: "error",
      error: { formError: "No user exists with that token" },
    };
  }

  await lucia.invalidateUserSessions(user.id);
  const hashedPassword = await new Argon2id().hash(newPassword);
  await db
    .update(users)
    .set({
      hashed_password: hashedPassword,
    })
    .where(eq(users.id, user.id));

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect("/home");
}
