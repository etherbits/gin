import { db } from "@/db";
import { passwordResetTokens, users } from "@/db/schemas/user";
import { lucia } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isWithinExpirationDate } from "oslo";
import { Argon2id } from "oslo/password";

export default function Page({ params }: { params: { token: string } }) {
  console.log(params.token);
  return (
    <div>
      <main>
        <form action={resetPassword}>
          <input type="hidden" name="verification-token" value={params.token} />
          <label htmlFor="new-password">New Password</label>
          <input type="password" id="new-password" name="new-password" />
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
          />
          <button>Reset</button>
        </form>
      </main>
    </div>
  );
}

async function resetPassword(formData: FormData) {
  "use server";

  const verificationToken = formData.get("verification-token") as string;
  const confirmPassword = formData.get("confirm-password") as string;
  const newPassword = formData.get("new-password") as string;

  if (newPassword !== confirmPassword) {
    return "Passwords do not match";
  }

  const token = await db.transaction(async (tx) => {
    const token = await tx.query.passwordResetTokens.findFirst({
      where: (token, { eq }) => eq(token.id, verificationToken),
    });

    if (token) {
      await tx
        .delete(passwordResetTokens)
        .where(eq(passwordResetTokens.id, token.id));
    }

    return token;
  });

  if (!token) {
    return "Invalid token";
  }

  const tokenExpirationDate = new Date(token.expiresAt);

  if (!isWithinExpirationDate(tokenExpirationDate)) {
    return "Token has expired";
  }

  const user = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.id, token.userId),
  });

  if (!user) {
    return "User not found";
  }

  await lucia.invalidateUserSessions(user.id);
  const hashedPassword = await new Argon2id().hash(newPassword);
  await db
    .update(users)
    .set({
      hashed_password: hashedPassword,
    })
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
