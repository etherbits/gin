import { FormCard } from "@/components/composition/form-card";
import { ResetPasswordForm } from "@/components/composition/reset-password-form";
import React from "react";

export default function page() {
  return (
    <FormCard
      title="Reset password"
      description="Enter your email to reset your password"
    >
      <ResetPasswordForm />
    </FormCard>
  );
}
