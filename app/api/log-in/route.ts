import { auth } from "@/lib/lucia";
import * as context from "next/headers";
import type { NextRequest } from "next/server";
import { env } from "@/app/env";
import { LoginData, loginSchema } from "@/validation-schemas/auth";
import { getParsedFormData } from "@/utils/parser";
import {
  getResult,
  respondWithError,
  respondWithValidationError,
} from "@/utils/errorHandling";

export async function POST(request: NextRequest) {
  const [loginData, parseError] = await getParsedFormData(request, loginSchema);

  if (parseError) {
    return respondWithValidationError(parseError);
  }

  const [, error] = await authenticateUser(loginData);

  if (error) {
    return respondWithError({
      message: "Something went wrong with authenticating your account",
      error,
      status: 400,
    });
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: env.DEFAULT_PATH,
    },
  });
}

async function authenticateUser(loginData: LoginData) {
  const { email, password } = loginData;

  return await getResult(async () => {
    const key = await auth.useKey("email", email.toLowerCase(), password);
    const session = await auth.createSession({
      userId: key.userId,
      attributes: {},
    });

    const authRequest = auth.handleRequest("POST", context);
    authRequest.setSession(session);
  });
}
