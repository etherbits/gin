import { db } from "@/db/drizzle";
import { deckGroup } from "@/db/schema/deck";
import { getParsedFormData } from "@/utils/parser";
import { deckGroupSchema } from "@/validation-schemas/deck";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const parsedData = await getParsedFormData(request, deckGroupSchema);

  await db.insert(deckGroup).values(parsedData);

  return new Response("ok", { status: 200 });
}
