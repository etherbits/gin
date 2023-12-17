import {
	generateEmailVerificationToken,
	getPageSession,
	sendEmailVerification,
} from "@/utils/auth";

export default async function EmailVerification() {
	const { user } = (await getPageSession())!;

	async function resendVerificationEmail() {
		"use server";
		const token = await generateEmailVerificationToken(user.userId);
		sendEmailVerification(user.email, token);
	}

	return (
		<div>
			<h1>Please Verify Your Email</h1>
			<p>An email has been sent with a verification link</p>
			<form action={resendVerificationEmail}>
				<button>Resend Email</button>
			</form>
		</div>
	);
}
