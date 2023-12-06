import { env } from "@/app/env";
import { auth } from "@/lib/lucia";
import { validateEmailVerificationToken } from "@/utils/auth";
import { getResult, respondWithError } from "@/utils/errorHandling";

export async function GET(request: Request) {
  const parsedUrl = new URL(request.url);
  const query = parsedUrl.searchParams;
  const token = query.get("token");

  if (!token) {
    return new Response(null, { status: 400 });
  }

  const [sessionCookie, error] = await getResult(async () => {
    const userId = await validateEmailVerificationToken(token);
    const user = await auth.getUser(userId);
    await auth.invalidateAllUserSessions(user.userId);
    await auth.updateUserAttributes(user.userId, {
      email_verified: true,
    });

    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });

    return auth.createSessionCookie(session);
  });

  if (error) {
    return respondWithError({
      message: "Could not verify email",
      error,
      status: 500,
    });
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: env.DEFAULT_PATH,
      "Set-Cookie": sessionCookie.serialize(),
    },
  });
}
