import { auth } from "@/lib/lucia";
import * as context from "next/headers";
import type { NextRequest } from "next/server";
import { env } from "@/app/env";
import type { User } from "@/db/schema";

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const key = await auth.useKey("username", username.toLowerCase(), password);

  const user: User = await auth.getUser(key.userId);

  const session = await auth.createSession({
    userId: key.userId,
    attributes: { username, email: user.email },
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
