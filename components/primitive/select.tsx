"use client";

import { Icon } from "./icon";
import { cn } from "@/utils/tailwind";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import * as React from "react";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    LeftSlot?: React.ReactNode;
  }
>(({ className, children, LeftSlot, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      `border-input ring-offset-background focus-visible:ring-ring flex w-full
      cursor-pointer items-center justify-between gap-3 rounded-lg border-[1px]
      border-charcoal-900 bg-charcoal-900 px-4 py-3 file:border-0
      file:bg-transparent file:text-sm file:font-medium
      placeholder:text-charcoal-300 focus-visible:outline-none
      focus-visible:ring-2 focus-visible:ring-offset-2
      disabled:cursor-not-allowed disabled:opacity-50`,
      className,
    )}
    {...props}
  >
    <div className="flex items-center gap-3">
      {LeftSlot && LeftSlot}
      <span className="">{children}</span>
    </div>
    <SelectPrimitive.Icon asChild>
      <Icon icon="ChevronDown" className="h-5 w-5" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        `bg-popover text-popover-foreground data-[state=open]:animate-in
        data-[state=closed]:animate-out data-[state=closed]:fade-out-0
        data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95
        data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2
        data-[side=left]:slide-in-from-right-2
        data-[side=right]:slide-in-from-left-2
        data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96
        min-w-[8rem] overflow-hidden rounded-md border shadow-md`,
        position === "popper" &&
          `data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1
          data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1`,
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            `h-[var(--radix-select-trigger-height)] w-full
            min-w-[var(--radix-select-trigger-width)]`,
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      `focus:bg-accent focus:text-accent-foreground relative flex w-full
      cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2
      text-sm outline-none data-[disabled]:pointer-events-none
      data-[disabled]:opacity-50`,
      className,
    )}
    {...props}
  >
    <span
      className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center"
    >
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectNew = React.forwardRef<
  React.ElementRef<React.ForwardRefExoticComponent<HTMLButtonElement>>,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    addValue: (value: string) => void;
  }
>(({ className, children, addValue, ...props }, ref) => {
  const [isAdding, setIsAdding] = React.useState(false);

  return isAdding ? (
    <input
      type="text"
      onKeyDown={(e) => {
        if (e.key !== "Enter") return;
        addValue(e.currentTarget.value);
        setIsAdding(false);
      }}
      autoFocus
    />
  ) : (
    <button
      onClick={() => setIsAdding(true)}
      ref={ref}
      className={cn(
        `focus:bg-accent focus:text-accent-foreground relative flex w-full
          cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2
          text-sm outline-none data-[disabled]:pointer-events-none
          data-[disabled]:opacity-50`,
        className,
      )}
      {...props}
    >
      <span className="flex items-center justify-center">
        <Icon icon="Plus" className="h-4 w-4" />
        {children}
      </span>
    </button>
  );
});
SelectNew.displayName = "SelectNew";

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("bg-muted -mx-1 my-1 h-px", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectNew,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
