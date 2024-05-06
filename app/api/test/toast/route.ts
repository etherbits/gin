import { saveToast } from "@/utils/server-toast";

export function GET() {
	saveToast({ message: "Toast Test", variant: "info" })

  return new Response("Test toast", {
    status: 302,
    headers: { Location: "/home" },
  });
}
