import { env } from "@/app/env";
import { db } from "@/db/drizzle";
import { card } from "@/db/schema/deck";
import { getResult, respondWithError } from "@/utils/errorHandling";
import { eq, sql } from "drizzle-orm";
import { getTableColumns } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const id = params.get("id");

  const [cards, error] = await getResult(async () => {
    console.log("id", id);

    console.log(env.NEXT_PUBLIC_VERCEL_ENV);
    console.log(env.DATABASE_URL.slice(0, 10));

    return await db
      .select({
        ...getTableColumns(card),
        id: sql`BIN_TO_UUID(${card.id})`,
        deckId: sql`BIN_TO_UUID(${card.deckId})`,
      })
      .from(card)
      .where(eq(card.id, sql`(UUID_TO_BIN(${id}))`));
  });

  if (error) {
    return respondWithError({ error, status: 400 });
  }

  return new Response(JSON.stringify(cards), { status: 200 });
}
