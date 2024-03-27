import { ZodSchema } from "zod";

export async function validateFormData<T>(
  formData: FormData,
  schema: ZodSchema<T>,
) {
  const data: Record<string, FormDataEntryValue> = {};

  formData.forEach((value, key) => {
    if (typeof value !== "string" || key[0] === "$") return;
    data[key] = value;
  });

  return schema.safeParseAsync(data);
}

