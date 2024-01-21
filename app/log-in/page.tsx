import AuthForm from "../components/AuthForm"
import OAuthProviders from "../components/OAuthProviders"

export default async function LogIn() {
  return (
    <main className="flex justify-center">
      <section className="mt-[3%] flex w-[500px] flex-col gap-4 rounded-md bg-charcoal-900">
        <AuthForm />
        <section className="flex justify-center gap-4 px-8 py-6">
          <OAuthProviders />
        </section>
      </section>
    </main>
  )
}
