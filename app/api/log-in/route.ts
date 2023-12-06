import { auth } from "@/lib/lucia";
import * as context from "next/headers";
import type { NextRequest } from "next/server";
import { env } from "@/app/env";
import { loginSchema } from "@/validation-schemas/auth";
import { getParsedFormData, respondWithZodError } from "@/utils/parser";

export async function POST(request: NextRequest) {
  const parsedData = await getParsedFormData(request, loginSchema);

  if (!parsedData.success) {
    return respondWithZodError(parsedData.error);
  }

  const { email, password } = parsedData.data;

  const key = await auth.useKey("email", email.toLowerCase(), password);

  const session = await auth.createSession({
    userId: key.userId,
    attributes: {},
  });

  const authRequest = auth.handleRequest(request.method, context);
  authRequest.setSession(session);

  return new Response(null, {
    status: 302,
    headers: {
      Location: env.DEFAULT_PATH,
    },
  });
}
