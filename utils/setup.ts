import { ActionResult } from "./validation";
import { db } from "@/db";
import { deckGroup } from "@/db/schemas/deck";
import { uuidv7 } from "uuidv7";

export async function setupAdditionalUserData(
  userId: string,
): Promise<ActionResult<unknown>> {
  try {
    await db.insert(deckGroup).values({
      id: uuidv7(),
      userId: userId,
      title: "Default",
    });
  } catch (e) {
    return {
      status: "error",
      error: { formError: "Something went wrong with setting up your account" },
    };
  }

  return { status: "success" };
}
