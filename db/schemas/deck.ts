import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";

const cardStateEnum = ["NEW", "LEARNING", "YOUNG", "MATURE", "FROZEN"] as const;

export const deck = sqliteTable(
  "deck",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    deckGroupId: text("deck_group_id").notNull(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    description: text("description"),
    isPublic: integer("is_public").notNull().default(0),
    isVisible: integer("is_visible").notNull().default(1),
    createdAt: integer("created_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    cardOrder: text("card_order", { mode: "json" })
      .notNull()
      .default(sql`(json_array())`),
  },
  (t) => ({
    unq: unique().on(t.title, t.userId),
    unq2: unique().on(t.slug, t.userId),
  }),
);

export const deckGroup = sqliteTable(
  "deck_group",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    title: text("title").notNull(),
    isVisible: integer("is_visible").notNull().default(1),
    deckOrder: text("deck_order", { mode: "json" })
      .notNull()
      .default(sql`(json_array())`),
    isOpen: integer("is_open").notNull().default(1),
  },
  (t) => ({ unq: unique().on(t.title, t.userId) }),
);

export const card = sqliteTable("card", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  deckId: text("deck_id").notNull(),
  front: text("front").notNull(),
  back: text("back").notNull(),
  state: text("state", { enum: cardStateEnum }).notNull().default("NEW"),
  lastReviewedAt: integer("last_reviewed_at"),
  nextReviewAt: integer("next_review_at"),
  createdAt: integer("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
