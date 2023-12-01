import { env } from "@/app/env";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";

// create the connection
export const connection = connect({
  url: env.DATABASE_URL,
});

export const db = drizzle(connection);
