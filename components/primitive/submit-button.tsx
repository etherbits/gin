import { Button } from "./button";
import { cn } from "@/utils/tailwind";
import { useFormStatus } from "react-dom";

export function SubmitButton({
  isValid,
  children,
}: {
  isValid: boolean;
  children: React.ReactNode;
}) {
  const status = useFormStatus();
  const isDisabled = status.pending || !isValid;

  return (
    <Button
      type="submit"
      disabled={isDisabled}
      className={cn(
        "bg-gossamer-500 disabled:pointer-events-auto disabled:cursor-not-allowed",
      )}
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
