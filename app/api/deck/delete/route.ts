import { db } from "@/db/drizzle"
import { deck } from "@/db/schema/deck"
import { respondWithSuccess } from "@/utils/api"
import { ApiError, getResult, withErrorHandler } from "@/utils/errorHandling"
import { eq, sql } from "drizzle-orm"
import { NextRequest } from "next/server"

export const POST = withErrorHandler(async (request: NextRequest) => {
  const id = request.nextUrl.searchParams.get("id")

  await deleteDeck(id)

  return respondWithSuccess()
})

async function deleteDeck(id: string | null) {
  return await getResult(
    async () => {
      await db.delete(deck).where(eq(deck.id, sql`(UUID_TO_BIN(${id}))`))
    },
    new ApiError(
      400,
      "Something went wrong with deleting your deck, check the id",
    ),
  )
}
