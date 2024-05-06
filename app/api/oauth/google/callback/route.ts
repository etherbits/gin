import { db } from "@/db";
import { oauth_accounts, users } from "@/db/schemas/user";
import { google, lucia } from "@/lib/auth";
import { saveToast } from "@/utils/server-toast";
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { NextRequest } from "next/server";
import { parseCookies } from "oslo/cookie";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const cookies = parseCookies(request.headers.get("Cookie") ?? "");
  const stateCookie = cookies.get("google_oauth_state") ?? null;
  const codeVerifier = cookies.get("code_verifier") ?? null;

  const url = new URL(request.url);
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");

  // verify state
  if (
    !state ||
    !stateCookie ||
    !code ||
    stateCookie !== state ||
    !codeVerifier
  ) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(code, codeVerifier);
    const googleUserResponse = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    );
    const googleUserResult: GoogleUserResult = await googleUserResponse.json();

    if (!googleUserResult.email) {
      return new Response("No primary email address", {
        status: 400,
      });
    }

    if (!googleUserResult.verified_email) {
      return new Response("Unverified email", {
        status: 400,
      });
    }

    const existingAccount = await db.query.oauth_accounts.findFirst({
      where: (oauthAccount, { eq }) =>
        eq(oauthAccount.provider_user_id, googleUserResult.id),
    });

    if (existingAccount) {
      const session = await lucia.createSession(existingAccount.user_id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      saveToast({ message: "Signed in with Google!", variant: "success" });

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
        eq(existingUser.email, googleUserResult.email.toLowerCase()),
    });

    const userId = existingUser ? existingUser.id : generateId(15);

    await db.transaction(async (tx) => {
      if (!existingUser) {
        await tx.insert(users).values({
          id: userId,
          profile_image: googleUserResult.picture,
          username: googleUserResult.name,
          email: googleUserResult.email.toLowerCase(),
          email_verified: 1,
        });
      }

      await tx.insert(oauth_accounts).values({
        provider_id: "google",
        provider_user_id: googleUserResult.id,
        user_id: userId,
      });
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    saveToast({ message: "Signed in with Google!", variant: "success" });

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

interface GoogleUserResult {
  id: string;
  name: string;
  email: string;
  verified_email: boolean;
  picture: string;
}
