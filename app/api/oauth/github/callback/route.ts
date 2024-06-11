import { db } from "@/db";
import { oauth_accounts, users } from "@/db/schemas/user";
import { github, lucia } from "@/lib/auth";
import { saveToast } from "@/utils/server-toast";
import { setupAdditionalUserData } from "@/utils/setup";
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { parseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const cookies = parseCookie(request.headers.get("Cookie") ?? "");
  const stateCookie = cookies.get("github_oauth_state") ?? null;

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
    const tokens = await github.validateAuthorizationCode(code);
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const githubUserResult: GitHubUserResult = await githubUserResponse.json();

    const emailsResponse = await fetch("https://api.github.com/user/emails", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });

    const emails: {
      primary: boolean;
      email: string;
      verified: boolean;
    }[] = await emailsResponse.json();

    const primaryEmail = emails.find((email) => email.primary) ?? null;

    if (!primaryEmail) {
      return new Response("No primary email address", {
        status: 400,
      });
    }

    if (!primaryEmail.verified) {
      return new Response("Unverified email", {
        status: 400,
      });
    }

    const existingAccount = await db.query.oauth_accounts.findFirst({
      where: (oauthAccount, { eq }) =>
        eq(oauthAccount.provider_user_id, String(githubUserResult.id)),
    });

    if (existingAccount) {
      const session = await lucia.createSession(existingAccount.user_id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      saveToast({ message: "Signed in with GitHub!", variant: "success" });

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
        eq(existingUser.email, primaryEmail.email.toLowerCase()),
    });

    const userId = existingUser ? existingUser.id : generateId(15);

    await db.transaction(async (tx) => {
      if (!existingUser) {
        await tx.insert(users).values({
          id: userId,
          profile_image: githubUserResult.avatar_url,
          username: githubUserResult.login,
          email: primaryEmail.email.toLowerCase(),
          email_verified: 1,
        });
      }

      await tx.insert(oauth_accounts).values({
        provider_id: "github",
        provider_user_id: String(githubUserResult.id),
        user_id: userId,
      });
    });

    const setupRes = await setupAdditionalUserData(userId);

    if (setupRes.status === "error") {
      return new Response(null, { status: 500 });
    }

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    saveToast({ message: "Signed in with GitHub!", variant: "success" });

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

interface GitHubUserResult {
  id: number;
  login: string; // username
  avatar_url: string;
}
