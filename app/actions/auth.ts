"use server";
import { auth } from "@/lib/lucia";
import { cookies } from "next/headers";

export async function register(formData: FormData) {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  console.log({ username, email, password, confirmPassword });

  // will use zod later
  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }

  const user = await auth.createUser({
    key: {
      providerId: "username",
      providerUserId: username,
      password: password,
    },
    attributes: {
      username,
      email,
    },
  });

  const session = await auth.createSession({
    userId: user.userId,
    attributes: { username, email },
  });

  const sessionCookie = auth.createSessionCookie(session);

  cookies().set(sessionCookie);

  return "success";
}
