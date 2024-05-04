DROP INDEX IF EXISTS `users_github_id_unique`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `github_id`;