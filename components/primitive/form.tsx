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

const Form = FormProvider;

interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
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
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
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
      <CircleX className="h-4 w-4 text-destructive" />
      <p
        ref={ref}
        id={formMessageId}
        className={cn("text-slate-200 text-sm font-medium", className)}
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
    requirements: { regex: RegExp; validMsg: string; requirement: string }[];
  }
>(({ className, requirements, ...props }, ref) => {
  const { value, fieldRequirementsId } = useFormField();

  if (typeof value !== "string") return null;

  const checkedReqs = requirements.map((req) => {
    if (value.match(req.regex)) return { valid: true, msg: req.validMsg };

    return { valid: false, msg: req.requirement };
  });

  return (
    <ul className="flex flex-col gap-2">
      {checkedReqs.map((req, i) => (
        <li
          key={`${fieldRequirementsId}-${i}`}
          className="flex gap-2 text-destructive items-center"
        >
          {req.valid ? (
            <CircleCheck className="h-4 w-4 stroke-green-400" />
          ) : (
            <CircleAlert className="h-4 w-4 stroke-slate-400" />
          )}
          <p
            ref={ref}
            className={cn("text-slate-200 text-sm font-medium", className)}
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
