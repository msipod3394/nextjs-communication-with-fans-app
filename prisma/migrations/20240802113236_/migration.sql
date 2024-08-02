-- DropForeignKey
ALTER TABLE "works" DROP CONSTRAINT "works_id_fkey";

-- AddForeignKey
ALTER TABLE "premiums" ADD CONSTRAINT "premiums_id_fkey" FOREIGN KEY ("id") REFERENCES "works"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
