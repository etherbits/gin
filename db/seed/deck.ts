export async function seedDeckGroups(testUser: User, count: number) {
  console.log("📚 Seeding deck groups...");

  const mockDeckGroups: DeckGroup[] = [];

  for (let i = 0; i < count; i++) {
    mockDeckGroups.push({ title: faker.lorem.words(3), isVisible: true });
  }

  await Promise.allSettled(
    mockDeckGroups.map(async (deckGroupData) => {
      await db.insert(deckGroup).values({
        ...deckGroupData,
        userId: testUser.userId,
      });
    }),
  );

  const deckGroups = await db
    .select({ id: sql`BIN_TO_UUID(${deckGroup.id})` })
    .from(deckGroup)
    .where(eq(deckGroup.userId, testUser.userId));

  return deckGroups as { id: string }[];
}
