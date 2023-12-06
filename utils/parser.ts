import { NextRequest } from "next/server";
import { ZodError, ZodSchema } from "zod";

function getTypeParsedObject(object: Record<string, FormDataEntryValue>) {
  const parsedObject: Record<string, FormDataEntryValue | boolean> = object;

  Object.entries(parsedObject).forEach(([key, value]) => {
    if (typeof value !== "string") return;

    const nValue = value.toLowerCase();
    if (nValue === "true" || nValue === "false") {
      parsedObject[key] = Boolean(value);
    }
  });

  return parsedObject;
}

function getFormDataObject(formData: FormData) {
  const formObj = Object.fromEntries(formData.entries());
  const parsedFormObj = getTypeParsedObject(formObj);

  return parsedFormObj;
}

export function respondWithZodError(error: ZodError) {
  return new Response(JSON.stringify(error), {
    status: 400,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function getParsedFormData<T>(
  request: NextRequest,
  schema: ZodSchema<T>,
) {
  const formData = await request.formData();
  const objData = getFormDataObject(formData);

  const parsedData = await schema.safeParseAsync(objData);

  return parsedData;
}
