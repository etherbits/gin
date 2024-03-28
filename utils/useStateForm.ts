import {
  generateDefaults,
  ActionResult,
  generateFormErrors,
} from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
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
  formProps?: Omit<Parameters<typeof useForm>[0], "defaultValues">;
}) {
  const form = useForm<z.infer<Schema>>({
    mode: "onBlur",
    resolver: zodResolver(schema),
    defaultValues: generateDefaults(schema),
    ...formProps,
  });

  const {
    formState: { errors },
    handleSubmit,
  } = form;

  const [state, formAction] = useFormState(action, { status: "idle" });

  const handleAction = handleSubmit((data) => {
    formAction(data);
  });

  const { pending } = useFormStatus()

  return {
    form,
    handleAction,
    pending,
    errors: generateFormErrors(state, errors),
  };
}
