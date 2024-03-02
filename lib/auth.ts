import { db } from "@/db";
import { session, user } from "@/db/schemas/user";
import { parsedEnv } from "@/utils/env";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";

const adapter = new DrizzleSQLiteAdapter(db, session, user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: parsedEnv.NODE_ENV === "production",
    }
  }
})

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
	}
}
