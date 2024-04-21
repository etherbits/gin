"use server";

import { db } from "@/db";
import { lucia } from "@/lib/auth";
import {
  ActionResult,
  generateServerErrors,
  validateFormData,
} from "@/utils/validation";
import { signInSchema } from "@/validation-schemas/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";

export async function signIn(
  _prevState: ActionResult<null>,
  formData: FormData,
): Promise<ActionResult<null>> {
  const parseResult = await validateFormData(formData, signInSchema);

  if (!parseResult.success) {
    return { status: "error", error: generateServerErrors(parseResult.error) };
  }

  const { username, password } = parseResult.data;

  const existingUser = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.username, username),
  });

  if (!existingUser) {
    return {
      status: "error",
      error: {
        fieldErrors: {
          username: {
            message: `No account with username: \"${username}\"`,
          },
        },
      },
    };
  }

  const validPassword = await new Argon2id().verify(
    existingUser.hashed_password,
    password,
  );

  if (!validPassword) {
    return {
      status: "error",
      error: {
        fieldErrors: {
          password: {
            message: "Incorrect password. Check your password and try again.",
          },
        },
      },
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect("/home");
}