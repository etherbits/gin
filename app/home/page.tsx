import { lucia } from "@/lib/auth";
import { validateRequest } from "@/utils/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex items-center justify-between gap-8 p-16">
      <h1 className="text-2xl">
        Welcome {user.username} {user.email}
      </h1>
      <form action={logout}>
        <button className="bg-neutral-950 px-4 py-2">Sign out</button>
      </form>
    </div>
  );
}

async function logout() {
  "use server";

  const { session } = await validateRequest();

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect("/sign-in");
}
