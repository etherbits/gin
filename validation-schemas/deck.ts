import { z } from "zod";

export const deckSchema = z.object({
  userId: z.string().uuid(),
  deckGroupId: z.string().uuid().optional(),
  title: z.string().min(4).max(255),
  description: z.string().max(2500),
  isPublic: z.boolean(),
  isVisible: z.boolean(),
});

export const deckGroupSchema = z.object({
  userId: z.string().uuid(),
  title: z.string().min(4).max(255),
  isVisible: z.boolean(),
});

export const cardSchema = z.object({
  userId: z.string().uuid(),
  deckId: z.string().uuid(),
  front: z.string().min(1).max(2500),
  back: z.string().min(1).max(2500),
});
