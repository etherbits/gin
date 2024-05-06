"use client";

import { Button } from "../primitive/button";
import { InputOTPPattern } from "../primitive/otp-input";
import { SubmitButton } from "../primitive/submit-button";
import { Toast } from "../primitive/toaster";
import { verifyEmail } from "@/actions/verify-email";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/primitive/form";
import { generateEmailVerificationCode } from "@/utils/code";
import { sendEmailVerificationCode } from "@/utils/mail";
import { cn } from "@/utils/tailwind";
import { eventAction } from "@/utils/toast";
import { useStateForm } from "@/utils/useStateForm";
import { otpCodeSchema } from "@/validation-schemas/auth";
import { User } from "lucia";
import Link from "next/link";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export function VerifyEmailForm({ user }: { user: User | null }) {
  const {
    form,
    form: { formState },
    formAction,
    errors: { fieldErrors, formError },
  } = useStateForm({
    schema: otpCodeSchema,
    action: async (...action) => {
      return eventAction(() => verifyEmail(...action), {
        init: (actionId) => {
          toast.custom(
            (id) => (
              <Toast
                message="Verifying..."
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
                message="Verification failed"
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
                message="Email verified!"
                variant="success"
                toastData={{ id: id }}
              />
            ),
            { id: actionId },
          );
          redirect("/home");
        },
      });
    },
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
          required
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormLabel>Confirmation Code</FormLabel>
              <FormControl>
                <InputOTPPattern autoFocus maxLength={8} withDigits {...field} />
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
          <div className="w-full flex gap-4">
            <SubmitButton className="w-full" isValid={formState.isValid}>
              Verify Email
            </SubmitButton>
            {user && (
              <Button
                type="button"
                variant={"secondary"}
                className="w-full"
                onClick={async () => {
                  const code = await generateEmailVerificationCode(
                    user.id,
                    user.email,
                  );
                  sendEmailVerificationCode(user.email, code);
                }}
              >
                Resend Code
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
