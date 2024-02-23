import { env } from "@/app/env"
import { drizzle } from "drizzle-orm/planetscale-serverless"
import { Client } from "@planetscale/database"
import * as userSchemas from "./schema/user"
import * as deckSchemas from "./schema/deck"

const schema = {
  ...userSchemas,
  ...deckSchemas,
}

// planetscale free tier no longer available for me :((((
// ill find a different way to host the database
export const client = new Client({
  url: env.DATABASE_URL,
})

export const db = drizzle(client, {
  schema,
})
