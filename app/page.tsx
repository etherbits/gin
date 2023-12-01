import { env } from "@/app/env";
import Test from "./components/Test";

export default function Home() {
  async function dbTest() {
    "use server";

    console.log(env.DATABASE_HOST);
  }

  return (
    <main>
      Gin
      <form action={dbTest}>
        {env.DATABASE_HOST}
        <Test />
        <button>test</button>
      </form>
    </main>
  );
}
