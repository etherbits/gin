import { auth } from "@/lib/lucia";
import type { NextRequest } from "next/server";
import { getRouteSession } from "@/utils/auth";
import { ApiError, getResult } from "@/utils/errorHandling";
import { respondWithSuccess } from "@/utils/api";

export async function POST(request: NextRequest) {
  const session = await getRouteSession(request);

  await invalidateSession(session.sessionId);

  return respondWithSuccess();
}

async function invalidateSession(sessionId: string) {
  return await getResult(
    async () => {
      await auth.invalidateSession(sessionId);
    },
    new ApiError(500, "Something went wrong with logging out"),
  );
}
