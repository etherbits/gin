import { db } from "@/db/drizzle";
import { deckGroup } from "@/db/schema/deck";
import { eq, sql } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const id = params.get("id");

  await db.delete(deckGroup).where(eq(deckGroup.id, sql`(UUID_TO_BIN(${id}))`));

  return new Response("ok", { status: 200 });
}
