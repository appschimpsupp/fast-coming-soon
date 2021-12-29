/*
  Warnings:

  - You are about to drop the `accesstoken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `accesstoken`;

-- CreateTable
CREATE TABLE `accessDetails` (
    `shop` VARCHAR(250) NOT NULL,
    `token` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`shop`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
