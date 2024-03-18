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
import {
  RegistrationData,
  registrationSchema,
} from "@/validation-schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";

export function SignUpForm() {
  const form = useForm<RegistrationData>({
    mode: "all",
    resolver: zodResolver(registrationSchema),
  });
  const {
    formState: { errors },
  } = form;

  const [state, formAction] = useFormState(signUp, null);

  console.log(state, errors);

  return (
    <Form {...form}>
      <form action={formAction} className="flex w-full flex-col gap-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage>{state?.fieldErrors.username || null}</FormMessage>
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
                <Input type="email" placeholder="shadcn" {...field} />
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
                <Input type="password" placeholder="••••••••" {...field} />
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
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-4 bg-green-800" type="submit">
          Sign Up
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
