import { parsedEnv } from "@/utils/env";
import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schemas/*",
  out: "./db/migrations",
  driver: "turso",
  dbCredentials: {
    url: parsedEnv.TURSO_DATABASE_URL,
    authToken: parsedEnv.TURSO_AUTH_TOKEN,
  },
} satisfies Config;
