import { lucia } from "lucia";
import { planetscale } from "@lucia-auth/adapter-mysql";

import { connection } from "@/db/drizzle";
import { env } from "@/app/env";

const tableNames = {
  user: "user",
  key: "user_key",
  session: "user_session",
} as const;

export const auth = lucia({
  adapter: planetscale(connection, tableNames),
  getUserAttributes: (user) => ({ username: user.username, email: user.email }),
  getSessionAttributes: (session) => ({
    username: session.username,
    email: session.email,
  }),
  env: env.NODE_ENV === "production" ? "PROD" : "DEV",
});
