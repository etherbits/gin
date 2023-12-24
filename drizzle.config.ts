import { env } from "@/app/env"
import type { Config } from "drizzle-kit"

export default {
  schema: "./db/schema/*",
  out: "./drizzle/migrations",
  driver: "mysql2",
  dbCredentials: {
    uri: env.DATABASE_URL,
  },
} satisfies Config
