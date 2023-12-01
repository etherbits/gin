CREATE TABLE `user` (
	`id` varchar(15) NOT NULL,
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `auth_user`;