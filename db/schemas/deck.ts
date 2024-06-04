import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const cardStateEnum = ["NEW", "LEARNING", "YOUNG", "MATURE", "FROZEN"] as const;

export const deck = sqliteTable("deck", {
  id: integer("id").primaryKey().notNull(),
  userId: text("user_id").notNull(),
  deckGroupId: integer("deck_group_id"),
  title: text("title").notNull(),
  description: text("description"),
  isPublic: integer("is_public").notNull().default(0),
  isVisible: integer("is_visible").notNull().default(1),
  createdAt: integer("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  cardOrder: text("card_order", { mode: "json" })
    .notNull()
    .default(sql`(json_array(0))`),
});

export const deckGroup = sqliteTable("deck_group", {
  id: integer("id").primaryKey().notNull(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull().unique(),
  isVisible: integer("is_visible").notNull().default(1),
  deckOrder: text("deck_order", { mode: "json" })
    .notNull()
    .default(sql`(json_array(0))`),
  isOpen: integer("is_open").notNull().default(1),
});

export const card = sqliteTable("card", {
  id: integer("id").primaryKey().notNull(),
  userId: text("user_id").notNull(),
  deckId: integer("deck_id").notNull(),
  front: text("front").notNull(),
  back: text("back").notNull(),
  state: text("state", { enum: cardStateEnum }).notNull().default("NEW"),
  lastReviewedAt: integer("last_reviewed_at"),
  nextReviewAt: integer("next_review_at"),
  createdAt: integer("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
