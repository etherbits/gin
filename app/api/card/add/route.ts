import { db } from "@/db/drizzle";
import { card } from "@/db/schema/deck";
import { getParsedFormData } from "@/utils/parser";
import { cardSchema } from "@/validation-schemas/deck";
import { sql } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const parsedData = await getParsedFormData(request, cardSchema);

  await db.insert(card).values({
    ...parsedData,
    deckId: sql`UUID_TO_BIN(${parsedData.deckId})`,
  });

  return new Response("ok", { status: 200 });
}
