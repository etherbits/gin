import { lucia } from "@/lib/auth";
import type { Config } from "@netlify/functions";


export default async function cleanUpExpiredSession() {
  await lucia.deleteExpiredSessions();
}

export const config: Config = {
  schedule: "@hourly",
};
