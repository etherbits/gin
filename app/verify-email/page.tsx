import { db } from "@/db";
import { emailVerificationCodes, users } from "@/db/schemas/user";
import { lucia } from "@/lib/auth";
import { validateRequest } from "@/utils/auth";
import { eq } from "drizzle-orm";
import { User } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isWithinExpirationDate } from "oslo";

export default async function Page() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <form action={verifyEmail}>
          <label htmlFor="code">Verification Code</label>
          <input type="text" id="code" name="code" />
          <button>Verify</button>
        </form>
      </main>
    </div>
  );
}

async function verifyEmail(formData: FormData) {
  "use server";
  const sessionId = cookies().get(lucia.sessionCookieName);
  if (sessionId === undefined) {
    return "No session cookie found";
  }

  const { user } = await lucia.validateSession(sessionId.value);
  if (!user) {
    return "Invalid session cookie";
  }

  const code = formData.get("code");
  if (typeof code !== "string") {
    return "Invalid code was provided";
  }

  const validCode = await verifyEmailCode(user, code);
  if (!validCode) {
    return "The provided code is invalid or expired";
  }

  await lucia.invalidateUserSessions(user.id);

  await db
    .update(users)
    .set({ email_verified: 1 })
    .where(eq(users.id, user.id));

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect("/home");
}

async function verifyEmailCode(user: User, code: string) {
  const dbCode = await db.transaction(async (tx) => {
    const dbCode = await tx.query.emailVerificationCodes.findFirst({
      where: (code, { eq }) => eq(code.userId, user.id),
    });

    if (!dbCode || dbCode.code !== code) {
      return;
    }

    await tx
      .delete(emailVerificationCodes)
      .where(eq(emailVerificationCodes.id, dbCode.id));

    return dbCode;
  });

  if (!dbCode) {
    return false;
  }

  const codeExpirationDate = new Date(dbCode.expiresAt);

  if (
    !isWithinExpirationDate(codeExpirationDate) ||
    dbCode.email !== user.email
  ) {
    return false;
  }

  return true;
}
