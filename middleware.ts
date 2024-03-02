import { middlewareChain } from "./utils/middleware";
import { rateLimitMiddleware } from "./utils/rate-limiter";

export default middlewareChain([rateLimitMiddleware]);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
