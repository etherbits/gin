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

export function SignUpForm() {
  const {
    form,
    handleAction,
    pending,
    errors: { fieldErrors, formError },
  } = useStateForm({ schema: registrationSchema, action: signUp });

  return (
    <Form
      {...form}
      formState={{
        ...form.formState,
        errors: fieldErrors,
      }}
    >
      <form onSubmit={handleAction} className="flex w-full flex-col gap-4">
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

        <Button className="mt-4 bg-green-800" type="submit" disabled={pending}>
          {pending ? "Loading..." : "Sign Up"}
        </Button>
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
