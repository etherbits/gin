import { IconButton, InputIcon } from "./icon";
import { Input, InputProps } from "./input";
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
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            props.setShowPassword((prev) => !prev);
          }}
        >
          <InputIcon
            className="z-10 transition-all"
            icon={props.showPassword ? "EyeOff" : "Eye"}
          />
        </IconButton>
      }
    />
  );
});
PasswordInput.displayName = "Input";

export { PasswordInput };
