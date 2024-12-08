CREATE TABLE `USERS` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255),
  `name` varchar(255),
  `password` varchar(255),
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `TOPICS` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `description` varchar(2000),
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `POSTS` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `content` varchar(2000),
  `author_id` integer NOT NULL,
  `topic_id` integer NOT NULL,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `SUBSCRIPTIONS` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer NOT NULL,
  `topic_id` integer NOT NULL,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `COMMENTS` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `content` varchar(2000),
  `author_id` integer NOT NULL,
  `post_id` integer NOT NULL,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE UNIQUE INDEX `USERS_index` ON `USERS` (`email`);

ALTER TABLE `POSTS` ADD FOREIGN KEY (`author_id`) REFERENCES `USERS` (`id`);
ALTER TABLE `SUBSCRIPTIONS` ADD FOREIGN KEY (`user_id`) REFERENCES `USERS` (`id`);
ALTER TABLE `COMMENTS` ADD FOREIGN KEY (`author_id`) REFERENCES `USERS` (`id`);

ALTER TABLE `POSTS` ADD FOREIGN KEY (`topic_id`) REFERENCES `TOPICS` (`id`);
ALTER TABLE `SUBSCRIPTIONS` ADD FOREIGN KEY (`topic_id`) REFERENCES `TOPICS` (`id`);

ALTER TABLE `COMMENTS` ADD FOREIGN KEY (`post_id`) REFERENCES `POSTS` (`id`);
