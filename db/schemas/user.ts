import { InferSelectModel } from "drizzle-orm";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").notNull().primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  email_verified: integer("email_verified").default(0).notNull(),
  hashed_password: text("hashed_password").notNull(),
});

export const sessions = sqliteTable("sessions", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  expiresAt: integer("expires_at").notNull(),
});

export const emailVerificationCodes = sqliteTable("email_verification_codes", {
  id: text("id").notNull().primaryKey(),
  code: text("code").notNull(),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  email: text("email")
    .references(() => users.email, { onDelete: "cascade" })
    .notNull(),
  expiresAt: integer("expires_at").notNull(),
});

export const passwordResetTokens = sqliteTable("password_reset_tokens", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  expiresAt: integer("expires_at").notNull(),
});

export type User = InferSelectModel<typeof users>;
