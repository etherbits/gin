ALTER TABLE deck ADD `card_order` text DEFAULT json_array() NOT NULL;--> statement-breakpoint
ALTER TABLE deck_group ADD `deck_order` text DEFAULT json_array() NOT NULL;--> statement-breakpoint
ALTER TABLE deck_group ADD `is_open` integer DEFAULT 1 NOT NULL;