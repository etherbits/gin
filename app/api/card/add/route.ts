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

export async function POST(request: NextRequest) {
  const [cardData, parseError] = await getParsedFormData(request, cardSchema);

  if (parseError) {
    return respondWithValidationError(parseError);
  }

  const [, error] = await getResult(async () => {
    await db.insert(card).values({
      ...cardData,
      userId: sql`UUID_TO_BIN(${cardData.userId})`,
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
