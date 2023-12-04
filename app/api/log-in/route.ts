import { auth } from "@/lib/lucia";
import * as context from "next/headers";
import type { NextRequest } from "next/server";
import { env } from "@/app/env";
import { loginSchema } from "@/schemas/auth";
import { ZodSchema } from "zod";

export async function getParsedFormData<T>(
  request: NextRequest,
  schema: ZodSchema<T>,
) {
  const formData = await request.formData();
  const objData = Object.fromEntries(formData.entries());
  const parsedData = await schema.safeParseAsync(objData);

  if (!parsedData.success) {
    throw new Error(parsedData.error.message);
  }

  return parsedData.data;
}

export async function POST(request: NextRequest) {
  const { email, password } = await getParsedFormData(request, loginSchema);

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
