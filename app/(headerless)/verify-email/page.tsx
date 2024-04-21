import { FormCard } from "@/components/composition/form-card";
import { VerifyEmailForm } from "@/components/composition/verify-email-form";
import { validateRequest } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function VerifyEmail() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <FormCard
      title="Verify Email"
      description="Verify email by putting in the otp code"
    >
      <VerifyEmailForm />
    </FormCard>
  );
}
