import { db } from "@/db/drizzle";
import { auth } from "@/lib/lucia";
import { eq, sql } from "drizzle-orm";
import { User } from "lucia";
import { generateMock } from "@anatine/zod-mock";
import { faker } from "@faker-js/faker";
global.crypto = require("crypto");

import {
  Card,
  Deck,
  DeckGroup,
  cardSchema,
  deckGroupSchema,
  deckSchema,
} from "@/validation-schemas/deck";
import { card, deck, deckGroup } from "@/db/schema/deck";
import { user } from "@/db/schema/user";

async function seed() {
  await reset();

  console.log("🌱 Seeding database");
  const testUser = await seedUser();

  const deckGroups = await seedDeckGroups(testUser, 5);
  const decks = await seedDecks(testUser, deckGroups, 15);
  await seedCards(testUser, decks, 100);

  console.log("✅ Database seeded");
}

seed().catch((e) => {
  console.error(e);
});

async function reset() {
  const tableSchema = db._.schema;
  if (!tableSchema) {
    throw new Error("No table schema found");
  }

  console.log("🗑️  Emptying the entire database");
  const queries = Object.values(tableSchema).map((table) => {
    console.log(`🧨 Preparing delete query for table: ${table.dbName}`);
    return sql.raw(`TRUNCATE TABLE ${table.dbName};`);
  });

  console.log("📨 Sending delete queries...");

  await db.transaction(async (tx) => {
    await Promise.allSettled(
      queries.map(async (query) => {
        if (query) await tx.execute(query);
      }),
    );
  });

  console.log("✅ Database emptied");
}

async function seedUser() {
  console.log("👤 Seeding users...");

  const data = {
    username: "test account",
    email: "asd@asd.com",
    password: "asdasdasd",
  };

  return await auth.createUser({
    key: {
      providerId: "email",
      providerUserId: data.email,
      password: data.password,
    },
    attributes: {
      username: data.username,
      email: data.email,
      email_verified: true,
    },
  });
}

async function seedDeckGroups(testUser: User, count: number) {
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

async function seedDecks(
  testUser: User,
  deckGroups: { id: string }[],
  count: number,
) {
  console.log("📚 Seeding decks...");

  const mockDecks: Deck[] = [];

  for (let i = 0; i < count; i++) {
    mockDecks.push(generateMock(deckSchema));
  }

  console.log(
    deckGroups[Math.floor(Math.random() * (deckGroups.length - 1))].id,
  );
  await Promise.allSettled(
    mockDecks.map(async (deckData) => {
      await db.insert(deck).values({
        ...deckData,
        userId: testUser.userId,
        deckGroupId: sql`(UUID_TO_BIN(${
          deckGroups[Math.floor(Math.random() * (deckGroups.length - 1))].id
        }))`,
      });
    }),
  );

  const decks = await db
    .select({ id: sql`BIN_TO_UUID(${deck.id})` })
    .from(deck)
    .where(eq(deck.userId, testUser.userId));

  return decks as { id: string }[];
}

async function seedCards(
  testUser: User,
  decks: { id: string }[],
  count: number,
) {
  console.log("📚 Seeding cards...");

  const mockCards: Card[] = [];

  for (let i = 0; i < count; i++) {
    mockCards.push(generateMock(cardSchema));
  }

  console.log(decks[Math.floor(Math.random() * (decks.length - 1))].id);

  await Promise.allSettled(
    mockCards.map(async (cardData) => {
      await db.insert(card).values({
        ...cardData,
        userId: testUser.userId,
        deckId: sql`(UUID_TO_BIN(${
          decks[Math.floor(Math.random() * (decks.length - 1))].id
        }))`,
      });
    }),
  );

  const cards = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.id, testUser.userId));

  return cards;
}
