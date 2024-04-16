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
          className={"h-full aspect-square w-auto hover:bg-gray-800 p-[2px]"}
          onClick={() => props.setShowPassword((prev) => !prev)}
        >
          <InputIcon
            className="hover:stroke-slate-100 w-5 h-5"
            icon={props.showPassword ? "EyeOff" : "Eye"}
          />
        </Button>
      }
    />
  );
});
PasswordInput.displayName = "Input";

export { PasswordInput };
