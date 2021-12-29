/*
  Warnings:

  - You are about to drop the `affiliate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sir_affiliate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `affiliate` DROP FOREIGN KEY `affiliate_shop_fkey`;

-- DropForeignKey
ALTER TABLE `sir_affiliate` DROP FOREIGN KEY `sir_affiliate_shop_fkey`;

-- AlterTable
ALTER TABLE `activeplans` MODIFY `data` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `appsettings` MODIFY `settings` TEXT NOT NULL;

-- DropTable
DROP TABLE `affiliate`;

-- DropTable
DROP TABLE `sir_affiliate`;
