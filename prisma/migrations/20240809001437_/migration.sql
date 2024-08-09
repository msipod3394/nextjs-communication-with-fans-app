/*
  Warnings:

  - Made the column `postId` on table `images` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_postId_fkey";

-- AlterTable
ALTER TABLE "images" ADD COLUMN     "imageName" TEXT,
ALTER COLUMN "postId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
