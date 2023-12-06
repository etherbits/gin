import { db } from "@/db/drizzle";
import { card } from "@/db/schema/deck";
import { respondWithZodError } from "@/utils/errorHandling";
import { getParsedFormData } from "@/utils/parser";
import { cardSchema } from "@/validation-schemas/deck";
import { sql } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const parsedData = await getParsedFormData(request, cardSchema);

  if (!parsedData.success) {
    return respondWithZodError(parsedData.error);
  }

  const cardData = parsedData.data;

  await db.insert(card).values({
    ...cardData,
    deckId: sql`UUID_TO_BIN(${cardData.deckId})`,
  });

  return new Response("ok", { status: 200 });
}
