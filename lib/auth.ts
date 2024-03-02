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
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
      email: attributes.email,
      email_verified: attributes.email_verified,
    };
  }
})

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes
	}
}

export type DatabaseUserAttributes = {
  username: string;
  email: string;
  email_verified: boolean;
};

