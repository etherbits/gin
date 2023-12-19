import { NextRequest } from "next/server";
import { ZodSchema } from "zod";
import { ApiError, ValidationError, getResult } from "./errorHandling";

export async function getParsedJsonData<T>(
  request: NextRequest,
  schema: ZodSchema<T>,
) {
  const jsonData = await getResult(
    () => request.json(),
    new ApiError(422, "Please provide valid json data"),
  );

  const data = await schema.safeParseAsync(jsonData);

  if (!data.success) {
    throw new ValidationError(
      422,
      "The provided data is not valid",
      data.error,
    );
  }

  return data.data;
}
