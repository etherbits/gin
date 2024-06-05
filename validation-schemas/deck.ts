import { z } from "zod";

export const deckTargets = ["Personal", "Shared"] as const;

export const addDeckSchema = z.object({
  title: z.string().min(1).max(128),
  description: z.string().max(4000),
  target: z.enum(deckTargets),
  groupId: z.string().min(1),
});

export const addCardSchema = z.object({
  front: z.string().min(1).max(4000),
  back: z.string().min(0).max(4000), 
});
