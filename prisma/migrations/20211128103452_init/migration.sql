-- CreateTable
CREATE TABLE `activeStatus` (
    `shop` VARCHAR(250) NOT NULL,
    `status` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`shop`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
