/*
  Warnings:

  - Made the column `imageName` on table `images` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "images" ALTER COLUMN "imageName" SET NOT NULL;
