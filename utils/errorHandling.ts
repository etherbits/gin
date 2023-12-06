import { ZodError } from "zod";

export type Result<T> =
  | {
      data: T;
      error: null;
    }
  | {
      data: null;
      error: Error;
    };

export async function getResult<T>(fn: () => Promise<T>): Promise<Result<T>> {
  try {
    const data = await fn();
    return { data, error: null };
  } catch (e) {
    if (e instanceof Error) {
      return { data: null, error: e };
    }

    return { data: null, error: new Error("Something went wrong") };
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
