"use client";

import { Button } from "../primitive/button";
import { Input } from "../primitive/input";
import { signUp } from "@/actions/sign-up";
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
import { registrationSchema } from "@/validation-schemas/auth";
import Link from "next/link";
import { useRef } from "react";
import { useFormStatus } from "react-dom";

export function SignUpForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const {
    form,
    formAction,
    onSubmit,
    errors: { fieldErrors, formError },
  } = useStateForm({ formRef, schema: registrationSchema, action: signUp });

  return (
    <Form
      {...form}
      formState={{
        ...form.formState,
        errors: fieldErrors,
      }}
    >
      <form
        ref={formRef}
        action={formAction}
        onSubmit={onSubmit}
        className="flex w-full flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} autoFocus required />
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
                <Input type="email" placeholder="shadcn" {...field} required />
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
                <Input
                  type="password"
                  placeholder="••••••••"
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
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...field}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <p className={cn("text-destructive text-sm font-medium")}>
          {formError}
        </p>
        <SubmitButton />
        <span className="ml-auto">
          Already have an account?{" "}
          <Link className="text-blue-500" href="/sign-in">
            Sign in.
          </Link>
        </span>
      </form>
    </Form>
  );
}


function SubmitButton() {
  const status = useFormStatus();
  console.log(status);

  return (
    <button type="submit" aria-disabled={status.pending} className="bg-green-400">
      {status.pending ? "Loading..." : "Sign Up"}
    </button>
  );
}
