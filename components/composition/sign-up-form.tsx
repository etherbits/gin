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
import { eventAction, generateToaster } from "@/utils/toast";
import { useStateForm } from "@/utils/useStateForm";
import { ActionResult } from "@/utils/validation";
import { passwordRequirements, signUpSchema } from "@/validation-schemas/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { v4 } from "uuid";

export function SignUpForm() {
  const formRef = useRef<HTMLFormElement>(null);

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
          toast.loading("Signing up...", { id: actionId });
        },
        error: (actionId) => {
          toast.error("Sign up failed", { id: actionId });
        },
        success: (actionId) => {
          toast.success("Sign up successful", { id: actionId });
          redirect("/verify-email");
        },
      });
    },
    formProps: {
      defaultValues: {
        username: "etherbits",
        email: "nika.qvrivishvilipc@gmail.com",
        password: "asd123ASD!",
        confirmPassword: "asd123ASD!",
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
