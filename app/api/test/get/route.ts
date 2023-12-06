import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return request.method + request.nextUrl.pathname;
}
