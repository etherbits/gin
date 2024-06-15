"use server";

import { db } from "@/db";
import { card } from "@/db/schemas/deck";
import { validateRequest } from "@/utils/auth";
import {
  ActionResult,
  generateServerErrors,
  validateFormData,
} from "@/utils/validation";
import { addCardSchema } from "@/validation-schemas/deck";
import { uuidv7 } from "uuidv7";

export async function addCard(
  _prevState: ActionResult<unknown>,
  formData: FormData,
): Promise<ActionResult<unknown>> {
  const { user } = await validateRequest();

  if (!user)
    return {
      error: { formError: "Please sign in to create a card" },
      status: "error",
    };

  const parseResult = await validateFormData(formData, addCardSchema);

  if (!parseResult.success) {
    console.log(parseResult.error);
    return { status: "error", error: generateServerErrors(parseResult.error) };
  }

  const ok = parseResult.data;

  try {
    await db.insert(card).values({
      id: uuidv7(),
      deckId: ok.deckId,
      userId: user.id,
      front: ok.front,
      back: ok.back,
    });
  } catch (e) {
    console.error(e);
    return {
      status: "error",
      error: { formError: "Something went wrong when creating your card" },
    };
  }

  return { status: "success" };
}
