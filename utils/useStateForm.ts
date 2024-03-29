import {
  generateDefaults,
  ActionResult,
  generateFormErrors,
} from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function useStateForm<Schema extends z.Schema, ActionData>({
  schema,
  formRef,
  action,
  formProps,
}: {
  formRef: React.RefObject<HTMLFormElement>;
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

  const onSubmit = handleSubmit(() => {
    console.log("submitting form...");
    formRef.current?.requestSubmit();
  });

  return {
    form,
    formAction,
    onSubmit,
    errors: generateFormErrors(state, errors),
  };
}
