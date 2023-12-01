CREATE DATABASE `schema`;
--> statement-breakpoint
CREATE TABLE `schema`.`users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` text,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
