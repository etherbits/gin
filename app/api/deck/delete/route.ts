import { db } from "@/db/drizzle";
import { deck } from "@/db/schema/decks";
import { eq, sql } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const id = params.get("id");

  await db.delete(deck).where(eq(deck.id, sql`(UUID_TO_BIN(${id}))`));

  return new Response("ok", { status: 200 });
}
