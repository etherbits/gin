import { useFormField } from "./form";
import { Icon, IconProps } from "./icon";
import { cn } from "@/utils/tailwind";
import * as React from "react";

export type InputProps = {
  LeftComponent?: JSX.Element;
  RightComponent?: JSX.Element;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLDivElement, InputProps>(
  ({ LeftComponent, RightComponent, className, type, ...props }, ref) => {
    const { error, required } = useFormField();
    const isInvalid = !!error;

    const inputRef = React.useRef<HTMLInputElement>(null);

    return (
      <div
        className={cn(
          `border-input ring-offset-background focus-visible:ring-ring flex
          w-full cursor-text items-center gap-3 rounded-lg border-[1px]
          border-charcoal-900 bg-charcoal-900 px-4 py-3 file:border-0
          file:bg-transparent file:text-sm file:font-medium
          placeholder:text-charcoal-300 focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-offset-2
          disabled:cursor-not-allowed disabled:opacity-50`,
          { "border-destructive": isInvalid },
          { hidden: type === "hidden" },
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
          className="peer w-full bg-transparent outline-none"
        />
        {RightComponent && RightComponent}
      </div>
    );
  },
);
Input.displayName = "Input";

const InputIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ icon, className, ...props }, ref) => {
    const { error, value } = useFormField();

    return (
      <Icon
        icon={icon}
        className={cn(
          "h-5 w-5 min-w-5 stroke-charcoal-400",
          { "stroke-charcoal-200": value },
          { "stroke-destructive": error },
          className,
        )}
        {...props}
        ref={ref}
      />
    );
  },
);
InputIcon.displayName = "InputIcon";

export { Input, InputIcon };
