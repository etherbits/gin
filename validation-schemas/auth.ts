import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().min(3).max(254).email(),
  password: z.string().min(8).max(128),
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
