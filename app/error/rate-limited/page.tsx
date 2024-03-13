export default function RateLimited() {
  return (
    <div className="flex h-screen items-center justify-center">
      <main className="flex w-fit flex-col gap-4 rounded-md bg-neutral-950 px-12 py-10">
        <h1 className="m-auto text-center text-3xl font-bold">Rate Limited</h1>
        <p className="text-center">
          You are being rate limited. Please try again later.
        </p>
      </main>
    </div>
  );
}
