import {
  generateFieldDefaults,
  ActionResult,
  generateFormErrors,
} from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState } from "react-dom";
import { UseFormProps, useForm } from "react-hook-form";
import { z } from "zod";

export function useStateForm<Schema extends z.Schema, ActionData>({
  schema,
  action,
  formProps,
}: {
  schema: Schema;
  action: (
    arg0: ActionResult<ActionData>,
    arg1: FormData,
  ) => Promise<ActionResult<ActionData>>;
  formProps?: UseFormProps<z.infer<Schema>>;
}) {
  const form = useForm<z.infer<Schema>>({
    mode: "onBlur",
    resolver: zodResolver(schema),
    defaultValues: generateFieldDefaults(schema),
    criteriaMode: "all",
    ...formProps,
  });

  const {
    formState: { errors },
  } = form;

  console.log(errors);

  const [state, formAction] = useFormState(action, { status: "idle" });

  return {
    form,
    formAction,
    errors: generateFormErrors(state, errors),
  };
}
