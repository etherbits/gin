import { ChainableMiddlewareArgs } from "./middleware";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest, NextFetchEvent, NextResponse } from "next/server";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(20, "30s"),
  ephemeralCache: new Map(),
  analytics: true,
});

export async function rateLimitMiddleware(
  request: NextRequest,
  event: NextFetchEvent,
): Promise<ChainableMiddlewareArgs> {
  if (request.method === "GET") {
    return [request, event, NextResponse.next()];
  }

  const ip = request.ip ?? "127.0.0.1";
  console.log(ip);

  const { success, pending, limit, reset, remaining } = await ratelimit.limit(
    `ratelimit_middleware_${ip}`,
  );
  event.waitUntil(pending);

  const response = success
    ? NextResponse.next()
    : NextResponse.redirect(new URL("/error/rate-limited", request.url));

  response.headers.set("X-RateLimit-Limit", limit.toString());
  response.headers.set("X-RateLimit-Remaining", remaining.toString());
  response.headers.set("X-RateLimit-Reset", reset.toString());

  return [request, event, response];
}
