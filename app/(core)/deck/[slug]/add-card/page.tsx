import { AddDeckForm } from "@/components/composition/add-deck-form";
import TopBar from "@/components/primitive/top-bar";
import { db } from "@/db";
import { validateRequest } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  const { user } = await validateRequest();

  if (!user) return redirect("/sign-in");

  const deck = await db.query.deck.findFirst({
    where: (deck, { eq }) =>
      eq(deck.slug, params.slug) &&
      eq(deck.userId, user.id) &&
      eq(deck.isVisible, 1),
  });

  return (
    <div>
      <TopBar title="Add Deck" />
      <AddCard deckGroups={deckGroups} />
    </div>
  );
}
