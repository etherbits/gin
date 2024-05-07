import { IconButton } from "./icon";
import { InputIcon } from "./input";
import { Input, InputProps } from "./input";
import * as React from "react";

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  InputProps & {
    showPassword: boolean;
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  }
>(({ showPassword, setShowPassword, ...props }, ref) => {
  return (
    <Input
      {...props}
      ref={ref}
      type={showPassword ? "text" : "password"}
      RightComponent={
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            setShowPassword((prev) => !prev);
          }}
        >
          <InputIcon
            className="z-10 transition-all"
            icon={showPassword ? "EyeOff" : "Eye"}
          />
        </IconButton>
      }
    />
  );
});
PasswordInput.displayName = "Input";

export { PasswordInput };
