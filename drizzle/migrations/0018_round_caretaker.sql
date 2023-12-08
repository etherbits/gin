CREATE TABLE `password_reset` (
	`id` varchar(64) NOT NULL,
	`user_id` varchar(15) NOT NULL,
	`expires` bigint NOT NULL,
	CONSTRAINT `password_reset_id` PRIMARY KEY(`id`)
);
