import { createEnv } from "@/utils/env";
import { z } from "zod";
console.log("call");

export const env = createEnv({
  DATABASE_URL: z.string(),
});
