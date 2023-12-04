CREATE TABLE `card` (
	`id` binary(16) NOT NULL DEFAULT UUID_TO_BIN(UUID()),
	`deck_id` binary(16) NOT NULL,
	`front` text NOT NULL,
	`back` text NOT NULL,
	`state` enum('NEW','LEARNING','YOUNG','MATURE','FROZEN') NOT NULL DEFAULT 'NEW',
	`last_reviewed_at` timestamp,
	`next_review_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT NOW(),
	CONSTRAINT `card_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `deck` (
	`id` binary(16) NOT NULL DEFAULT UUID_TO_BIN(UUID()),
	`deck_group_id` binary(16) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`is_public` boolean NOT NULL DEFAULT false,
	`is_visible` boolean NOT NULL DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT NOW(),
	CONSTRAINT `deck_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `deck_group` (
	`id` binary(16) NOT NULL DEFAULT UUID_TO_BIN(UUID()),
	`title` varchar(255) NOT NULL,
	`is_visible` boolean NOT NULL DEFAULT true,
	CONSTRAINT `deck_group_id` PRIMARY KEY(`id`)
);
