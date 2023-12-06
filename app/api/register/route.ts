import { auth } from "@/lib/lucia";
import * as context from "next/headers";
import type { NextRequest } from "next/server";
import {
  generateEmailVerificationToken,
  sendEmailVerification,
} from "@/utils/auth";
import {
  RegistrationData,
  registrationSchema,
} from "@/validation-schemas/auth";
import { getParsedFormData } from "@/utils/parser";
import {
  getResult,
  respondWithError,
  respondWithZodError,
} from "@/utils/errorHandling";
import { Session, User } from "lucia";

export async function POST(request: NextRequest) {
  const parsedData = await getParsedFormData(request, registrationSchema);

  if (!parsedData.success) {
    return respondWithZodError(parsedData.error);
  }

  const [authData, authError] = await handleUserCreation(parsedData.data);

  if (authError) {
    return respondWithError({
      message: "Something went wrong with creating your account",
      error: authError,
      status: 400,
    });
  }

  const [, verificationSendError] = await handleEmailVerification(
    authData.user,
  );

  if (verificationSendError) {
    return respondWithError({
      message: "Something went wrong with sending your verification email",
      error: verificationSendError,
      status: 500,
    });
  }

  const [, sessionSetError] = await handleSessionSet(authData.session);

  if (sessionSetError) {
    return respondWithError({
      message: "Something went wrong with setting your session",
      error: sessionSetError,
      status: 500,
    });
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/email-verification",
    },
  });
}

async function handleUserCreation(registrationData: RegistrationData) {
  const { username, email, password } = registrationData;

  return await getResult(async () => {
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

    return { user, session };
  });
}

async function handleEmailVerification(user: User) {
  return await getResult(async () => {
    const token = await generateEmailVerificationToken(user.userId);
    return await sendEmailVerification(user.email, token);
  });
}

async function handleSessionSet(session: Session) {
  return await getResult(async () => {
    const authRequest = auth.handleRequest("POST", context);

    authRequest.setSession(session);
  });
}
