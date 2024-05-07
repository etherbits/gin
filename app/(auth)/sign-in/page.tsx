import { FormCard } from "@/components/composition/form-card";
import { SignInForm } from "@/components/composition/sign-in-form";
import { OAuthButtonGroup } from "@/components/primitive/oauth-button-group";
import { Splitter } from "@/components/primitive/splitter";

export default async function Page() {
  return (
    <>
      <FormCard title="Sign In" description="Authenticate using a provider">
        <OAuthButtonGroup />
        <Splitter>or</Splitter>
        <SignInForm />
      </FormCard>
    </>
  );
}
