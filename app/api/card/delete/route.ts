import { db } from "@/db/drizzle";
import { card } from "@/db/schema/deck";
import { ApiError, getResult } from "@/utils/errorHandling";
import { eq, sql } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const id = params.get("id");

  deleteCard(id);

  return new Response("ok", { status: 200 });
}

async function deleteCard(id: string | null) {
  await getResult(
    async () => {
      await db.delete(card).where(eq(card.id, sql`(UUID_TO_BIN(${id}))`));
    },
    new ApiError(
      400,
      "Something went wrong with deleting your card, check the id",
    ),
  );
}
