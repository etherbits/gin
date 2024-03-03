import { resend } from "@/lib/mail";

/**
 * Send an email verification code to the user's email.
 * @param {string} email - The email of the user.
 * @param {string} code - The verification code.
 */
export async function sendEmailVerificationCode(email: string, code: string) {
  const { data, error } = await resend.emails.send({
    from: "Gin <noreply@nikaa.online>",
    to: [email],
    subject: "Email verification code",
    html: `<div>
            <h1>Email verification</h1>
            <p>Your email verification code is <strong>${code}</strong>.</p>
           </div>`,
  });

  if (error) {
    return error;
  }

  return data;
}
