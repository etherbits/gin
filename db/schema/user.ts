import { InferSelectModel } from "drizzle-orm";
import { mysqlTable, bigint, varchar, boolean } from "drizzle-orm/mysql-core";

export const user = mysqlTable("user", {
  id: varchar("id", {
    length: 15, // change this when using custom user ids
  }).primaryKey(),
  username: varchar("username", { length: 64 }).notNull(),
  email: varchar("email", { length: 254 }).notNull(),
  emailVerified: boolean("email_verified").default(false).notNull(),
});

export const key = mysqlTable("user_key", {
  id: varchar("id", {
    length: 255,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 15,
  }).notNull(),
  hashedPassword: varchar("hashed_password", {
    length: 255,
  }),
});

export const session = mysqlTable("user_session", {
  id: varchar("id", {
    length: 128,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 15,
  }).notNull(),
  activeExpires: bigint("active_expires", {
    mode: "number",
  }).notNull(),
  idleExpires: bigint("idle_expires", {
    mode: "number",
  }).notNull(),
});

export const emailVerification = mysqlTable("email_verification", {
  id: varchar("id", {
    length: 64,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 15,
  }).notNull(),
  expires: bigint("expires", {
    mode: "number",
  }).notNull(),
});

export const passwordReset = mysqlTable("password_reset", {
  id: varchar("id", {
    length: 64,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 15,
  }).notNull(),
  expires: bigint("expires", {
    mode: "number",
  }).notNull(),
});

export type User = InferSelectModel<typeof user>;
