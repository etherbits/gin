import { ActionResult } from "./validation";
import { uuidv4 } from "uuidv7";

interface ResultCallbacks<T> {
  init?: (actionId: string) => void;
  success?: (
    actionId: string,
    result: Extract<ActionResult<T>, { status: "success" }>,
  ) => void;
  error?: (
    actionId: string,
    result: Extract<ActionResult<T>, { status: "error" }>,
  ) => void;
  other?: (actionId: string, result: ActionResult<T>) => void;
}

export async function eventAction<T>(
  action: () => Promise<ActionResult<T>>,
  callbacks: ResultCallbacks<T>,
) {
  const actionId = `action-${uuidv4()}`;
  callbacks.init?.(actionId);

  const result = await action();

  switch (result.status) {
    case "error":
      callbacks.error?.(actionId, result);
      break;
    case "success":
      callbacks.success?.(actionId, result);
    default:
      callbacks.other?.(actionId, result);
      break;
  }

  return result;
}
