import { db } from "@/db/drizzle";
import { deckGroup } from "@/db/schema/deck";
import { respondWithSuccess } from "@/utils/api";
import { ApiError, getResult, withErrorHandler } from "@/utils/errorHandling";
import { eq, sql } from "drizzle-orm";
import { NextRequest } from "next/server";

export const POST = withErrorHandler(async (request: NextRequest) => {
  const id = request.nextUrl.searchParams.get("id");

  await deleteDeckGroup(id);

  return respondWithSuccess();
});

async function deleteDeckGroup(id: string | null) {
  await getResult(
    async () => {
      await db
        .delete(deckGroup)
        .where(eq(deckGroup.id, sql`(UUID_TO_BIN(${id}))`));
    },
    new ApiError(
      400,
      "Something went wrong with deleting your deck group, check the id",
    ),
  );
}
