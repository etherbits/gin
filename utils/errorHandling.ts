export type Result<T> = [T, null] | [null, Error];

export type ErrorDescriptor = {
  error: Error;
  status: number;
  message?: string;
};

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

export function respondWithError({ error, status, message }: ErrorDescriptor) {
  return new Response(`${message} \n${JSON.stringify(error)}`, {
    status,
  });
}

export function respondWithValidationError(error: Error) {
  return new Response(JSON.stringify(error), {
    status: 400,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
