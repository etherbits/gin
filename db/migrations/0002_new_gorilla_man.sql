CREATE TABLE `card` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`deck_id` integer NOT NULL,
	`front` text NOT NULL,
	`back` text NOT NULL,
	`state` text DEFAULT 'NEW' NOT NULL,
	`last_reviewed_at` integer,
	`next_review_at` integer,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `deck` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` text(15) NOT NULL,
	`deck_group_id` integer,
	`title` text(255) NOT NULL,
	`description` text,
	`is_public` integer DEFAULT 0 NOT NULL,
	`is_visible` integer DEFAULT 1 NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `deck_group` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`title` text(255) NOT NULL,
	`is_visible` integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user_session` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`user_id` text(255) NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`username` text(64) NOT NULL,
	`email` text(254) NOT NULL,
	`email_verified` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `deck_group_title_unique` ON `deck_group` (`title`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);