"use server";

import { db } from "@/db";
import { deckGroup } from "@/db/schemas/deck";
import { validateRequest } from "@/utils/auth";
import { uuidv7 } from "uuidv7";

export async function addGroup(title: string) {
  console.log("addGroup");
  const { user } = await validateRequest();
  if (!user) {
    return "Please sign in to create a deck";
  }

  await db.insert(deckGroup).values({
    id: uuidv7(),
    userId: user.id,
    title: title,
  });
}
