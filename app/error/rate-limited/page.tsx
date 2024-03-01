export default function RateLimited() {
  return (
    <div className="flex justify-center items-center h-screen">
      <main className="flex flex-col w-fit gap-4 bg-neutral-950 px-12 py-10 rounded-md">
        <h1 className="text-3xl m-auto font-bold text-center">Rate Limited</h1>
        <p className="text-center">
          You are being rate limited. Please try again later.
        </p>
      </main>
    </div>
  );
}
