"use client";

import { SubmitButton } from "../primitive/submit-button";
import { verifyEmail } from "@/actions/verify-email";
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
import { otpCodeSchema } from "@/validation-schemas/auth";
import Link from "next/link";
import {  InputOTPPattern } from "../primitive/otp-input";

export function VerifyEmailForm() {
  const {
    form,
    form: { formState },
    formAction,
    errors: { fieldErrors, formError },
  } = useStateForm({
    schema: otpCodeSchema,
    action: verifyEmail,
    formProps: {
      mode: "onSubmit",
      defaultValues: {
        code: "",
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
          name="code"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Confirmation Code</FormLabel>
              <FormControl>
                <InputOTPPattern maxLength={8} withDigits {...field}/> 
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <p
          className={cn("text-destructive text-sm font-medium", {
            hidden: !formError,
          })}
        >
          {formError}
        </p>

        <div className="flex flex-col mt-2 gap-3">
          <SubmitButton isValid={formState.isValid} />
          <span className="ml-auto text-charcoal-200">
            Don{"'"}t have an account?{" "}
            <Link className="text-ship-cove-400" href="/sign-up">
              Sign Up
            </Link>
          </span>
        </div>
      </form>
    </Form>
  );
}
