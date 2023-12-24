import { createServerEnv } from "@/utils/env"
import { z } from "zod"

export const base_urls = ['http://localhost:3000', 'https://gin.nikaa.online'] as const

export const env = createServerEnv({
  DATABASE_URL: z.string(),
  RESEND_API_KEY: z.string(),
  OPENAI_API_KEY: z.string(),
  NEXT_PUBLIC_VERCEL_ENV: z.enum(["production", "development", "test"]),
  DEFAULT_PATH: z.string(),
  AUTH_GUARD_PATH: z.string(),
  BASE_URL: z.enum(base_urls),
  CI: z.string().optional(),
})
