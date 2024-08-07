"use client";

import { Input, InputIcon } from "../primitive/input";
import { PasswordInput } from "../primitive/password-input";
import { SubmitButton } from "../primitive/submit-button";
import { Toast } from "../primitive/toaster";
import { signUp } from "@/actions/sign-up";
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
import { passwordRequirements, signUpSchema } from "@/validation-schemas/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function SignUpForm() {
  const {
    form,
    form: { formState },
    formAction,
    errors: { fieldErrors, formError },
  } = useStateForm({
    schema: signUpSchema,
    action: async (...action) => {
      return eventAction(() => signUp(...action), {
        init: (actionId) => {
          toast.custom(
            (id) => (
              <Toast
                message="Signing up..."
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
                message="Account creation failed"
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
                message="Account created successfully!"
                variant="success"
                toastData={{ id: id }}
              />
            ),
            { id: actionId },
          );
          redirect("/verify-email");
        },
      });
    },
    formProps: {
      defaultValues: {
        username: "",
        email: "",
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
          name="username"
          required
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  LeftComponent={<InputIcon icon="User" />}
                  placeholder="Ging"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          required
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>E-Mail</FormLabel>
              <FormControl>
                <Input
                  LeftComponent={<InputIcon icon="Mail" />}
                  type="email"
                  placeholder="test@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          required
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
                />
              </FormControl>
              <FieldRequirements requirements={passwordRequirements} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          required
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type={showPassword ? "text" : "password"}
                  LeftComponent={<InputIcon icon="Lock" />}
                  placeholder="••••••••"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <p
          className={cn("text-sm font-medium text-destructive", {
            hidden: !formError,
          })}
        >
          {formError}
        </p>

        <div className="mt-2 flex flex-col gap-3">
          <SubmitButton isValid={formState.isValid}>Sign Up</SubmitButton>
          <span className="ml-auto text-charcoal-200">
            Already have an account?{" "}
            <Link className="text-ship-cove-400" href="/sign-in">
              Sign in.
            </Link>
          </span>
        </div>
      </form>
    </Form>
  );
}
