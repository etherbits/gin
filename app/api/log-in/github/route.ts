// app/login/github/route.ts
import { ghAuth } from "@/lib/lucia";
import * as context from "next/headers";

import { NextResponse, type NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
	const [url, state] = await ghAuth.getAuthorizationUrl();

	context.cookies().set("github_oauth_state", state, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		path: "/",
		maxAge: 60 * 60
	});

	return new NextResponse(null, {
		status: 302,
		headers: {
			Location: url.toString()
		}
	});
};
