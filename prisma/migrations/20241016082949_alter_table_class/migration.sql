-- DropForeignKey
ALTER TABLE "classes" DROP CONSTRAINT "classes_address_id_fkey";

-- AlterTable
ALTER TABLE "classes" ALTER COLUMN "address_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
