CREATE TABLE `enquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`kind` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`vehicle` text NOT NULL,
	`details` text NOT NULL,
	`created_at` integer NOT NULL
);
