import { createServerEnv } from "@/utils/env";
import { z } from "zod";

export const env = createServerEnv({
  DATABASE_URL: z.string(),
  NODE_ENV: z.enum(["production", "development", "test"]),
  DEFAULT_PATH: z.string(),
  AUTH_GUARD_PATH: z.string(),
});
