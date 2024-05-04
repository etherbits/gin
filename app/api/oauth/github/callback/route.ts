import { db } from "@/db";
import { oauth_account, users } from "@/db/schemas/user";
import { github, lucia } from "@/lib/auth";
import { generateId } from "lucia";
import { OAuth2RequestError } from "arctic";
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

    const existingUser = await db.query.oauth_account.findFirst({
      where: (oauth_account, { eq }) => eq(oauth_account.provider_id, githubUserResult.id),
    });

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
          "Set-Cookie": sessionCookie.serialize(),
        },
      });
    }

    console.log(githubUserResult)

    const userId = generateId(15);
    await db.insert(users).values({
      id: userId,
      username: githubUserResult.login,
      email: githubUserResult.email,
      github_id: githubUserResult.id,
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/home",
        "Set-Cookie": sessionCookie.serialize(),
      },
    });
  } catch (e) {
    console.log(e);
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
  email: string;
}
