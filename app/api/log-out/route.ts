import { auth } from "@/lib/lucia";
import type { NextRequest } from "next/server";
import { env } from "@/app/env";
import { getRouteSession } from "@/utils/auth";
import { getResult, respondWithError } from "@/utils/errorHandling";

export async function POST(request: NextRequest) {
  const session = await getRouteSession(request);

  if (!session) {
    return new Response("Session does not exist", {
      status: 404,
      headers: {
        Location: env.DEFAULT_PATH,
      },
    });
  }

  const [, error] = await getResult(async () => {
    await auth.invalidateSession(session.sessionId);
  });

  if (error) {
    return respondWithError({
      message: "Failed to invalidate session",
      error,
      status: 500,
    });
  }

  return new Response("Ok", {
    status: 303,
    headers: {
      Location: env.AUTH_GUARD_PATH,
    },
  });
}
