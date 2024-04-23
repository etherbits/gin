import { DefaultValues, FieldErrors } from "react-hook-form";
import { z } from "zod";

export async function validateFormData<T>(
  formData: FormData,
  schema: z.ZodSchema<T>,
) {
  const data: Record<string, FormDataEntryValue> = {};

  formData.forEach((value, key) => {
    if (typeof value !== "string" || key[0] === "$") return;
    data[key] = value;
  });

  return schema.safeParseAsync(data);
}

function getSchemaShape<Schema extends z.Schema>(schema: Schema) {
  if (schema instanceof z.ZodObject) {
    return schema.shape;
  } else if (schema instanceof z.ZodEffects) {
    return schema._def.schema.shape;
  }

  return {};
}

export function generateFieldDefaults<Schema extends z.Schema>(schema: Schema) {
  const shape = getSchemaShape(schema);

  const defaults = Object.fromEntries(
    Object.entries(shape).map(([key, value]) => {
      if (value instanceof z.ZodString) {
        return [key, ""];
      }

      return [key, undefined];
    }),
  ) as DefaultValues<Schema>;

  return defaults;
}

export function generateFormErrors<T>(
  state: ActionResult<T>,
  clientErrors: FieldErrors,
) {
  const serverErrors = state.status === "error" ? state.error : null;

  if (!serverErrors) {
    return {
      fieldErrors: clientErrors,
    };
  }

  return {
    fieldErrors: {
      ...serverErrors.fieldErrors,
      ...clientErrors,
    },
    formError: serverErrors.formError,
  };
}

export function generateServerErrors<T>(error: z.ZodError<T>) {
  const formErrors = error.formErrors;
  const fieldErrors: Partial<Record<keyof T, { message: string }>> = {};

  Object.entries(formErrors.fieldErrors).forEach(([field, errors]) => {
    if (!Array.isArray(errors)) return;

    fieldErrors[field as keyof T] = {
      message: errors.join(", "),
    };
  });

  return { fieldErrors, formError: formErrors.formErrors.join(", ") };
}

interface FormErrors {
  fieldErrors?: Partial<Record<string, { message: string }>>;
  formError?: string;
}

export type ActionResult<T> =
  | {
      status: "idle";
    }
  | {
      status: "success";
      data: T;
    }
  | {
      status: "error";
      error: FormErrors;
    };
