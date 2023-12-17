import OpenAi from "openai";

import { OpenAIStream, StreamingTextResponse } from "ai";
import { env } from "@/app/env";

export const runtime = "edge";

const openai = new OpenAi({
	apiKey: env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
	const { messages } = await req.json();

	const response = await openai.chat.completions.create({
		model: "gpt-3.5-turbo",
		stream: true,
		messages,
	});

	const stream = OpenAIStream(response);

	return new StreamingTextResponse(stream);
}
