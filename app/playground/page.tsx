import { Playground } from "@/components/composition/playground";
import { validateRequest } from "@/utils/auth";
import { parsedEnv } from "@/utils/env";
import { redirect } from "next/navigation";

export default async function Page() {
  if (parsedEnv.NODE_ENV === "production") return redirect("/404");

  const { user } = await validateRequest();
  if (!user) return redirect("/sign-in");

  return (
    <div>
      <h1>Playground</h1>
      <Playground />
    </div>
  );
}
