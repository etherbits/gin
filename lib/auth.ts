import { db } from "@/db";
import { sessions, users } from "@/db/schemas/user";
import { parsedEnv } from "@/utils/env";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { Discord, GitHub } from "arctic";
import { Lucia } from "lucia";

const adapter = new DrizzleSQLiteAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: parsedEnv.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
      email: attributes.email,
      email_verified: attributes.email_verified,
      profile_image: attributes.profile_image,
    };
  },
});

export const github = new GitHub(
  parsedEnv.GITHUB_OAUTH_ID,
  parsedEnv.GITHUB_OAUTH_SECRET,
);
export const discord = new Discord(
  parsedEnv.DISCORD_OAUTH_ID,
  parsedEnv.DISCORD_OAUTH_SECRET,
  "http://localhost:3000/api/oauth/discord/callback",
);

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

export interface DatabaseUserAttributes {
  username: string;
  email: string;
  email_verified: boolean;
  profile_image?: string;
}
