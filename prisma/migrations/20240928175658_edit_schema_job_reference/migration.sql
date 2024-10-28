/*
  Warnings:

  - The `grade` column on the `job_references` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `class` column on the `job_references` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `grade` on the `students` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(255)`.
  - You are about to alter the column `class` on the `students` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "job_references" DROP COLUMN "grade",
ADD COLUMN     "grade" VARCHAR(255)[],
DROP COLUMN "class",
ADD COLUMN     "class" VARCHAR(255)[];

-- AlterTable
ALTER TABLE "students" ALTER COLUMN "grade" SET NOT NULL,
ALTER COLUMN "grade" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "class" SET NOT NULL,
ALTER COLUMN "class" SET DATA TYPE VARCHAR(255);
