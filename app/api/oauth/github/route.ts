import { github } from "@/lib/auth";
import { parsedEnv } from "@/utils/env";
import { generateState } from "arctic";
import { serializeCookie } from "oslo/cookie";

export const dynamic = "force-dynamic";

export async function GET() {
  const state = generateState();
  const url = await github.createAuthorizationURL(state, {
    scopes: ["user:email"],
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
      "Set-Cookie": serializeCookie("github_oauth_state", state, {
        httpOnly: true,
        secure: parsedEnv.NODE_ENV === "production", // set `Secure` flag in HTTPS
        maxAge: 60 * 10, // 10 minutes
        path: "/",
      }),
    },
  });
}
