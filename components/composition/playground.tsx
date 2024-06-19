"use client";

import { SelectItem, Selector } from "../primitive/selector";
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
import { DeckGroup } from "@/db/schemas/deck";
import { useStateForm } from "@/utils/useStateForm";
import { addDeckSchema } from "@/validation-schemas/deck";

export function Playground() {
  const {
    form,
    form: { formState, setValue },
    formAction,
    errors: { fieldErrors },
  } = useStateForm({
    schema: addDeckSchema,
    action: addDeck,
    formProps: {
      defaultValues: {
        title: "",
        description: "",
        target: undefined,
        groupId: undefined,
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
          name="groupId"
          required
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Selector
                  placeholder="Select a deck group"
                  field={field}
                  getItems={async () => {
                    const res = await fetch("/api/deck-group/all");
                    const resData = await res.json();
                    if (res.status !== 200) {
                      throw new Error(resData.error);
                    }

                    return resData as DeckGroup[];
                  }}
                  addItem={(val) => addDeckGroup(val)}
                  render={(item, setDisplay) => (
                    <SelectItem
                      display={item.title}
                      value={item.id}
                      id={item.id}
                      setValue={(val) => {
                        setValue("groupId", val);
                        setDisplay(item.title);
                      }}
                    />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
