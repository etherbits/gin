import { db } from "@/db/drizzle";
import { respondWithSuccess } from "@/utils/api";
import {
  generatePasswordResetToken,
  sendPasswordResetLink,
} from "@/utils/auth";
import { ApiError, getResult, withErrorHandler } from "@/utils/errorHandling";
import { getParsedFormData } from "@/utils/parser";
import { passwordResetSchema } from "@/validation-schemas/auth";
import { NextRequest } from "next/server";

export const POST = withErrorHandler(async (request: NextRequest) => {
  const { email } = await getParsedFormData(request, passwordResetSchema);

  const user = await getResult(
    async () => {
      const user = await db.query.user.findFirst({
        where: (user, { eq }) => eq(user.email, email),
      });

      if (!user) throw null;

      return user;
    },
    new ApiError(400, "User with that email does not exist"),
  );

  const token = await generatePasswordResetToken(user.id);
  await sendPasswordResetLink(email, token);

  return respondWithSuccess();
});
