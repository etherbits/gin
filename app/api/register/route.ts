// app/api/signup/route.ts
import { auth } from "@/lib/lucia";
import * as context from "next/headers";
import type { NextRequest } from "next/server";
import { env } from "@/app/env";

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const user = await auth.createUser({
    key: {
      providerId: "username",
      providerUserId: username.toLowerCase(),
      password: password,
    },
    attributes: {
      username,
      email,
      emailVerified: false,
    },
  });

  const session = await auth.createSession({
    userId: user.userId,
    attributes: {},
  });

  const authRequest = auth.handleRequest(request.method, context);

  authRequest.setSession(session);

  return new Response(null, {
    status: 302,
    headers: {
      Location: env.DEFAULT_PATH,
    },
  });
};
