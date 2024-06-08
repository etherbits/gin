import { AddDeckForm } from "@/components/composition/add-deck-form";
import TopBar from "@/components/primitive/top-bar";
import { db } from "@/db";
import { validateRequest } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const { user } = await validateRequest();

  if (!user) return redirect("/sign-in");

  const deckGroups = await db.query.deckGroup.findMany({
    where: (group, { eq }) => eq(group.userId, user.id),
  });

  return (
    <div>
      <TopBar title="Add Deck" />
      <AddDeckForm deckGroups={deckGroups} userId={user.id}/>
    </div>
  );
}
