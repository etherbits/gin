import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(3).max(254).email(),
  password: z.string().min(8).max(128),
});

export const registrationSchema = loginSchema
  .extend({
    username: z.string().min(3).max(128),
    confirmPassword: z.string().min(8).max(128),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
