import { useFormField } from "./form";
import { cn } from "@/utils/tailwind";
import { icons } from "lucide-react";
import * as React from "react";

export type InputProps = {
  LeftComponent?: JSX.Element;
  RightComponent?: JSX.Element;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLDivElement, InputProps>(
  (
    {
      LeftComponent: LeftIcon,
      RightComponent: RightIcon,
      className,
      type,
      ...props
    },
    ref,
  ) => {
    const { error } = useFormField();
    const isInvalid = !!error;

    const inputRef = React.useRef<HTMLInputElement>(null);

    return (
      <div
        className={cn(
          `border-input cursor-text bg-charcoal-900 ring-offset-background
          placeholder:text-charcoal-300 focus-visible:ring-ring flex w-full items-center
          rounded-lg  px-4 py-3 file:border-0 file:bg-transparent
          file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 gap-3`,
          { "border-destructive border-[1px]": isInvalid },
          className,
        )}
        ref={ref}
        onClick={() => inputRef.current?.focus()}
      >
        {LeftIcon && LeftIcon}
        <input
          type={type}
          ref={inputRef}
          {...props}
          className="peer bg-transparent w-full h-full outline-none"
        />
        {RightIcon && RightIcon}
      </div>
    );
  },
);
Input.displayName = "Input";

export type IconKey = keyof typeof icons;

const InputIcon = React.forwardRef<
  SVGSVGElement,
  {
    icon: IconKey;
  } & React.SVGProps<SVGSVGElement>
>(({ icon, className, ...props }, ref) => {
  const Icon = icons[icon];
  const { error, value } = useFormField();

  return (
    <Icon
      className={cn(
        "stroke-charcoal-400",
        { "stroke-charcoal-200": value },
        { "stroke-destructive": error },
        className,
      )}
      {...props}
      ref={ref}
    />
  );
});
InputIcon.displayName = "InputIcon";

export { Input, InputIcon };
