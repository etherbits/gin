import { FormCard } from "@/components/composition/form-card";
import { VerifyEmailForm } from "@/components/composition/verify-email-form";
import { validateRequest } from "@/utils/auth";
import { emailVerificationExpiry } from "@/utils/timing";

export default async function VerifyEmail() {
  const { user } = await validateRequest();

  return (
    <FormCard
      title="Verify Email"
      description={`Enter the code in your we sent to your email within ${Math.round(emailVerificationExpiry.seconds() / 60)} minutes`}
    >
      <VerifyEmailForm user={user} />
    </FormCard>
  );
}
