import { env } from "@/app/env";

export default function Home() {
  async function dbTest() {
    "use server";

    console.log(env.DATABASE_URL);
  }
  console.log(env)
  return (
    <main>
      Gin
      <form action={dbTest}>
        {env.DATABASE_URL}
        <button>test</button>
      </form>
    </main>
  );
}
