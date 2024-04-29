"use client";

import { InputIcon } from "../primitive/icon";
import { Input } from "../primitive/input";
import { PasswordInput } from "../primitive/password-input";
import { SubmitButton } from "../primitive/submit-button";
import { Toast } from "../primitive/toaster";
import { changePassword } from "@/actions/change-password";
import {
  FieldRequirements,
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
import {
  changePasswordSchema,
  passwordRequirements,
} from "@/validation-schemas/auth";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function ChangePasswordForm({
  verificationToken,
}: {
  verificationToken: string;
}) {
  const {
    form,
    form: { formState },
    formAction,
    errors: { fieldErrors, formError },
  } = useStateForm({
    schema: changePasswordSchema,
    action: async (...action) => {
      return eventAction(() => changePassword(...action), {
        init: (actionId) => {
          toast.custom(
            (id) => (
              <Toast
                message="Changing password..."
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
                message="Password change failed"
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
                message="Password changed successfully!"
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
      defaultValues: {
        verificationToken,
        password: "",
        confirmPassword: "",
      },
    },
  });

  const [showPassword, setShowPassword] = useState(false);

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
          name="verificationToken"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Input hidden {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  LeftComponent={<InputIcon icon="Lock" />}
                  placeholder="••••••••"
                  {...field}
                  required
                />
              </FormControl>
              <FieldRequirements requirements={passwordRequirements} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type={showPassword ? "text" : "password"}
                  LeftComponent={<InputIcon icon="Lock" />}
                  placeholder="••••••••"
                  {...field}
                  required
                />
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
          <SubmitButton isValid={formState.isValid}>
            Change Password
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
}
