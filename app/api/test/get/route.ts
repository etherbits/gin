import { db } from "@/db/drizzle";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  return new Response(request.method + " " + request.nextUrl.pathname + " ");
}
