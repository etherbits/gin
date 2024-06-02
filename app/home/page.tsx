import DeckList from "@/components/composition/deck-list";
import ItemList from "@/components/composition/item-list";
import { SignOutButton } from "@/components/primitive/sign-out-button";
import { validateRequest } from "@/utils/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Page() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex flex-col px-8 py-6">
      <div className="flex items-center justify-between gap-8">
        <Image
          src={user.profile_image ?? "/icons/profile_icon.svg"}
          className="w-8 h-8 rounded-full"
          width={32}
          height={32}
          alt="profile"
        />
        <h1 className="text-2xl">
          Welcome {user.username} {user.email}
        </h1>
        <SignOutButton />
      </div>
      <DeckList/>
    </div>
  );
}
