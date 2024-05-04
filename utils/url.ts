import { parsedEnv } from "./env";

export function getBaseURL() {
  if (parsedEnv.NODE_ENV === "production") {
    return "https://gin.nikaa.online";
  }

  return "http://localhost:3000";
}
