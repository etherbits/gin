CREATE TABLE `auth_user` (
	`id` varchar(15) NOT NULL,
	CONSTRAINT `auth_user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `user`;--> statement-breakpoint
ALTER TABLE `user_key` DROP FOREIGN KEY `user_key_user_id_user_id_fk`;
--> statement-breakpoint
ALTER TABLE `user_session` DROP FOREIGN KEY `user_session_user_id_user_id_fk`;
--> statement-breakpoint
ALTER TABLE `user_key` MODIFY COLUMN `id` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `user_key` MODIFY COLUMN `user_id` varchar(15) NOT NULL;--> statement-breakpoint
ALTER TABLE `user_key` MODIFY COLUMN `hashed_password` varchar(255);--> statement-breakpoint
ALTER TABLE `user_session` MODIFY COLUMN `id` varchar(128) NOT NULL;--> statement-breakpoint
ALTER TABLE `user_session` MODIFY COLUMN `user_id` varchar(15) NOT NULL;--> statement-breakpoint
ALTER TABLE `user_session` MODIFY COLUMN `active_expires` bigint NOT NULL;--> statement-breakpoint
ALTER TABLE `user_session` MODIFY COLUMN `idle_expires` bigint NOT NULL;--> statement-breakpoint
ALTER TABLE `user_key` ADD CONSTRAINT `user_key_user_id_auth_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `auth_user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_session` ADD CONSTRAINT `user_session_user_id_auth_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `auth_user`(`id`) ON DELETE no action ON UPDATE no action;