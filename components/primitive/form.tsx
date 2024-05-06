import { Label } from "@/components/primitive/label";
import { cn } from "@/utils/tailwind";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { CircleAlert, CircleCheck, CircleX } from "lucide-react";
import * as React from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { z } from "zod";

const Form = FormProvider;

interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  required?: boolean;
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName> & { required?: boolean }) => {
  return (
    <FormFieldContext.Provider
      value={{ name: props.name, required: props.required }}
    >
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, getValues, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;
  const value = getValues(fieldContext.name);

  return {
    id,
    name: fieldContext.name,
    required: fieldContext.required,
    value,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    fieldRequirementsId: `${id}-field-requirements`,
    ...fieldState,
  };
};

interface FormItemContextValue {
  id: string;
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-4 w-full", className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, children, ...props }, ref) => {
  const { error, required, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    >
      <>
        {children}
        {required && <span className="text-red-400 text-sm ml-[2px]">*</span>}
      </>
    </Label>
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <div className="flex gap-2 text-destructive items-center">
      <CircleX className="h-4 w-4 min-w-4 text-destructive" />
      <p
        ref={ref}
        id={formMessageId}
        className={cn("text-charcoal-100 text-sm font-medium", className)}
        {...props}
      >
        {body}
      </p>
    </div>
  );
});
FormMessage.displayName = "FormMessage";

const FieldRequirements = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    requirements: z.ZodEffects<z.ZodType>;
  }
>(({ className, requirements, ...props }, ref) => {
  const { error, value, fieldRequirementsId } = useFormField();

  if (typeof value !== "string") return null;

  const defaultParse = requirements.safeParse("");
  const parsedValue = requirements.safeParse(value);

  let checkedReqs: { valid: boolean; msg: string }[] = [];

  if (defaultParse.success) return null;

  checkedReqs = defaultParse.error.issues.map((issue) => {
    return { valid: true, msg: issue.message };
  });

  if (!parsedValue.success) {
    checkedReqs = checkedReqs.map((req) => {
      if (parsedValue.error.issues.some((issue) => issue.message === req.msg)) {
        return { valid: false, msg: req.msg };
      }
      return req;
    });
  }

  return (
    <ul className="flex flex-col gap-3 py-2 px-3">
      {checkedReqs.map((req, i) => (
        <li
          key={`${fieldRequirementsId}-${i}`}
          className="flex gap-2 text-destructive items-center rounded-md"
        >
          {req.valid ? (
            <CircleCheck className="h-4 w-4 min-w-4 stroke-green-400" />
          ) : (
            <CircleAlert
              className={cn(`h-4 w-4 min-w-4 stroke-slate-400`, {
                "stroke-destructive": error,
              })}
            />
          )}
          <p
            ref={ref}
            className={cn("text-charcoal-200 w-full text-sm font-medium", className)}
            {...props}
          >
            {req.msg}
          </p>
        </li>
      ))}
    </ul>
  );
});

FieldRequirements.displayName = "FieldRequirements";

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FieldRequirements,
  FormMessage,
  FormField,
};
