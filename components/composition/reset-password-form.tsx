"use client";

import { Input, InputIcon } from "../primitive/input";
import { SubmitButton } from "../primitive/submit-button";
import { Toast } from "../primitive/toaster";
import { resetPassword } from "@/actions/reset-password";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/primitive/form";
import { cn } from "@/utils/tailwind";
import { eventAction } from "@/utils/toast";
import { useStateForm } from "@/utils/useStateForm";
import { resetPasswordSchema } from "@/validation-schemas/auth";
import { toast } from "sonner";

export function ResetPasswordForm() {
  const {
    form,
    form: { formState },
    formAction,
    errors: { fieldErrors, formError },
  } = useStateForm({
    schema: resetPasswordSchema,
    action: async (...action) => {
      return eventAction(() => resetPassword(...action), {
        init: (actionId) => {
          toast.custom(
            (id) => (
              <Toast
                message="Generating reset link..."
                variant="loading"
                toastData={{ id: id }}
              />
            ),
            { id: actionId },
          );
        },
        error: (actionId) => {
          toast.custom(
            (id) => (
              <Toast
                message="Reset link generation failed"
                variant="error"
                toastData={{
                  description: "Take a look at errors in the form",
                  id: id,
                }}
              />
            ),
            { id: actionId },
          );
        },
        success: (actionId) => {
          toast.custom(
            (id) => (
              <Toast
                message="Password reset link sent"
                variant="success"
                toastData={{ id: id }}
              />
            ),
            { id: actionId },
          );
        },
      });
    },
    formProps: {
      defaultValues: {
        email: "",
      },
    },
  });

  return (
    <Form
      {...form}
      formState={{
        ...formState,
        errors: fieldErrors,
      }}
    >
      <form action={formAction} className="flex flex-grow flex-col gap-6">
        <FormField
          control={form.control}
          name="email"
          required
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="johnsmith@example.com"
                  LeftComponent={<InputIcon icon="Mail" />}
                  autoFocus
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-2 flex flex-col gap-3">
          <p
            className={cn("text-sm font-medium text-destructive", {
              hidden: !formError,
            })}
          >
            {formError}
          </p>
          <SubmitButton isValid={formState.isValid}>
            Reset Password
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
}
