import { db } from "@/db";
import { validateRequest } from "@/utils/auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const { user } = await validateRequest();
  if (!user) {
    return NextResponse.json(
      { error: "No authenticated user" },
      { status: 401 },
    );
  }
  const deckGroups = await db.query.deckGroup.findMany({
    where: (group, { eq }) => eq(group.userId, user.id),
  });

  return NextResponse.json(deckGroups, { status: 200 });
}
