/*
  Warnings:

  - You are about to drop the column `subject_name` on the `classes` table. All the data in the column will be lost.
  - Added the required column `class_name` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identification_id` to the `tutors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "classes" DROP COLUMN "subject_name",
ADD COLUMN     "class_name" VARCHAR(255) NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tutors" ADD COLUMN     "identification_id" VARCHAR(255) NOT NULL,
ADD COLUMN     "is_default" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "identification_image_front" DROP NOT NULL,
ALTER COLUMN "identifitcation_image_back" DROP NOT NULL;
