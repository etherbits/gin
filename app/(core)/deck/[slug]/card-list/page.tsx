import { Button } from "@/components/primitive/button";
import DataList from "@/components/primitive/data-list";
import ListCol from "@/components/primitive/list-col";
import TopBar from "@/components/primitive/top-bar";
import { db } from "@/db";
import { validateRequest } from "@/utils/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { slug: string } }) {
  const { user } = await validateRequest();

  if (!user) return redirect("/sign-in");

  const deck = await db.query.deck.findFirst({
    where: (deck, { eq, and }) =>
      and(
        eq(deck.slug, params.slug),
        eq(deck.userId, user.id),
        eq(deck.isVisible, 1),
      ),
  });

  if (!deck) {
    return redirect("/404");
  }

  const cards = await db.query.card.findMany({
    where: (card, { eq, and }) =>
      and(eq(card.deckId, deck.id), eq(card.userId, user.id)),
  });

  return (
    <div>
      <TopBar
        title={`${deck.title} - Card List`}
        RightSlot={
          <Link href={`/deck/${deck.slug}/add-card`}>
            <Button>Add Card</Button>
          </Link>
        }
      />
      <DataList
        items={cards}
        render={(card) => (
          <Link href={`/deck/${deck.slug}/edit-card/${card.id}`}>
            <ListCol item={{ title: card.front.slice(0, 16) }} />
          </Link>
        )}
      />
    </div>
  );
}
