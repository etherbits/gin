import { db } from "@/db/drizzle";
import { deckGroup } from "@/db/schema/deck";
import { respondWithValidationError } from "@/utils/errorHandling";
import { getParsedFormData } from "@/utils/parser";
import { deckGroupSchema } from "@/validation-schemas/deck";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const [deckGroupData, parseError] = await getParsedFormData(
    request,
    deckGroupSchema,
  );

  if (parseError) {
    return respondWithValidationError(parseError);
  }

  await db.insert(deckGroup).values(deckGroupData);

  return new Response("ok", { status: 200 });
}
