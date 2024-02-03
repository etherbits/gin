import OAuthProviders from "../components/OAuthProviders"
import RegistrationForm from "../components/RegistrationForm"

export default async function Registration() {
  return (
    <main className="flex justify-center">
      <section className="mt-[3%] flex w-[500px] flex-col gap-4 rounded-md bg-charcoal-900">
        <RegistrationForm />
        <section className="flex justify-center gap-4 px-8 py-6">
          <OAuthProviders />
        </section>
      </section>
    </main>
  )
}
