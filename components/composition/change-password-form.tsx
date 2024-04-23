"use client";

import { Input, InputIcon } from "../primitive/input";
import { PasswordInput } from "../primitive/password-input";
import { SubmitButton } from "../primitive/submit-button";
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
import { useStateForm } from "@/utils/useStateForm";
import {
  changePasswordSchema,
  passwordRequirements,
} from "@/validation-schemas/auth";
import { useState } from "react";

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
    action: changePassword,
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
