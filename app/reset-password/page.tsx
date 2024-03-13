import { db } from "@/db";
import { createPasswordResetToken } from "@/utils/auth";
import { parsedEnv } from "@/utils/env";
import { sendPasswordResetLink } from "@/utils/mail";
import { headers } from "next/headers";
import React from "react";

export default function page() {
  return (
    <div>
      <main>
        <form action={resetPassword}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
          <button>Reset</button>
        </form>
      </main>
    </div>
  );
}

async function resetPassword(formData: FormData) {
  "use server";
  const email = formData.get("email");

  if (typeof email !== "string") {
    return "Invalid email was provided";
  }

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });

  if (!user || !user.email_verified) {
    return "No verified user found with that email";
  }

  const resetToken = await createPasswordResetToken(user.id);
  const host = headers().get("host");
  const resetLink = `${host}/reset-password?token=${resetToken}`;
  console.log(resetLink);
  await sendPasswordResetLink(email, resetLink);

  return "Reset email sent";
}
