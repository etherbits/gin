import { user } from "@/db/schema/user";
import { auth } from "@/lib/lucia";
import { respondWithSuccess } from "@/utils/api";
import { validatePasswordResetToken } from "@/utils/auth";
import { getResult } from "@/utils/errorHandling";
import { getParsedFormData } from "@/utils/parser";
import { passwordResetSchema } from "@/validation-schemas/auth";
import { User } from "lucia";
import { ApiError } from "@/utils/errorHandling";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/app/env";

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } },
) {
  const token = params.token;
  const { password } = await getParsedFormData(request, passwordResetSchema);

  const userId = await validatePasswordResetToken(token);
  let user = await auth.getUser(userId);
  await auth.invalidateAllUserSessions(user.userId);
  await auth.updateKeyPassword("email", user.email, password);

  if (!user.emailVerified) {
    user = await auth.updateUserAttributes(user.userId, {
      email_verified: true,
    });
  }

  const sessionCookie = await createNewSession(user);

  return new Response(null, {
    status: 302,
    headers: {
      Location: env.DEFAULT_PATH,
      "Set-Cookie": sessionCookie.serialize(),
    },
  });
}

async function createNewSession(user: User) {
  return await getResult(
    async () => {
      const session = await auth.createSession({
        userId: user.userId,
        attributes: {},
      });

      return auth.createSessionCookie(session);
    },
    new ApiError(500, "Something went wrong with create a new session"),
  );
}
