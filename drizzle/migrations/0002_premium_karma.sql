CREATE TABLE `user` (
	`id` text NOT NULL,
	`username` varchar(64) NOT NULL,
	`email` varchar(254) NOT NULL,
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_key` (
	`id` text NOT NULL,
	`user_id` text NOT NULL,
	`hashed_password` text,
	CONSTRAINT `user_key_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_session` (
	`id` text NOT NULL,
	`user_id` text NOT NULL,
	`active_expires` int NOT NULL,
	`idle_expires` int NOT NULL,
	CONSTRAINT `user_session_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `user_key` ADD CONSTRAINT `user_key_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_session` ADD CONSTRAINT `user_session_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;