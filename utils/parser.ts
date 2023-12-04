import { NextRequest } from "next/server";
import { ZodSchema } from "zod";

export async function getParsedFormData<T>(
  request: NextRequest,
  schema: ZodSchema<T>,
) {
  const formData = await request.formData();
  const objData = Object.fromEntries(formData.entries());
  const parsedData = await schema.safeParseAsync(objData);

  if (!parsedData.success) {
    throw new Error(parsedData.error.message);
  }

  return parsedData.data;
}
