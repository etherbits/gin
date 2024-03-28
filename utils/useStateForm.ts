import {
  generateDefaults,
  ActionResult,
  generateFormErrors,
} from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useFormState } from "react-dom";
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
    arg1: z.infer<Schema>,
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

  const [isPending, startTransition] = useTransition();
  console.log(isPending);

  const handleAction = handleSubmit((data) => {
    startTransition(async () => {
      formAction(data);
    });
  });

  return {
    form,
    handleAction,
    isPending,
    errors: generateFormErrors(state, errors),
  };
}
