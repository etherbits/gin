import { Button } from "@/components/primitive/button";
import DataList from "@/components/primitive/data-list";
import { Icon, IconButton } from "@/components/primitive/icon";
import ListCol from "@/components/primitive/list-col";
import TopBar from "@/components/primitive/top-bar";
import { db } from "@/db";
import { validateRequest } from "@/utils/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const { user } = await validateRequest();

  if (!user) return redirect("/sign-in");

  const decks = await db.query.deck.findMany({
    where: (deck, { eq }) => eq(deck.userId, user.id) && eq(deck.isVisible, 1),
  });

  return (
    <div>
      <TopBar
        title="Your Decks"
        description="Pick a deck and start studying"
        TitleSlot={
          <IconButton>
            <Icon icon="Settings" className="h-5 w-5" />
          </IconButton>
        }
        RightSlot={
          <Link href="/add-deck">
            <Button size="sm">Add Deck</Button>
          </Link>
        }
      />
      <DataList
        items={decks}
        render={(deck) => (
          <Link href={`/deck/${deck.slug}/card-list`}>
            <ListCol item={deck} />
          </Link>
        )}
      />
    </div>
  );
}
