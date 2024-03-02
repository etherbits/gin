import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export type ChainableMiddlewareArgs = [
  request: NextRequest,
  event: NextFetchEvent,
  response: NextResponse,
];

export type ChainableMiddleware = (
  ...args: ChainableMiddlewareArgs
) => ChainableMiddlewareArgs | Promise<ChainableMiddlewareArgs>;

export function middlewareChain(middlewareList: ChainableMiddleware[]) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    let response: NextResponse = NextResponse.next();

    for (const middleware of middlewareList) {
      [request, event, response] = await middleware(request, event, response);
    }

    return response;
  };
}
