import * as deckSchemas from "@/db/schemas/deck";
import * as userSchemas from "@/db/schemas/user";
import { parsedEnv } from "@/utils/env";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

const schema = {
  ...userSchemas,
  ...deckSchemas,
};

const turso = createClient({
  url: parsedEnv.TURSO_DATABASE_URL,
  authToken: parsedEnv.TURSO_AUTH_TOKEN,
});

export const db = drizzle(turso, { schema });
