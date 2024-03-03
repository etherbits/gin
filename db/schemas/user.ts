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
    .notNull()
    .references(() => users.id),
  expiresAt: integer("expires_at", {
    mode: "number",
  }).notNull(),
});

// export const emailVerification = sqliteTable("email_verification", {
//   id: text("id", {
//     length: 64,
//   }).primaryKey(),
//   userId: text("user_id", {
//     length: 15,
//   }).notNull(),
//   expires: integer("expires", {
//     mode: "number",
//   }).notNull(),
// });
//
// export const passwordReset = sqliteTable("password_reset", {
//   id: text("id", {
//     length: 64,
//   }).primaryKey(),
//   userId: text("user_id", {
//     length: 15,
//   }).notNull(),
//   expires: integer("expires", {
//     mode: "number",
//   }).notNull(),
// });

export type User = InferSelectModel<typeof users>;
