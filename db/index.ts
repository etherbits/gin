import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { parsedEnv } from "@/utils/env";
import * as userSchemas from "@/db/schemas/user";
import * as deckSchemas from "@/db/schemas/deck";

const schema = {
  ...userSchemas,
  ...deckSchemas,
};

const turso = createClient({
  url: parsedEnv.TURSO_DATABASE_URL,
  authToken: parsedEnv.TURSO_AUTH_TOKEN,
});

export const db = drizzle(turso, { schema });
