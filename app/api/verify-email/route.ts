import { env } from "@/app/env";
import { auth } from "@/lib/lucia";
import { validateEmailVerificationToken } from "@/utils/auth";
import { ApiError, getResult, withErrorHandler } from "@/utils/errorHandling";
import { NextRequest } from "next/server";

export const POST = withErrorHandler(async (request: NextRequest) => {
	const token = request.nextUrl.searchParams.get("token");

	if (!token) {
		return new Response(null, { status: 400 });
	}

	const userId = await validateEmailVerificationToken(token);
	const sessionCookie = await createNewSession(userId);

	return new Response(null, {
		status: 302,
		headers: {
			Location: env.DEFAULT_PATH,
			"Set-Cookie": sessionCookie.serialize(),
		},
	});
});

async function createNewSession(userId: string) {
	return await getResult(async () => {
		const user = await auth.getUser(userId);
		await auth.invalidateAllUserSessions(user.userId);
		await auth.updateUserAttributes(user.userId, {
			email_verified: true,
		});

		const session = await auth.createSession({
			userId: user.userId,
			attributes: {},
		});

		return auth.createSessionCookie(session);
	}, new ApiError(500, "Something went wrong with create a new session"));
}
