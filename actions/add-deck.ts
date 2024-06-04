"use server";

import { db } from "@/db";
import { deck } from "@/db/schemas/deck";
import { validateRequest } from "@/utils/auth";
import {
  ActionResult,
  generateServerErrors,
  validateFormData,
} from "@/utils/validation";
import { deckSchema } from "@/validation-schemas/deck";
import { uuidv7 } from "uuidv7";

export async function addDeck(
  _prevState: ActionResult<unknown>,
  formData: FormData,
): Promise<ActionResult<unknown>> {
  const { user } = await validateRequest();

  if (!user)
    return {
      error: { formError: "Please sign in to create a deck" },
      status: "error",
    };

  const parseResult = await validateFormData(formData, deckSchema);

  if (!parseResult.success) {
    return { status: "error", error: generateServerErrors(parseResult.error) };
  }

  const ok = parseResult.data;

  try {
    db.insert(deck).values({
      id: uuidv7(),
      userId: user.id,
      title: ok.title,
      description: ok.description || null,
      isPublic: +(ok.target === "Shared"),
      deckGroupId: ok.groupId,
    });
  } catch (e) {
    return {
      status: "error",
      error: { formError: "Something went wrong when creating your deck" },
    };
  }

  return { status: "success" };
}
