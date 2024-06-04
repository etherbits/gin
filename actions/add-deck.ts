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

  db.insert(deck).values({
    userId: user.id,
    title: ok.title,
    description: ok.description ?? "",
    isPublic: +(ok.target === "Public"),
    deckGroupId: ok.groupId ?? null
  });

  return { status: "success" };
}
