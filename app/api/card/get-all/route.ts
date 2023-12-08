import { db } from "@/db/drizzle";
import { card } from "@/db/schema/deck";
import { respondWithSuccess } from "@/utils/api";
import { getRouteSession } from "@/utils/auth";
import { ApiError, getResult } from "@/utils/errorHandling";
import { eq, sql } from "drizzle-orm";
import { getTableColumns } from "drizzle-orm";
import { Session } from "lucia";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getRouteSession(request);

  const cards = await getAllCards(session);

  return respondWithSuccess(cards);
}

async function getAllCards(session: Session) {
  return await getResult(
    async () => {
      return await db
        .select({
          ...getTableColumns(card),
          id: sql`BIN_TO_UUID(${card.id})`,
          deckId: sql`BIN_TO_UUID(${card.deckId})`,
        })
        .from(card)
        .where(eq(card.userId, session.user.userId));
    },
    new ApiError(500, "Something went wrong with getting your cards"),
  );
}
