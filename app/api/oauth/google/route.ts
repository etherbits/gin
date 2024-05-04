import { google } from "@/lib/auth";
import { parsedEnv } from "@/utils/env";
import { generateCodeVerifier, generateState } from "arctic";
import { serializeCookie } from "oslo/cookie";

export const dynamic = "force-dynamic";

export async function GET() {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = await google.createAuthorizationURL(state, codeVerifier, {
    scopes: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  });

  const headers = new Headers();
  headers.append("Location", url.toString());
  headers.append(
    "Set-Cookie",
    serializeCookie("google_oauth_state", state, {
      httpOnly: true,
      secure: parsedEnv.NODE_ENV === "production", // set `Secure` flag in HTTPS
      maxAge: 60 * 10, // 10 minutes
      path: "/",
    }),
  );
  headers.append(
    "Set-Cookie",
    serializeCookie("code_verifier", codeVerifier, {
      httpOnly: true,
      secure: parsedEnv.NODE_ENV === "production",
      maxAge: 60 * 10,
      path: "/",
    }),
  );

  return new Response(null, {
    status: 302,
    headers,
  });
}
