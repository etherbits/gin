import { auth } from "@/lib/lucia";
import * as context from "next/headers";
import type { NextRequest } from "next/server";
import {
  generateEmailVerificationToken,
  sendEmailVerification,
} from "@/utils/auth";
import { registrationSchema } from "@/schemas/auth";
import { getParsedFormData } from "@/utils/parser";

export async function POST(request: NextRequest) {
  const { username, email, password } = await getParsedFormData(
    request,
    registrationSchema,
  );

  const user = await auth.createUser({
    key: {
      providerId: "email",
      providerUserId: email.toLowerCase(),
      password: password,
    },
    attributes: {
      username,
      email: email.toLowerCase(),
      email_verified: false,
    },
  });

  const session = await auth.createSession({
    userId: user.userId,
    attributes: {},
  });

  const token = await generateEmailVerificationToken(user.userId);
  await sendEmailVerification(user.email, token);

  const authRequest = auth.handleRequest(request.method, context);

  authRequest.setSession(session);

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/email-verification",
    },
  });
}
