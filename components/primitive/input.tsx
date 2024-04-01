import { useFormField } from "./form";
import { cn } from "@/utils/tailwind";
import { icons } from "lucide-react";
import * as React from "react";

export type InputProps = {
  LeftComponent?:JSX.Element;
  RightComponent?: JSX.Element;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ LeftComponent: LeftIcon, RightComponent: RightIcon, className, type, ...props }, ref) => {
    const { error } = useFormField();
    const isInvalid = !!error;

    return (
      <div
        className={cn(
          `border-input bg-background ring-offset-background
          placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full
          rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent
          file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 gap-2`,
          { "border-destructive": isInvalid },
          className,
        )}
      >
        {LeftIcon && LeftIcon}
        <input
          type={type}
          ref={ref}
          {...props}
          className="bg-transparent w-full h-full outline-none"
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
  const { error } = useFormField();

  return (
    <Icon
      className={cn(
        "stroke-slate-300",
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
