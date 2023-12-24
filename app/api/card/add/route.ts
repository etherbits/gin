import { db } from "@/db/drizzle"
import { card } from "@/db/schema/deck"
import { getRouteSession } from "@/utils/auth"
import { ApiError, getResult, withErrorHandler } from "@/utils/errorHandling"
import { getParsedJsonData } from "@/utils/parser"
import { Card, cardSchema } from "@/validation-schemas/deck"
import { sql } from "drizzle-orm"
import { Session } from "lucia"
import { NextRequest } from "next/server"

export const POST = withErrorHandler(async (request: NextRequest) => {
  const session = await getRouteSession(request)
  const cardData = await getParsedJsonData(request, cardSchema)

  await createCard(cardData, session)

  return new Response("ok", { status: 200 })
})

async function createCard(cardData: Card, session: Session) {
  await getResult(
    async () => {
      await db.insert(card).values({
        ...cardData,
        userId: session.user.userId,
        deckId: sql`UUID_TO_BIN(${cardData.deckId})`,
      })
    },
    new ApiError(500, "Something went wrong with creating your card"),
  )
}
