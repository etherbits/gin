import { db } from "@/db";
import { oauth_accounts, users } from "@/db/schemas/user";
import { discord, lucia } from "@/lib/auth";
import { saveToast } from "@/utils/server-toast";
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { parseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const cookies = parseCookie(request.headers.get("Cookie") ?? "");
  const stateCookie = cookies.get("discord_oauth_state") ?? null;

  const url = new URL(request.url);
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");

  // verify state
  if (!state || !stateCookie || !code || stateCookie !== state) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await discord.validateAuthorizationCode(code);
    const discordUserResponse = await fetch(
      "https://discord.com/api/users/@me",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    );
    const discordUserResult: DiscordUserResult =
      await discordUserResponse.json();

    console.log(discordUserResult);

    if (!discordUserResult.email) {
      return new Response("No primary email address", {
        status: 400,
      });
    }

    if (!discordUserResult.verified) {
      return new Response("Unverified email", {
        status: 400,
      });
    }

    const existingAccount = await db.query.oauth_accounts.findFirst({
      where: (oauthAccount, { eq }) =>
        eq(oauthAccount.provider_user_id, discordUserResult.id),
    });

    if (existingAccount) {
      const session = await lucia.createSession(existingAccount.user_id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      saveToast({ message: "Signed in with Discord!", variant: "success" })

      return new Response(null, {
        status: 302,
        headers: {
          Location: "/home",
          "Set-Cookie": sessionCookie.serialize(),
        },
      });
    }

    const existingUser = await db.query.users.findFirst({
      where: (existingUser, { eq }) =>
        eq(existingUser.email, discordUserResult.email.toLowerCase()),
    });

    const userId = existingUser ? existingUser.id : generateId(15);

    await db.transaction(async (tx) => {
      if (!existingUser) {
        await tx.insert(users).values({
          id: userId,
          profile_image: generateDiscordAvatarUrl(discordUserResult.avatar),
          username: discordUserResult.username,
          email: discordUserResult.email.toLowerCase(),
          email_verified: 1,
        });
      }

      await tx.insert(oauth_accounts).values({
        provider_id: "discord",
        provider_user_id: discordUserResult.id,
        user_id: userId,
      });
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    saveToast({ message: "Signed in with Discord!", variant: "success" })

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/home",
        "Set-Cookie": sessionCookie.serialize(),
      },
    });
  } catch (e) {
    console.error(e);
    if (e instanceof OAuth2RequestError) {
      // bad verification code, invalid credentials, etc
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}

function generateDiscordAvatarUrl(avatarHash: string) {
  return `https://cdn.discordapp.com/avatars/165716490400694272/${avatarHash}.webp`;
}

interface DiscordUserResult {
  id: string;
  username: string;
  email: string;
  verified: boolean;
  avatar: string;
}
