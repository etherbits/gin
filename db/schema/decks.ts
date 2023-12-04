import { sql } from "drizzle-orm";
import {
  binary,
  boolean,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

const cardStateEnum = ["NEW", "LEARNING", "YOUNG", "MATURE", "FROZEN"] as const;

export const deck = mysqlTable("deck", {
  id: binary("id", { length: 16 })
    .primaryKey()
    .notNull()
    .default(sql`(UUID_TO_BIN(UUID()))`),
  deckGroupId: binary("deck_group_id", { length: 16 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  isPublic: boolean("is_public").notNull().default(false),
  isVisible: boolean("is_visible").notNull().default(true),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`NOW()`),
});

export const deckGroup = mysqlTable("deck_group", {
  id: binary("id", { length: 16 })
    .primaryKey()
    .notNull()
    .default(sql`(UUID_TO_BIN(UUID()))`),
  title: varchar("title", { length: 255 }).notNull(),
  isVisible: boolean("is_visible").notNull().default(true),
});

export const card = mysqlTable("card", {
  id: binary("id", { length: 16 })
    .primaryKey()
    .notNull()
    .default(sql`(UUID_TO_BIN(UUID()))`),
  deckId: binary("deck_id", { length: 16 }).notNull(),
  front: text("front").notNull(),
  back: text("back").notNull(),
  state: mysqlEnum("state", cardStateEnum).notNull().default("NEW"),
  lastReviewedAt: timestamp("last_reviewed_at"),
  nextReviewAt: timestamp("next_review_at"),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`NOW()`),
});
