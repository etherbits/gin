import { lucia } from "lucia";
import { planetscale } from "@lucia-auth/adapter-mysql";

import { connection } from "@/db/drizzle";
import { env } from "@/app/env";
import { nextjs_future } from "lucia/middleware";

const tableNames = {
  user: "user",
  key: "user_key",
  session: "user_session",
} as const;

export const auth = lucia({
  adapter: planetscale(connection, tableNames),
  middleware: nextjs_future(),
  sessionCookie: {
    expires: false,
  },
  getUserAttributes: (user) => ({
    username: user.username,
    email: user.email,
    emailVerified: user.email_verified,
  }),
  env: env.NODE_ENV === "production" ? "PROD" : "DEV",
});

export type Auth = typeof auth;
