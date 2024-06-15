CREATE UNIQUE INDEX `deck_slug_user_id_unique` ON `deck` (`slug`,`user_id`);--> statement-breakpoint
ALTER TABLE `card` DROP COLUMN `slug`;