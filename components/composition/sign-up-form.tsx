"use client";

import { Input, InputIcon } from "../primitive/input";
import { PasswordInput } from "../primitive/password-input";
import { SubmitButton } from "../primitive/submit-button";
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
import { useStateForm } from "@/utils/useStateForm";
import { passwordRequirements, signUpSchema } from "@/validation-schemas/auth";
import Link from "next/link";
import { useRef, useState } from "react";

export function SignUpForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const {
    form,
    form: { formState },
    formAction,
    errors: { fieldErrors, formError },
  } = useStateForm({
    schema: signUpSchema,
    action: signUp,
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
      <form
        ref={formRef}
        action={formAction}
        className="flex w-full flex-col gap-6"
      >
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
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>E-Mail</FormLabel>
              <FormControl>
                <Input
                  LeftComponent={<InputIcon icon="Mail" />}
                  type="email"
                  placeholder="shadcn"
                  {...field}
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
