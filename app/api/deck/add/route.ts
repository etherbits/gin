import { db } from "@/db/drizzle";
import { deck } from "@/db/schema/deck";
import { getRouteSession } from "@/utils/auth";
import {
  getResult,
  respondWithError,
  respondWithValidationError,
} from "@/utils/errorHandling";
import { getParsedFormData } from "@/utils/parser";
import { deckSchema } from "@/validation-schemas/deck";
import { sql } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getRouteSession(request);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const [deckData, parseError] = await getParsedFormData(request, deckSchema);

  if (parseError) {
    return respondWithValidationError(parseError);
  }

  const [, error] = await getResult(async () => {
    await db.insert(deck).values({
      ...deckData,
      userId: session.user.userId,
      deckGroupId: deckData.deckGroupId
        ? sql`(UUID_TO_BIN(${deckData.deckGroupId}))`
        : null,
    });
  });

  if (error) {
    return respondWithError({
      message: "Error creating deck",
      error,
      status: 500,
    });
  }

  return new Response("ok", { status: 200 });
}
