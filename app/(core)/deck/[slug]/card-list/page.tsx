import { Button } from "@/components/primitive/button";
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
    where: (deck, { eq }) =>
      eq(deck.slug, params.slug) &&
      eq(deck.userId, user.id) &&
      eq(deck.isVisible, 1),
  });

  if (!deck) {
    return redirect("/404");
  }

  return (
    <div>
      <TopBar title={`${deck.title} - Card List`} />
      <Link href={`/deck/${deck.slug}/add-card`}>
        <Button>Add Card</Button>
      </Link>
    </div>
  );
}
