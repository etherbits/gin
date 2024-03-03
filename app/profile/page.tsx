import { validateRequest } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex justify-between items-center gap-8 p-16">
      <h1 className="text-2xl">Welcome {user.username} {user.email}</h1>
    </div>
  );
}
