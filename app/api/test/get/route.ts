import { db } from "@/db/drizzle";
import { user } from "@/db/schema/user";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  await db.select().from(user);

  return new Response(request.method + " " + request.nextUrl.pathname + " ");
}
