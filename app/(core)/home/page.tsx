import { Button } from "@/components/primitive/button";
import { Icon, IconButton } from "@/components/primitive/icon";
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
            <Icon icon="Settings" className="w-5 h-5" />
          </IconButton>
        }
        RightSlot={
          <Link href="/add-deck">
            <Button size="sm">Add Deck</Button>
          </Link>
        }
      />
      <ul>
        {decks.map((deck) => {
          return (
            <li key={deck.id}>
              <Link href={`/deck/${deck.title}/card-list`}>{deck.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
