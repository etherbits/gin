"use server";

import { db } from "@/db";
import { users } from "@/db/schemas/user";
import { lucia } from "@/lib/auth";
import { generateEmailVerificationCode } from "@/utils/auth";
import { sendEmailVerificationCode } from "@/utils/mail";
import {
  ActionResult,
  generateServerErrors,
  validateFormData,
} from "@/utils/validation";
import {
  RegistrationData,
  registrationSchema,
} from "@/validation-schemas/auth";
import { generateId } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";

export async function signUp(
  _prevState: ActionResult<null>,
  formData: RegistrationData,
): Promise<ActionResult<null>> {
  const parseResult = await validateFormData(formData, registrationSchema);

  if (!parseResult.success) {
    return { status: "error", error: generateServerErrors(parseResult.error) };
  }

  const { username, email, password } = parseResult.data;

  const hashedPassword = await new Argon2id().hash(password);
  const userId = generateId(15);

  const userWithUsername = await db.query.users.findFirst({
    where: ({ username: currUsername }, { eq }) => eq(currUsername, username),
  });

  if (userWithUsername) {
    return {
      status: "error",
      error: {
        fieldErrors: {
          username: {
            message: "Username is already in use",
          },
        },
      },
    };
  }

  const userWithEmail = await db.query.users.findFirst({
    where: ({ email: currEmail }, { eq }) => eq(currEmail, email),
  });

  if (userWithEmail) {
    return {
      status: "error",
      error: {
        fieldErrors: {
          email: {
            message: "Email is already in use",
          },
        },
      },
    };
  }

  try {
    await db.insert(users).values({
      id: userId,
      username: username,
      email: email,
      hashed_password: hashedPassword,
    });
  } catch (e: unknown) {
    return {
      status: "error",
      error: {
        fieldErrors: {
          email: {
            message:
              "Something went wrong. Try with different credentials or come back later",
          },
        },
      },
    };
  }
  const code = await generateEmailVerificationCode(userId, email);
  await sendEmailVerificationCode(email, code);

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect("/verify-email");
}
