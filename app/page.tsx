import { auth } from "@/lib/lucia";
import * as context from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const authRequest = auth.handleRequest("GET", context);
  const session = await authRequest.validate();

  if (!session) redirect("/log-in");

  return (
    <main>
      Gin
      <Link href="/register"> Register </Link>
    </main>
  );
}
