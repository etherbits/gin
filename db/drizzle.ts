import { env } from "@/app/env";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import * as userSchemas from "./schema/users";
import * as deckSchemas from "./schema/decks";

const schema = {
  ...userSchemas,
  ...deckSchemas,
}

// create the connection
export const connection = connect({
  url: env.DATABASE_URL,
});

export const db = drizzle(connection, {
  schema,
});
