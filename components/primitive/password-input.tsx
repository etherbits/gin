import { Button } from "./button";
import { Input, InputIcon, InputProps } from "./input";
import * as React from "react";

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  InputProps & {
    showPassword: boolean;
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  }
>((props, ref) => {
  return (
    <Input
      {...props}
      ref={ref}
      type={props.showPassword ? "text" : "password"}
      RightComponent={
        <Button
          type="button"
          size="icon"
          className={"relative h-full w-auto group"}
          onClick={(e) => {
            e.stopPropagation();
            props.setShowPassword((prev) => !prev);
          }}
        >
          <InputIcon
            className="group-hover:stroke-slate-100 z-10 transition-all"
            icon={props.showPassword ? "EyeOff" : "Eye"}
          />
          <div className="absolute w-full h-full p-1 box-content rounded-md group-hover:bg-charcoal-700 z-0 transition-colors " />
        </Button>
      }
    />
  );
});
PasswordInput.displayName = "Input";

export { PasswordInput };
