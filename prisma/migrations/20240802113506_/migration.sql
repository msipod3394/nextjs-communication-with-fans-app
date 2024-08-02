/*
  Warnings:

  - You are about to drop the column `premiumContent` on the `premiums` table. All the data in the column will be lost.
  - Added the required column `url` to the `premiums` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "premiums" DROP COLUMN "premiumContent",
ADD COLUMN     "url" TEXT NOT NULL;
