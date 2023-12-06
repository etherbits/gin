import { ZodError } from "zod";

export type Result<T> = [T, null] | [null, Error];

export async function getResult<T>(fn: () => Promise<T>): Promise<Result<T>> {
  try {
    const data = await fn();
    return [data, null];
  } catch (e) {
    if (e instanceof Error) {
      return [null, e];
    }

    return [null, new Error("Something went wrong")];
  }
}

export function respondWithGenericError(e: Error, status: number) {
  return new Response(e.message, {
    status,
  });
}

export function respondWithZodError(error: ZodError) {
  return new Response(JSON.stringify(error), {
    status: 400,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
