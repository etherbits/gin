"use client";

import { Input } from "../primitive/input";
import { SubmitButton } from "../primitive/submit-button";
import { Textarea } from "../primitive/textarea";
import { Toast } from "../primitive/toaster";
import { addCard } from "@/actions/add-card";
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
import { addCardSchema } from "@/validation-schemas/deck";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export function AddCardForm(props: { deck: { id: string; slug: string } }) {
  const {
    form,
    form: { formState },
    formAction,
    errors: { fieldErrors, formError },
  } = useStateForm({
    schema: addCardSchema,
    action: async (...action) => {
      return eventAction(() => addCard(...action), {
        init: (actionId) => {
          toast.custom(
            (id) => (
              <Toast
                message="Adding card..."
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
                message="Couldn't add card"
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
                message="Card added!"
                variant="success"
                toastData={{ id: id }}
              />
            ),
            { id: actionId },
          );
          redirect(`/deck/${props.deck.slug}/card-list`);
        },
      });
    },
    formProps: {
      defaultValues: {
        front: "",
        back: "",
        deckId: props.deck.id,
      },
    },
  });

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
          name="front"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Card Front</FormLabel>
              <FormControl>
                <Textarea placeholder="Card front..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="back"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Card Back</FormLabel>
              <FormControl>
                <Textarea placeholder="Card front..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deckId"
          render={({ field }) => (
            <>
              <FormControl>
                <Input type="hidden" {...field} />
              </FormControl>
              <FormMessage />
            </>
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
          <SubmitButton isValid={formState.isValid}>Add Card</SubmitButton>
        </div>
      </form>
    </Form>
  );
}
