import { z } from "zod";

export const deckSchema = z.object({
  title: z.string().min(1).max(128),
  description: z.string().max(4000).optional(),
  target: z.enum(["Personal", "Public"]),
  groupId: z.string().optional(),
});
