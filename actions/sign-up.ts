"use server";

import { db } from "@/db";
import { users } from "@/db/schemas/user";
import { lucia } from "@/lib/auth";
import { generateEmailVerificationCode } from "@/utils/auth";
import { sendEmailVerificationCode } from "@/utils/mail";
import { validateFormData } from "@/utils/validation";
import { registrationSchema } from "@/validation-schemas/auth";
import { generateId } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";

export async function signUp(_prevState: unknown, formData: FormData) {
  const parseResult = await validateFormData(formData, registrationSchema);
  if (!parseResult.success) {
    return parseResult.error.formErrors;
  }

  const { username, email, password } = parseResult.data;

  const hashedPassword = await new Argon2id().hash(password);
  const userId = generateId(15);

  // TODO: check if username is already used
  await db.insert(users).values({
    id: userId,
    username: username,
    email: email,
    hashed_password: hashedPassword,
  });

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
