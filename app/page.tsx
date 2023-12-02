import { auth } from "@/lib/lucia";
import * as context from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { env } from "@/app/env";

export default async function Home() {
  const authRequest = auth.handleRequest("GET", context);
  const session = await authRequest.validate();

  if (!session) redirect(env.AUTH_GUARD_PATH);

  return (
    <main>
      Gin
      <Link href="/log-in"> Log In </Link>
      <Link href="/register"> Register </Link>
    </main>
  );
}
