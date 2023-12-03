import { env } from "@/app/env";
import { auth } from "@/lib/lucia";
import { validateEmailVerificationToken } from "@/utils/auth";

export async function GET(request: Request) {
  const parsedUrl = new URL(request.url);
  const query = parsedUrl.searchParams;
  const token = query.get("token");

  if (!token) {
    return new Response(null, { status: 400 });
  }

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

  const sessionCookie = auth.createSessionCookie(session);

  return new Response(null, {
    status: 302,
    headers: {
      Location: env.DEFAULT_PATH,
      "Set-Cookie": sessionCookie.serialize(),
    },
  });
}
