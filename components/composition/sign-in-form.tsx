"use client";

import { Input, InputIcon } from "../primitive/input";
import { PasswordInput } from "../primitive/password-input";
import { SubmitButton } from "../primitive/submit-button";
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
import { useStateForm } from "@/utils/useStateForm";
import { signInSchema } from "@/validation-schemas/auth";
import Link from "next/link";
import { useState } from "react";

export function SignInForm() {
  const {
    form,
    form: { formState },
    formAction,
    errors: { fieldErrors, formError },
  } = useStateForm({
    schema: signInSchema,
    action: signIn,
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
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  LeftComponent={<InputIcon icon="User" />}
                  placeholder="shadcn"
                  {...field}
                  autoFocus
                  required
                />
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
            Don{"\'"}t have an account?{" "}
            <Link className="text-ship-cove-400" href="/sign-up">
              Sign Up
            </Link>
          </span>
        </div>
      </form>
    </Form>
  );
}
