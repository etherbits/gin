import { NextRequest } from "next/server";
import { ZodSchema } from "zod";
import { getResult } from "./errorHandling";

export async function getParsedFormData<T>(
  request: NextRequest,
  schema: ZodSchema<T>,
) {
  const formData = await request.formData();
  const objData = getFormDataObject(formData);

  return getResult(async () => {
    return await schema.parseAsync(objData);
  });
}

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
