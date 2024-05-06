import { useFormField } from "./form";
import { cn } from "@/utils/tailwind";
import * as React from "react";

export type InputProps = {
  LeftComponent?: JSX.Element;
  RightComponent?: JSX.Element;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLDivElement, InputProps>(
  (
    {
      LeftComponent,
      RightComponent,
      className,
      type,
      ...props
    },
    ref,
  ) => {
    const { error, required } = useFormField();
    const isInvalid = !!error;

    const inputRef = React.useRef<HTMLInputElement>(null);

    return (
      <div
        className={cn(
          `border-input cursor-text bg-charcoal-900 ring-offset-background
          placeholder:text-charcoal-300 focus-visible:ring-ring flex w-full items-center
          border-charcoal-900 border-[1px]
          rounded-lg px-4 py-3 file:border-0 file:bg-transparent
          file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 gap-3
          `,
          { "border-destructive": isInvalid },
          className,
        )}
        ref={ref}
        onClick={() => inputRef.current?.focus()}
      >
        {LeftComponent && LeftComponent}
        <input
          type={type}
          ref={inputRef}
          required={required}
          {...props}
          className="peer bg-transparent w-full outline-none"
        />
        {RightComponent && RightComponent}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
