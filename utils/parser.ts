import { NextRequest } from "next/server";
import { ZodSchema } from "zod";

export async function getParsedFormData<T>(
  request: NextRequest,
  schema: ZodSchema<T>,
) {
  const formData = await request.formData();
  const objData: Record<string, FormDataEntryValue | boolean> =
    Object.fromEntries(formData.entries());

  Object.entries(objData).forEach(([key, value]) => {
    if (typeof value !== "string") return;

    const nValue = value.toLowerCase();
    if (nValue === "true" || nValue === "false") {
      objData[key] = Boolean(value);
    }
  });

  const parsedData = await schema.safeParseAsync(objData);

  if (!parsedData.success) {
    throw new Error(parsedData.error.message);
  }

  return parsedData.data;
}
