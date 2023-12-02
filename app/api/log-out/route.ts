import { auth } from "@/lib/lucia";
import * as context from "next/headers";
import type { NextRequest } from "next/server";
import { env } from "@/app/env";

export const POST = async (request: NextRequest) => {
  const authRequest = auth.handleRequest(request.method, context);
  const session = await authRequest.validate();

  if (!session) {
    return new Response("Session does not exist", {
      status: 404,
      headers: {
        Location: env.DEFAULT_PATH,
      },
    });
  }

  await auth.invalidateSession(session.sessionId);

  return new Response("Ok", {
    status: 303,
    headers: {
      Location: env.AUTH_GUARD_PATH,
    },
  });
};
