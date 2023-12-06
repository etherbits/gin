import { db } from "@/db/drizzle";
import { card } from "@/db/schema/deck";
import { getRouteSession } from "@/utils/auth";
import { getResult, respondWithError } from "@/utils/errorHandling";
import { and, eq, sql } from "drizzle-orm";
import { getTableColumns } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getRouteSession(request);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const params = request.nextUrl.searchParams;
  const id = params.get("id");

  const [cards, error] = await getResult(async () => {
    return await db
      .select({
        ...getTableColumns(card),
        id: sql`BIN_TO_UUID(${card.id})`,
        deckId: sql`BIN_TO_UUID(${card.deckId})`,
      })
      .from(card)
      .where(
        and(
          eq(card.id, sql`(UUID_TO_BIN(${id}))`),
          eq(card.userId, session.user.userId),
        ),
      );
  });

  if (error) {
    return respondWithError({ error, status: 400 });
  }

  return new Response(JSON.stringify(cards), { status: 200 });
}
