import { validateRequest } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/sign-in");
  }

  return <h1>Welcome {user.username}</h1>;
}
