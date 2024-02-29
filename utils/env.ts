import { z } from "zod";
import * as dotenv from 'dotenv';
dotenv.config();

const envSchema = z.object({
  TURSO_DATABASE_URL: z.string(),
  TURSO_AUTH_TOKEN: z.string(),
  UPSTASH_REDIS_REST_URL: z.string(),
  UPSTASH_REDIS_REST_TOKEN: z.string(),
})

export const parsedEnv = envSchema.parse(process.env)
