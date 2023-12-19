global.crypto = require("crypto"); // for lucia auth

import { db } from "@/db/drizzle";
import { sql } from "drizzle-orm";
import { seedCards, seedDeckGroups, seedDecks } from "./deck";
import { seedUser } from "./user";

async function seed() {
  await reset();

  console.log("🌱 Seeding database...");
  const testUser = await seedUser();

  const deckGroups = await seedDeckGroups(testUser, 5);
  const decks = await seedDecks(testUser, deckGroups, 15);
  await seedCards(testUser, decks, 100);

  console.log("✅ Database fully seeded");
}

seed().catch((e) => {
  console.error(e);
});

async function reset() {
  console.log("🗑️ Emptying the entire database...");
  const tableSchema = db._.schema;
  if (!tableSchema) {
    throw new Error("No table schema found");
  }

  const queries = Object.values(tableSchema).map((table) => {
    return sql.raw(`TRUNCATE TABLE ${table.dbName};`);
  });

  await db.transaction(async (tx) => {
    await Promise.allSettled(
      queries.map(async (query) => {
        if (query) await tx.execute(query);
      }),
    );
  });

  console.log("✅ Database emptied");
}
