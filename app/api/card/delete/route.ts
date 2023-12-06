import { db } from "@/db/drizzle";
import { card } from "@/db/schema/deck";
import { getResult, respondWithError } from "@/utils/errorHandling";
import { eq, sql } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const id = params.get("id");

  const [, error] = await getResult(async () => {
    await db.delete(card).where(eq(card.id, sql`(UUID_TO_BIN(${id}))`));
  });

  if (error) {
    return respondWithError({
      message: "Error deleting card",
      error,
      status: 500,
    });
  }

  return new Response("ok", { status: 200 });
}
