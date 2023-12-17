"use client";

import { useChat } from "ai/react";

export default function TextBox() {
	const { messages, input, handleInputChange, handleSubmit } = useChat({
		api: "/api/chat",
		initialMessages: [
			{
				id: "0",
				role: "system",
				content: `You are an assistant bot of a spaced repetition flashcard learning application.
          Try to help the users to write the flashcards and create descriptions.
          Do this in an engaging and fun encouraging way.
          Respond with just the answer`,
			},
		],
	});

	const clientMessages = messages.filter(
		(message) => message.role !== "system",
	);

	return (
		<div>
			{clientMessages.map((message) => (
				<div key={message.id}>
					<p className="bg-charcoal-900 px-2 py-1 mb-4">{message.content}</p>
				</div>
			))}
			<form onSubmit={handleSubmit} className="flex flex-col gap-8">
				<textarea
					value={input}
					onChange={handleInputChange}
					className="bg-charcoal-900 px-4 py-2"
				/>
				<button type="submit" className="bg-ship-cove-500 rounded-md px-4 py-2">
					Send
				</button>
			</form>
		</div>
	);
}
