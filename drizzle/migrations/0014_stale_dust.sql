ALTER TABLE `card` MODIFY COLUMN `id` binary(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID()));--> statement-breakpoint
ALTER TABLE `deck` MODIFY COLUMN `id` binary(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID()));--> statement-breakpoint
ALTER TABLE `deck_group` MODIFY COLUMN `id` binary(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID()));