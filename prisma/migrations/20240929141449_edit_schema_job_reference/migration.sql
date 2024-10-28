/*
  Warnings:

  - You are about to alter the column `grade` on the `job_references` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(255)`.
  - You are about to alter the column `class` on the `job_references` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(255)`.

*/
-- DropIndex
DROP INDEX "job_references_tutor_id_key";

-- AlterTable
ALTER TABLE "job_references" ALTER COLUMN "grade" SET NOT NULL,
ALTER COLUMN "grade" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "class" DROP NOT NULL,
ALTER COLUMN "class" SET DATA TYPE VARCHAR(255);
