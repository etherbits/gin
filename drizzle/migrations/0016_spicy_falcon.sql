ALTER TABLE `card` ADD `user_id` binary(16) NOT NULL;--> statement-breakpoint
ALTER TABLE `deck` ADD `user_id` binary(16) NOT NULL;--> statement-breakpoint
ALTER TABLE `deck_group` ADD `user_id` binary(16) NOT NULL;