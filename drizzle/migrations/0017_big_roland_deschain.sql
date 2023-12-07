ALTER TABLE `card` MODIFY COLUMN `user_id` varchar(15) NOT NULL;--> statement-breakpoint
ALTER TABLE `deck` MODIFY COLUMN `user_id` varchar(15) NOT NULL;--> statement-breakpoint
ALTER TABLE `deck_group` MODIFY COLUMN `user_id` varchar(15) NOT NULL;--> statement-breakpoint
ALTER TABLE `deck_group` ADD CONSTRAINT `deck_group_title_unique` UNIQUE(`title`);