import { z } from "zod";

export const deckTargets = ["Personal", "Shared"] as const;

export const deckSchema = z.object({
  title: z.string().min(1).max(128),
  description: z.string().max(4000),
  target: z.enum(deckTargets),
  groupId: z.string().min(1),
});
