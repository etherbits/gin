import { z } from "zod";

export const deckSchema = z.object({
  deckGroupId: z.string().uuid().optional(),
  title: z.string().min(4).max(255),
  description: z.string().max(2500),
  isPublic: z.boolean(),
  isVisible: z.boolean(),
});
