CREATE TABLE `email_verification` (
	`id` varchar(64) NOT NULL,
	`user_id` varchar(15) NOT NULL,
	`expires` bigint NOT NULL,
	CONSTRAINT `email_verification_id` PRIMARY KEY(`id`)
);
