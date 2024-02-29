import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { parsedEnv } from "./utils/env";

const turso = createClient({
  url: parsedEnv.TURSO_DATABASE_URL,
  authToken: parsedEnv.TURSO_AUTH_TOKEN,
});

export const db = drizzle(turso);
