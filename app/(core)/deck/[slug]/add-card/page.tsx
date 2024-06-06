import { AddCardForm } from "@/components/composition/add-card-form";
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

  if (!deck) {
    return redirect("/404");
  }

  return (
    <div>
      <TopBar title={`${deck.title} - Add card`} />
      <AddCardForm deck={{ id: deck.id, slug: deck.slug }} />
    </div>
  );
}
