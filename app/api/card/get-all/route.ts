import { db } from "@/db/drizzle";
import { card } from "@/db/schema/deck";
import { sql } from "drizzle-orm";
import { getTableColumns } from "drizzle-orm";

export async function GET() {
  const cards = await db
    .select({
      ...getTableColumns(card),
      id: sql`BIN_TO_UUID(${card.id})`,
      deckId: sql`BIN_TO_UUID(${card.deckId})`,
    })
    .from(card);

  return new Response(JSON.stringify(cards), { status: 200 });
}
