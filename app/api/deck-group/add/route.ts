import { db } from "@/db/drizzle";
import { deckGroup } from "@/db/schema/deck";
import { respondWithSuccess } from "@/utils/api";
import { getRouteSession } from "@/utils/auth";
import { ApiError, getResult } from "@/utils/errorHandling";
import { getParsedFormData } from "@/utils/parser";
import { DeckGroup, deckGroupSchema } from "@/validation-schemas/deck";
import { Session } from "lucia";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getRouteSession(request);

  const deckGroupData = await getParsedFormData(request, deckGroupSchema);

  await createDeckGroup(deckGroupData, session);

  return respondWithSuccess()
}

async function createDeckGroup(deckGroupData: DeckGroup, session: Session) {
  await getResult(
    async () => {
      await db.insert(deckGroup).values({
        ...deckGroupData,
        userId: session.user.userId,
      });
    },
    new ApiError(500, "Something went wrong with creating your deck group"),
  );
}
