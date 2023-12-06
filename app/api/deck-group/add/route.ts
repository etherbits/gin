import { db } from "@/db/drizzle";
import { deckGroup } from "@/db/schema/deck";
import { getRouteSession } from "@/utils/auth";
import {
  getResult,
  respondWithError,
  respondWithValidationError,
} from "@/utils/errorHandling";
import { getParsedFormData } from "@/utils/parser";
import { deckGroupSchema } from "@/validation-schemas/deck";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getRouteSession(request);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const [deckGroupData, parseError] = await getParsedFormData(
    request,
    deckGroupSchema,
  );

  if (parseError) {
    return respondWithValidationError(parseError);
  }

  const [, error] = await getResult(async () => {
    await db.insert(deckGroup).values({
      ...deckGroupData,
      userId: session.user.userId,
    });
  });

  if (error) {
    return respondWithError({
      message: "Error creating deck group",
      error,
      status: 500,
    });
  }

  return new Response("ok", { status: 200 });
}
