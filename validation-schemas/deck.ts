import { z } from "zod";

export const deckSchema = z.object({
	deckGroupId: z.string().uuid().optional(),
	title: z.string().min(4).max(255),
	description: z.string().max(2500),
	isPublic: z.boolean(),
	isVisible: z.boolean(),
});

export const deckGroupSchema = z.object({
	title: z.string().min(4).max(255),
	isVisible: z.boolean(),
});

export const cardSchema = z.object({
	deckId: z.string().uuid(),
	front: z.string().min(1).max(2500),
	back: z.string().min(1).max(2500),
});

export type Deck = z.infer<typeof deckSchema>;
export type DeckGroup = z.infer<typeof deckGroupSchema>;
export type Card = z.infer<typeof cardSchema>;
