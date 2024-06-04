import { z } from "zod";

export const deckSchema = z.object({
  title: z.string().min(1).max(128),
  description: z.string().min(1).
})
