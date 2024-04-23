"use server";

import { db } from "@/db";
import { createPasswordResetToken } from "@/utils/auth";
import { sendPasswordResetLink } from "@/utils/mail";
import {
  ActionResult,
  generateServerErrors,
  validateFormData,
} from "@/utils/validation";
import { resetPasswordSchema } from "@/validation-schemas/auth";
import { headers } from "next/headers";

export async function resetPassword(
  _prevState: ActionResult<string>,
  formData: FormData,
): Promise<ActionResult<string>> {
  const parsedData = await validateFormData(formData, resetPasswordSchema);

  if (!parsedData.success) {
    return { status: "error", error: generateServerErrors(parsedData.error) };
  }

  const { email } = parsedData.data;

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });

  if (!user || !user.email_verified) {
    return {
      status: "error",
      error: { formError: "No verified user found with that email" },
    };
  }

  const resetToken = await createPasswordResetToken(user.id);
  const host = headers().get("host");
  const resetLink = `${host}/reset-password/${resetToken}`;
  console.log(resetLink);
  await sendPasswordResetLink(email, resetLink);

  return { status: "success", data: "Reset email sent" };
}
