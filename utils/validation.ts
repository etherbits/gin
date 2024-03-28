import { DefaultValues, FieldErrors } from "react-hook-form";
import { z } from "zod";

export async function validateFormData<T>(
  formData: object,
  schema: z.ZodSchema<T>,
) {
  return schema.safeParseAsync(formData);
}

export function generateDefaults<Schema extends z.Schema>(schema: Schema) {
  let shape: z.ZodRawShape = z.object({}).shape;

  if (schema instanceof z.ZodObject) {
    shape = schema.shape;
  } else if (schema instanceof z.ZodEffects) {
    shape = schema._def.schema.shape;
  }

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
  fieldErrors?: Record<string, { message: string }>;
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
