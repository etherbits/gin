import { db } from "@/db/drizzle";
import { card } from "@/db/schema/deck";
import { respondWithSuccess } from "@/utils/api";
import { getRouteSession } from "@/utils/auth";
import {
  ApiError,
  getResult,
  respondWithError,
  withErrorHandler,
} from "@/utils/errorHandling";
import { and, eq, getTableColumns, sql } from "drizzle-orm";
import { NextRequest } from "next/server";

export const GET = withErrorHandler(async (request: NextRequest) => {
  const session = await getRouteSession(request);
  const id = request.nextUrl.searchParams.get("id");

  const cards = await getCard(id, session);

  return respondWithSuccess(cards[0]);
});

async function getCard(id: string | null, session: any) {
  return await getResult(
    async () => {
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
    },
    new ApiError(
      400,
      "Something went wrong with getting your card, check the id",
    ),
  );
}
