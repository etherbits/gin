import { Button, ButtonProps } from "./button";
import { useFormStatus } from "react-dom";

export function SubmitButton({
  isValid,
  children,
  ...props
}: {
  isValid: boolean;
  children: React.ReactNode;
} & ButtonProps) {
  const status = useFormStatus();
  const isDisabled = status.pending || !isValid;

  return (
    <Button
      {...props}
      type="submit"
      disabled={isDisabled}
      title={
        isDisabled
          ? status.pending
            ? "Loading..."
            : "Please fill out the form"
          : undefined
      }
    >
      {status.pending ? "Loading..." : children}
    </Button>
  );
}
