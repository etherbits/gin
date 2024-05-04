import { db } from "@/db";
import { sessions, users } from "@/db/schemas/user";
import { parsedEnv } from "@/utils/env";
import { getBaseURL } from "@/utils/url";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { Discord, GitHub, Google } from "arctic";
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
  `${getBaseURL()}/api/oauth/discord/callback`,
);

export const google = new Google(
  parsedEnv.GOOGLE_OAUTH_ID,
  parsedEnv.GOOGLE_OAUTH_SECRET,
  `${getBaseURL()}/api/oauth/google/callback`,
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
