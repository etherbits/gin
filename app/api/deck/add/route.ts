import { db } from "@/db/drizzle";
import { deck } from "@/db/schema/decks";
import { getParsedFormData } from "@/utils/parser";
import { deckSchema } from "@/validation-schemas/deck";
import { sql } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const parsedData = await getParsedFormData(request, deckSchema);

  await db.insert(deck).values({
    ...parsedData,
    deckGroupId: parsedData.deckGroupId
      ? sql`(UUID_TO_BIN(${parsedData.deckGroupId}))`
      : null,
  });

  return new Response('ok', { status: 200 })
}
