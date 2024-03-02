import { z } from "zod";
import * as dotenv from "dotenv";
dotenv.config();

const envSchema = z.object({
  // General
  NODE_ENV: z.enum(["production", "development", "test"]),

  // Turso DB
  TURSO_DATABASE_URL: z.string(),
  TURSO_AUTH_TOKEN: z.string(),

  // Upstash Redis DB
  UPSTASH_REDIS_REST_URL: z.string(),
  UPSTASH_REDIS_REST_TOKEN: z.string(),

  // Cloudflare object storage
  CLOUDFLARE_ACCOUNT_ID: z.string(),
  CLOUDFLARE_R2_ACCESS_KEY_ID: z.string(),
  CLOUDFLARE_R2_SECRET_ACCESS_KEY: z.string(),
  CLOUDFLARE_R2_BUCKET_NAME: z.string(),

  // Google OAuth
  GOOGLE_OAUTH_ID: z.string(),
  GOOGLE_OAUTH_SECRET: z.string(),

  // Github OAuth
  GITHUB_OAUTH_ID: z.string(),
  GITHUB_OAUTH_SECRET: z.string(),

  // Discord OAuth
  DISCORD_OAUTH_ID: z.string(),
  DISCORD_OAUTH_SECRET: z.string(),
});

export const parsedEnv = envSchema.parse(process.env);
