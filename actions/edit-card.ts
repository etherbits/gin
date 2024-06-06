"use server";

import { db } from "@/db";
import { card } from "@/db/schemas/deck";
import { validateRequest } from "@/utils/auth";
import {
  ActionResult,
  generateServerErrors,
  validateFormData,
} from "@/utils/validation";
import { editCardSchema } from "@/validation-schemas/deck";
import { eq } from "drizzle-orm";

export async function updateCard(
  _prevState: ActionResult<unknown>,
  formData: FormData,
): Promise<ActionResult<unknown>> {
  const { user } = await validateRequest();

  if (!user)
    return {
      error: { formError: "Please sign in to update a card" },
      status: "error",
    };

  const parseResult = await validateFormData(formData, editCardSchema);

  if (!parseResult.success) {
    console.log(parseResult.error);
    return { status: "error", error: generateServerErrors(parseResult.error) };
  }

  const ok = parseResult.data;

  try {
    await db
      .update(card)
      .set({
        deckId: ok.deckId,
        front: ok.front,
        back: ok.back,
      })
      .where(eq(card.id, ok.id));
  } catch (e) {
    console.error(e);
    return {
      status: "error",
      error: { formError: "Something went wrong when updating your card" },
    };
  }

  return { status: "success" };
}
