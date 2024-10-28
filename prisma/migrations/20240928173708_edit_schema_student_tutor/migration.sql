/*
  Warnings:

  - Added the required column `gender` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `tutors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "students" ADD COLUMN     "gender" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "tutors" ADD COLUMN     "gender" VARCHAR(255) NOT NULL;
