import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().min(3).max(254).email(),
  password: z
    .string()
    .min(8)
    .max(128)
    .superRefine((data, ctx) => {
      const containsLowercase = (ch: string) => /[a-z]/.test(ch);
      const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
      const containsDigit = (ch: string) => /[0-9]/.test(ch);

      if (!containsLowercase(data)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must contain a lowercase letter",
        });
      }

      if (!containsUppercase(data)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must contain an uppercase letter",
        });
      }

      if (!containsDigit(data)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must contain a digit",
        });
      }
    }),
});

export const signUpSchema = signInSchema
  .extend({
    username: z.string().min(3).max(64),
    confirmPassword: z.string().min(8).max(128),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginData = z.infer<typeof signInSchema>;
export type RegistrationData = z.infer<typeof signUpSchema>;
