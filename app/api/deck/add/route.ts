import { db } from "@/db/drizzle";
import { deck } from "@/db/schema/deck";
import { respondWithSuccess } from "@/utils/api";
import { getRouteSession } from "@/utils/auth";
import { ApiError, getResult, withErrorHandler } from "@/utils/errorHandling";
import { getParsedFormData } from "@/utils/parser";
import { Deck, deckSchema } from "@/validation-schemas/deck";
import { sql } from "drizzle-orm";
import { Session } from "lucia";
import { NextRequest } from "next/server";

export const POST = withErrorHandler(async (request: NextRequest) => {
	const session = await getRouteSession(request);
	const deckData = await getParsedFormData(request, deckSchema);

	await createDeck(deckData, session);

	return respondWithSuccess();
});

async function createDeck(deckData: Deck, session: Session) {
	return await getResult(async () => {
		await db.insert(deck).values({
			...deckData,
			userId: session.user.userId,
			deckGroupId: deckData.deckGroupId
				? sql`(UUID_TO_BIN(${deckData.deckGroupId}))`
				: null,
		});
	}, new ApiError(400, "Something went wrong with creating your deck"));
}
