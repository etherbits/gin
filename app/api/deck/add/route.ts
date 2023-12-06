import { db } from "@/db/drizzle";
import { deck } from "@/db/schema/deck";
import { respondWithValidationError } from "@/utils/errorHandling";
import { getParsedFormData } from "@/utils/parser";
import { deckSchema } from "@/validation-schemas/deck";
import { sql } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const [deckData, parseError] = await getParsedFormData(request, deckSchema);

  if (parseError) {
    return respondWithValidationError(parseError);
  }

  await db.insert(deck).values({
    ...deckData,
    deckGroupId: deckData.deckGroupId
      ? sql`(UUID_TO_BIN(${deckData.deckGroupId}))`
      : null,
  });

  return new Response("ok", { status: 200 });
}
