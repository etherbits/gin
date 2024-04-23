import { ChangePasswordForm } from "@/components/composition/change-password-form";
import { FormCard } from "@/components/composition/form-card";
import React from "react";

export default function page({ params }: { params: { token: string } }) {
  return (
    <FormCard title="Change Password" description="Enter your new password">
      <ChangePasswordForm verificationToken={params.token} />
    </FormCard>
  );
}
