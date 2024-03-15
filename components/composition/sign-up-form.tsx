"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/primitive/form";
import { useForm } from "react-hook-form";
import { Input } from "../primitive/input";
import { Button } from "../primitive/button";
import Link from "next/link";

interface Props {
  action: (arg0: FormData) => Promise<undefined>;
}

export function SignUpForm(props: Props) {
  const form = useForm();
  return (
    <Form {...form}>
      <form action={props.action} className="flex w-full flex-col gap-4">
        <FormField
          name="username"
          render={() => (
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        />
        <FormField
          name="email"
          render={() => (
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
          )}
        />
        <FormField
          name="password"
          render={() => (
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
          )}
        />
        <FormField
          name="confirm-password"
          render={() => (
            <FormField
              control={form.control}
              name="confirm-password"
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
