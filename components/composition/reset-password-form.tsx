"use client";

import { resetPassword } from "@/actions/reset-password";
import { Input } from "../primitive/input";
import { SubmitButton } from "../primitive/submit-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/primitive/form";
import { cn } from "@/utils/tailwind";
import { useStateForm } from "@/utils/useStateForm";
import { resetPasswordSchema } from "@/validation-schemas/auth";

export function ResetPasswordForm() {
  const {
    form,
    form: { formState },
    formAction,
    errors: { fieldErrors, formError },
  } = useStateForm({
    schema: resetPasswordSchema,
    action: resetPassword,
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
      <form action={formAction} className="flex w-full flex-col gap-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="johnsmith@example.com" {...field} required/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <div className="flex flex-col mt-2 gap-3">
        <p
          className={cn("text-destructive text-sm font-medium", {
            hidden: !formError,
          })}
        >
          {formError}
        </p>
          <SubmitButton isValid={formState.isValid} >Reset Password</SubmitButton>
        </div>
      </form>
    </Form>
  );
}
