/*
  Warnings:

  - The `grade` column on the `students` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `class` column on the `students` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[tutor_id]` on the table `job_references` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "students" DROP COLUMN "grade",
ADD COLUMN     "grade" VARCHAR(255)[],
DROP COLUMN "class",
ADD COLUMN     "class" VARCHAR(255)[];

-- CreateIndex
CREATE UNIQUE INDEX "job_references_tutor_id_key" ON "job_references"("tutor_id");
