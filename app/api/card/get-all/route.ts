import { db } from "@/db/drizzle";
import { card } from "@/db/schema/deck";
import { getRouteSession } from "@/utils/auth";
import { eq, sql } from "drizzle-orm";
import { getTableColumns } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getRouteSession(request);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const cards = await db
    .select({
      ...getTableColumns(card),
      id: sql`BIN_TO_UUID(${card.id})`,
      deckId: sql`BIN_TO_UUID(${card.deckId})`,
    })
    .from(card)
    .where(eq(card.userId, session.user.userId));

  return new Response(JSON.stringify(cards), { status: 200 });
}
