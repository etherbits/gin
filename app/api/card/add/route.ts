import { db } from "@/db/drizzle";
import { card } from "@/db/schema/deck";
import {
  getResult,
  respondWithError,
  respondWithValidationError,
} from "@/utils/errorHandling";
import { getParsedFormData } from "@/utils/parser";
import { cardSchema } from "@/validation-schemas/deck";
import { sql } from "drizzle-orm";
import { NextRequest } from "next/server";
import { getRouteSession } from "@/utils/auth";

export async function POST(request: NextRequest) {
  const session = await getRouteSession(request);

  if (!session) {
    return new Response("You must be logged in to create a card", {
      status: 401,
    });
  }

  const [cardData, parseError] = await getParsedFormData(request, cardSchema);

  if (parseError) {
    return respondWithValidationError(parseError);
  }

  const [, error] = await getResult(async () => {
    await db.insert(card).values({
      ...cardData,
      userId: session.user.userId,
      deckId: sql`UUID_TO_BIN(${cardData.deckId})`,
    });
  });

  if (error) {
    return respondWithError({
      message: "Failed to create card",
      error,
      status: 500,
    });
  }

  return new Response("ok", { status: 200 });
}
