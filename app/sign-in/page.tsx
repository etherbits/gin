import { db } from "@/db";
import { user } from "@/db/schemas/user";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";

export default async function Page() {
  return (
    <>
      <h1>Sign in</h1>
      <form action={login}>
        <label htmlFor="username">Username</label>
        <input name="username" id="username" />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <br />
        <button>Continue</button>
      </form>
    </>
  );
}

async function login(formData: FormData) {
  "use server";
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return;
  }

  const existingUser = await db.query.user.findFirst({
    where: (user, { eq }) => eq(user.username, username),
  });

  if (!existingUser) {
    return {
      error: "Incorrect username or password",
    };
  }

  const validPassword = await new Argon2id().verify(
    existingUser.hashed_password,
    password,
  );

  if (!validPassword) {
    return {
      error: "Incorrect username or password",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/home");
}
