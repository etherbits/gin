import {
  Card,
  Deck,
  DeckGroup,
  cardSchema,
  deckGroupSchema,
  deckSchema,
} from "@/validation-schemas/deck"
import { generateMock } from "@anatine/zod-mock"
import { faker } from "@faker-js/faker"
import { eq, sql } from "drizzle-orm"
import { User } from "lucia"
import { db } from "../drizzle"
import { card, deck, deckGroup } from "../schema/deck"
import { user } from "../schema/user"

export async function seedDeckGroups(testUser: User, count: number) {
  console.log("📚 Seeding deck groups...")

  const mockDeckGroups: DeckGroup[] = []

  for (let i = 0; i < count; i++) {
    mockDeckGroups.push(
      generateMock(deckGroupSchema, {
        stringMap: {
          title: () => faker.lorem.words(3),
        },
      }),
    )
  }

  await Promise.allSettled(
    mockDeckGroups.map(async (deckGroupData) => {
      await db.insert(deckGroup).values({
        ...deckGroupData,
        userId: testUser.userId,
      })
    }),
  )

  const deckGroups = await db
    .select({ id: sql`BIN_TO_UUID(${deckGroup.id})` })
    .from(deckGroup)
    .where(eq(deckGroup.userId, testUser.userId))

  console.log("✅ Deck groups seeded")
  return deckGroups as IdOnlyItems
}

export async function seedDecks(
  testUser: User,
  deckGroups: IdOnlyItems,
  count: number,
) {
  console.log("📔 Seeding decks...")

  const mockDecks: Deck[] = []

  for (let i = 0; i < count; i++) {
    mockDecks.push(
      generateMock(deckSchema, {
        stringMap: {
          description: () => faker.lorem.paragraphs({ min: 1, max: 10 }),
        },
      }),
    )
  }

  await Promise.allSettled(
    mockDecks.map(async (deckData) => {
      await db.insert(deck).values({
        ...deckData,
        userId: testUser.userId,
        deckGroupId: getRandomRelation(deckGroups, 0.2),
      })
    }),
  )

  const decks = await db
    .select({ id: sql`BIN_TO_UUID(${deck.id})` })
    .from(deck)
    .where(eq(deck.userId, testUser.userId))

  console.log("✅ Decks seeded")
  return decks as IdOnlyItems
}

export async function seedCards(
  testUser: User,
  decks: IdOnlyItems,
  count: number,
) {
  console.log("📜 Seeding cards...")

  const mockCards: Card[] = []

  for (let i = 0; i < count; i++) {
    mockCards.push(
      generateMock(cardSchema, {
        stringMap: {
          front: () => faker.lorem.paragraphs({ min: 1, max: 2 }),
          back: () => faker.lorem.paragraphs({ min: 1, max: 2 }),
        },
      }),
    )
  }

  await Promise.allSettled(
    mockCards.map(async (cardData) => {
      await db.insert(card).values({
        ...cardData,
        userId: testUser.userId,
        deckId: getRandomNotNullRelation(decks),
      })
    }),
  )

  const cards = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.id, testUser.userId))

  console.log("✅ Cards seeded")
  return cards
}

function getRandomRelation(items: IdOnlyItems, nullProbability: number) {
  const shouldHaveRelation = Math.random() > nullProbability

  if (!shouldHaveRelation) {
    return null
  }

  return getRandomNotNullRelation(items)
}

function getRandomNotNullRelation(items: IdOnlyItems) {
  return sql`UUID_TO_BIN(${
    items[Math.floor(Math.random() * (items.length - 1))].id
  })`
}

type IdOnlyItems = { id: string }[]
