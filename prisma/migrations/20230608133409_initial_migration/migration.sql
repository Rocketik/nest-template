-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(63) NOT NULL,
    `type` ENUM('admin', 'customer') NOT NULL,
    `email` VARCHAR(127) NOT NULL,
    `password` VARCHAR(127) NOT NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
