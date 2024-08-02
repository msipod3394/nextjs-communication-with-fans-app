-- CreateTable
CREATE TABLE "premiums" (
    "id" TEXT NOT NULL,
    "premiumContent" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "premiums_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "works" ADD CONSTRAINT "works_id_fkey" FOREIGN KEY ("id") REFERENCES "premiums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
