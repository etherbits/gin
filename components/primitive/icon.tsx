import { Button, ButtonProps } from "./button";
import { cn } from "@/utils/tailwind";
import { icons } from "lucide-react";
import React from "react";

export type IconKey = keyof typeof icons;

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: IconKey;
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ icon, className, ...props }, ref) => {
    const Icon = icons[icon];
    return <Icon className={cn("w-5 h-5", className)} {...props} ref={ref} />;
  },
);
Icon.displayName = "Icon";

function IconButton({
  children,
  bgProps,
  ...props
}: {
  children?: React.ReactNode;
  bgProps?: React.HTMLProps<HTMLDivElement>;
} & ButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      {...props}
      className={cn(
        "relative aspect-square h-fit w-fit group",
        props.className,
      )}
    >
      <div className="z-[1]">{children}</div>
      <div
        {...bgProps}
        className={cn(
          "absolute w-full h-full p-1 box-content rounded-md group-hover:bg-charcoal-700 transition-colors ",
          bgProps?.className,
        )}
      />
    </Button>
  );
}

export { Icon, IconButton };
