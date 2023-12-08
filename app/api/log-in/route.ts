import { auth } from "@/lib/lucia";
import * as context from "next/headers";
import { type NextRequest } from "next/server";
import { LoginData, loginSchema } from "@/validation-schemas/auth";
import { getParsedFormData } from "@/utils/parser";
import { ApiError, getResult, withErrorHandler } from "@/utils/errorHandling";
import { respondWithSuccess } from "@/utils/api";

export const POST = withErrorHandler(async (request: NextRequest) => {
  const loginData = await getParsedFormData(request, loginSchema);

  await authenticateUser(loginData);

  return respondWithSuccess();
});

async function authenticateUser(loginData: LoginData) {
  await getResult(
    async () => {
      const { email, password } = loginData;

      const key = await auth.useKey("email", email.toLowerCase(), password);
      const session = await auth.createSession({
        userId: key.userId,
        attributes: {},
      });

      const authRequest = auth.handleRequest("POST", context);
      authRequest.setSession(session);
    },
    new ApiError(
      400,
      "Something went wrong with authenticating your account, check your email and password",
    ),
  );
}
