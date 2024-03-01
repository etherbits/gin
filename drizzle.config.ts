import type { Config } from "drizzle-kit";
import { parsedEnv } from "@/utils/env";

export default {
  schema: "./db/schemas/*",
  out: "./db/migrations",
  driver: "turso",
  dbCredentials: {
    url: parsedEnv.TURSO_DATABASE_URL,
    authToken: parsedEnv.TURSO_AUTH_TOKEN,
  },
} satisfies Config;
