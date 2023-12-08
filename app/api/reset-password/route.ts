import { env } from "@/app/env";
import { db } from "@/db/drizzle";
import { auth } from "@/lib/lucia";
import { respondWithSuccess } from "@/utils/api";
import {
  generatePasswordResetToken,
  sendPasswordResetLink,
  validatePasswordResetToken,
} from "@/utils/auth";
import { ApiError, getResult, withErrorHandler } from "@/utils/errorHandling";
import { getParsedFormData } from "@/utils/parser";
import { passwordResetSchema, userEmail } from "@/validation-schemas/auth";
import { User } from "lucia";
import { NextRequest } from "next/server";

export const POST = withErrorHandler(async (request: NextRequest) => {
  const { email } = await getParsedFormData(request, userEmail);

  const user = await getResult(
    async () => {
      const user = await db.query.user.findFirst({
        where: (user, { eq }) => eq(user.email, email),
      });

      if (!user) throw null;

      return user;
    },
    new ApiError(400, "User with that email does not exist"),
  );

  const token = await generatePasswordResetToken(user.id);
  await sendPasswordResetLink(email, token);

  return respondWithSuccess();
});

export async function GET(request: NextRequest) {
  const { password } = await getParsedFormData(request, passwordResetSchema);
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    throw new ApiError(400, "Token is required");
  }

  const userId = await validatePasswordResetToken(token);
  const user = await updateUserPassword(userId, password);
  const sessionCookie = await createNewSession(user);

  return new Response(null, {
    status: 302,
    headers: {
      Location: env.DEFAULT_PATH,
      "Set-Cookie": sessionCookie.serialize(),
    },
  });
}

async function updateUserPassword(userId: string, password: string) {
  return await getResult(
    async () => {
      let user = await auth.getUser(userId);
      await auth.invalidateAllUserSessions(user.userId);
      await auth.updateKeyPassword("email", user.email, password);

      if (!user.emailVerified) {
        user = await auth.updateUserAttributes(user.userId, {
          email_verified: true,
        });
      }

      return user;
    },
    new ApiError(500, "Something went wrong with updating your password"),
  );
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
