CREATE TABLE `oauth_account` (
	`provider_id` text PRIMARY KEY NOT NULL,
	`provider_user_id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
