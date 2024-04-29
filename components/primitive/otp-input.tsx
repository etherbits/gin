"use client";

import { cn } from "@/utils/tailwind";
import { OTPInput, OTPInputContext } from "input-otp";
import {
  REGEXP_ONLY_DIGITS_AND_CHARS,
  REGEXP_ONLY_CHARS,
  REGEXP_ONLY_DIGITS,
} from "input-otp";
import { Dot } from "lucide-react";
import * as React from "react";

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName,
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
));
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-charcoal-400 transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-2 ring-ring ring-offset-background",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

const InputOTPPattern = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  { withDigits?: boolean; withChars?: boolean } & Omit<
    React.ComponentPropsWithoutRef<typeof OTPInput>,
    "render"
  >
>(({ ...props }, ref) => {
  const { maxLength, withDigits, withChars, ...inputOtpProps } = props;
  const pattern =
    withDigits && withChars
      ? REGEXP_ONLY_DIGITS_AND_CHARS
      : withDigits
        ? REGEXP_ONLY_DIGITS
        : REGEXP_ONLY_CHARS;

  return (
    <InputOTP
      ref={ref}
      maxLength={maxLength}
      pattern={pattern}
      {...inputOtpProps}
    >
      <InputOTPGroup
        className={`grid [grid-template-columns:repeat(${maxLength},1fr)] w-full`}
      >
        {[...Array(maxLength)].map((_, index) => (
          <InputOTPSlot
            key={index}
            index={index}
            className="h-auto w-auto aspect-square"
          />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
});
InputOTPPattern.displayName = "InputOTPPattern";

export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
  InputOTPPattern,
};
