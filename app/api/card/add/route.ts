import { db } from "@/db/drizzle";
import { card } from "@/db/schema/deck";
import { respondWithValidationError } from "@/utils/errorHandling";
import { getParsedFormData } from "@/utils/parser";
import { cardSchema } from "@/validation-schemas/deck";
import { sql } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const [cardData, parseError] = await getParsedFormData(request, cardSchema);

  if (parseError) {
    return respondWithValidationError(parseError);
  }

  await db.insert(card).values({
    ...cardData,
    deckId: sql`UUID_TO_BIN(${cardData.deckId})`,
  });

  return new Response("ok", { status: 200 });
}
