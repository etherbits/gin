"use server";

import { db } from "@/db";
import { deckGroup } from "@/db/schemas/deck";
import { validateRequest } from "@/utils/auth";
import { uuidv7 } from "uuidv7";

export async function addDeckGroup(title: string) {
  console.log("ok adding deck group");
  const { user } = await validateRequest();
  if (!user) {
    throw "No authenticated user";
  }

  const values = {
    id: uuidv7(),
    userId: user.id,
    title: title,
  };

  await db.insert(deckGroup).values(values);
  console.log("ok added deck group");

  return values;
}
