import { lucia } from "lucia"
import { planetscale } from "@lucia-auth/adapter-mysql"

import { connection } from "@/db/drizzle"
import { env } from "@/app/env"
import { nextjs_future } from "lucia/middleware"
import { github } from '@lucia-auth/oauth/providers'

const tableNames = {
  user: "user",
  key: "user_key",
  session: "user_session",
} as const

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
  env: env.NEXT_PUBLIC_VERCEL_ENV === "development" ? "DEV" : "PROD",
})

export const ghAuth = github(auth, {
  clientId: env.GITHUB_CLIENT_ID,
  clientSecret: env.GITHUB_CLIENT_SECRET,
})

export type Auth = typeof auth
