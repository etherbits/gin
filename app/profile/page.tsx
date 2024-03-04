import { validateRequest } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex items-center justify-between gap-8 p-16">
      <h1 className="text-2xl">
        {user.username} {user.email}
        {user.email_verified ? "verified" : "not verified"}
      </h1>
    </div>
  );
}
