/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_current_period_end` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_price_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `premiums` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `works` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "premiums" DROP CONSTRAINT "premiums_id_fkey";

-- DropIndex
DROP INDEX "users_stripe_current_period_end_key";

-- DropIndex
DROP INDEX "users_stripe_price_id_key";

-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "published" SET DEFAULT true;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "emailVerified",
DROP COLUMN "stripe_current_period_end",
DROP COLUMN "stripe_price_id";

-- DropTable
DROP TABLE "premiums";

-- DropTable
DROP TABLE "works";
