import { Button } from "@/components/primitive/button";
import TopBar from "@/components/primitive/top-bar";
import { db } from "@/db";
import { validateRequest } from "@/utils/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default async function Page({ params }: { params: { slug: string } }) {
  const { user } = await validateRequest();

  if (!user) return redirect("/sign-in");

  const deck = await db.query.deck.findFirst({
    where: (deck, { eq }) => eq(deck.title, params.slug),
  });

  if (!deck) {
    toast.error("Deck not found");
    return redirect("/home");
  }

  return (
    <div>
      <TopBar title={`${deck} - Card List`} />
      <Link href={`/deck/${deckTitle}/add-card`}>
        <Button>Add Card</Button>
      </Link>
    </div>
  );
}
