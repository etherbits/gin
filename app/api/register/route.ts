// app/api/signup/route.ts
import { auth } from "@/lib/lucia";
import * as context from "next/headers";

import type { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
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
      providerUserId: username.toLowerCase(),
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

  const authRequest = auth.handleRequest(request.method, context);

  authRequest.setSession(session);

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
    },
  });
};
