"use server";

import { db } from "@/db";
import { deckGroup } from "@/db/schemas/deck";
import { validateRequest } from "@/utils/auth";
import { uuidv7 } from "uuidv7";

export async function addDeckGroup(title: string) {
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

  return values;
}

export async function getDeckGroups() {
  console.log("ok gettin deck groups")
  const { user } = await validateRequest();
  if (!user) {
    throw "No authenticated user";
  }

  const deckGroups = await db.query.deckGroup.findMany({
    where: (group, { eq }) => eq(group.userId, user.id),
  });
  console.log(deckGroups)

  return deckGroups;
}
