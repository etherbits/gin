"use client";

import { useChat } from "ai/react";

export default function TextBox() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  });
  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>
          <p>{message.content}</p>
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
