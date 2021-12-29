-- CreateTable
CREATE TABLE `shop` (
    `shopname` VARCHAR(255) NOT NULL,
    `accesstoken` VARCHAR(255) NOT NULL,
    `id` VARCHAR(191) NULL,
    `name` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `domain` VARCHAR(255) NULL,
    `country` VARCHAR(255) NULL,
    `shop_owner` VARCHAR(255) NULL,
    `myshopify_domain` VARCHAR(256) NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `shop_accesstoken_key`(`accesstoken`),
    PRIMARY KEY (`shopname`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `app_session` (
    `id` VARCHAR(191) NOT NULL,
    `payload` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `installedshop` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shop` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `installedshop_shop_key`(`shop`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `affiliate` (
    `shop` VARCHAR(255) NOT NULL,
    `api_key` VARCHAR(250) NULL,
    `cookie_duration` INTEGER NOT NULL DEFAULT 30,
    `order_value` VARCHAR(100) NOT NULL DEFAULT '0',

    PRIMARY KEY (`shop`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sir_affiliate` (
    `shop` VARCHAR(255) NOT NULL,
    `sir_id` VARCHAR(250) NOT NULL,
    `transaction_id` VARCHAR(250) NOT NULL,
    `order_id` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`shop`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `affiliate` ADD CONSTRAINT `affiliate_shop_fkey` FOREIGN KEY (`shop`) REFERENCES `shop`(`shopname`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sir_affiliate` ADD CONSTRAINT `sir_affiliate_shop_fkey` FOREIGN KEY (`shop`) REFERENCES `affiliate`(`shop`) ON DELETE CASCADE ON UPDATE CASCADE;
