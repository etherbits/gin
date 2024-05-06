"use server";

import { lucia } from "@/lib/auth";
import { validateRequest } from "@/utils/auth";
import { ActionResult } from "@/utils/validation";
import { cookies } from "next/headers";

export async function signOut(): Promise<ActionResult<unknown>> {
  const { session } = await validateRequest();

  if (!session) {
    return {
      status: "error",
      error: {
        formError: "No session found",
      },
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return { status: "success" };
}
