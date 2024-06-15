"use client";

import { Input, InputIcon } from "../primitive/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectNew,
  SelectTrigger,
  SelectValue,
} from "../primitive/select";
import { SubmitButton } from "../primitive/submit-button";
import { Textarea } from "../primitive/textarea";
import { Toast } from "../primitive/toaster";
import { addDeck } from "@/actions/add-deck";
import { addDeckGroup } from "@/actions/select-adders";
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
import { addDeckSchema, deckTargets } from "@/validation-schemas/deck";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export function AddDeckForm(props: {
  deckGroups: { id: string; title: string }[];
  userId: string;
}) {
  const {
    form,
    form: { formState, setValue },
    formAction,
    errors: { fieldErrors, formError },
  } = useStateForm({
    schema: addDeckSchema,
    action: async (...action) => {
      return eventAction(() => addDeck(...action), {
        init: (actionId) => {
          toast.custom(
            (id) => (
              <Toast
                message="Adding deck..."
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
                message="Couldn't add deck"
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
                message="Deck added!"
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
        title: "",
        description: "",
        target: undefined,
        groupId: undefined,
      },
    },
  });

  console.log(form.getValues().groupId);

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
          name="title"
          required
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  LeftComponent={<InputIcon icon="Album" />}
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
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A deck about Nen techniques..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <input name="groupId" type="hidden" value={form.getValues().groupId} />
        <FormField
          control={form.control}
          name="groupId"
          required
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Group</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger LeftSlot={<InputIcon icon="Boxes" />}>
                    <SelectValue placeholder="Select a group" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {props.deckGroups.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      {group.title}
                    </SelectItem>
                  ))}
                  <SelectNew
                    addValue={async (val) => {
                      const { id } = await addDeckGroup(val);
                      setValue("groupId", id);
                    }}
                  >
                    New Group
                  </SelectNew>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <input name="target" type="hidden" value={form.getValues().target} />
        <FormField
          control={form.control}
          name="target"
          required
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Target</FormLabel>

              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger LeftSlot={<InputIcon icon="Target" />}>
                    <SelectValue placeholder="Select the target of this deck" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {deckTargets.map((target) => (
                    <SelectItem key={target} value={target}>
                      {target}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

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
          <SubmitButton isValid={formState.isValid}>Create Deck</SubmitButton>
        </div>
      </form>
    </Form>
  );
}
