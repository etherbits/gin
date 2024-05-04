"use client";

import { InputIcon } from "../primitive/icon";
import { Input } from "../primitive/input";
import { PasswordInput } from "../primitive/password-input";
import { SubmitButton } from "../primitive/submit-button";
import { Toast } from "../primitive/toaster";
import { signIn } from "@/actions/sign-in";
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
import { signInSchema } from "@/validation-schemas/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function SignInForm() {
  const {
    form,
    form: { formState },
    formAction,
    errors: { fieldErrors, formError },
  } = useStateForm({
    schema: signInSchema,
    action: async (...action) => {
      return eventAction(() => signIn(...action), {
        init: (actionId) => {
          toast.custom(
            (id) => (
              <Toast
                message="Signing in..."
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
                message="Could not sign in"
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
                message="Signed in!"
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
        username: "",
        password: "",
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
                  placeholder="shadcn"
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
          <Link className="ml-auto text-ship-cove-400" href="/reset-password">
            Forgot password?
          </Link>
          <SubmitButton isValid={formState.isValid}>Sign In</SubmitButton>
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
