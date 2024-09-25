/*
  Warnings:

  - You are about to drop the column `username` on the `admin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `admin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `admin` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `admin_username_key` ON `admin`;

-- AlterTable
ALTER TABLE `admin` DROP COLUMN `username`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ALTER COLUMN `name` DROP DEFAULT,
    ALTER COLUMN `password` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `admin_email_key` ON `admin`(`email`);
